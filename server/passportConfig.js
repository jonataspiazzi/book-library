const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const MongoAdapter = require('./mongoAdapter');

const resultFormat = (status, field, message) => {
  if (status) {
    return { status: true };
  } else {
    const fieldError = field
      ? { [field]: message }
      : { login: message, password: message };

    return { status: false, fieldError };
  }
}

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'login' },
  async (login, password, done) => {
    try {
      const adapter = new MongoAdapter('users');
      const users = await adapter.getBy({ login });
      const user = users && users[0] || null;

      if (!user) {
        return done(null, false, resultFormat(false, 'login', 'Nome de usuário não encontrado'));
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, resultFormat(false, 'password', 'Senha errada'));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const adapter = new MongoAdapter('users');
    const user = await adapter.getOne(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

const passportConfig = (app) => {
  // Config passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Block all content if not logged in.
  app.use((req, res, next) => {
    const nonAuthRequired = [
      { method: 'GET', url: /^\/?$/i },
      { method: 'POST', url: /^\/?api\/users\/signin$/i },
      { method: 'GET', url: /^\/?api\/users\/signout$/i },
      { method: 'GET', url: /^\/?api\/dev.*$/i }
    ];

    if (!req.originalUrl.toUpperCase().startsWith('/API')) {
      return next();
    }

    for (let item of nonAuthRequired) {
      if (req.method.toUpperCase() !== item.method) continue;
      if (!item.url.test(req.originalUrl)) continue;
      return next();
    }

    if(req.isAuthenticated()) {
      return next();
    } else {
      res.status(401);
      res.send('Reserved content, sign in first.\n');
    }
  });

  app.get('/api/users/signout', (req, res) => {
    req.logout();
    res.send('You are logged out\n');
  });
  
  app.post('/api/users/signin', (req, res, next) => {
    req.logout();
    passport.authenticate('local', (err, user, info) => {
      if (info) return res.send(info.status != undefined ? info : resultFormat(false, null, 'Credenciais faltando.'));
      if (err) return next(resultFormat(false, null, 'Erro no servidor. Favor entrar em contrato com o adminstrador'));
      if (!user) return res.send(resultFormat(false, 'login', 'Nome de usuário não encontrado'));
      req.login(user, err => {
        if (err) return next(err);
        return res.send(resultFormat(true));
      });
    })(req, res, next);
  });

  app.get('/api/users/authenticated', (req, res, next) => {
    res.send({
      isAuthenticated: true,
      user: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        login: req.user.login
      }
    });
  });
}

module.exports = passportConfig;