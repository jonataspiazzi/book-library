import { idleTimeout } from '../../config';

const AUTH = 'AUTH';
const SIDE_MENU_STATUS = 'SIDE_MENU_STATUS';
const COLLAPSED = 'COLLAPSED';
const EXPANDED = 'EXPANDED';

class AppStorage {
  getUser() {
    try {
      const authString = localStorage.getItem(AUTH);
      const auth = JSON.parse(authString);
      const expires = new Date(auth.expires);

      if (expires < new Date()) {
        localStorage.removeItem(AUTH);
        return null;
      }

      this.setUser(auth.user);

      return auth.user;
    } catch {
      return null;
    }
  }

  setUser(user) {
    if (!user) {
      localStorage.removeItem(AUTH);
      return;
    }
    
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + idleTimeout);
    localStorage.setItem(AUTH, JSON.stringify({ user, expires }));
  }

  getSideMenuIsCollapsed() {
    return localStorage.getItem(SIDE_MENU_STATUS) === COLLAPSED;
  }

  setSideMenuIsCollapsed(state) {
    localStorage.setItem(SIDE_MENU_STATUS, state ? COLLAPSED : EXPANDED);
    document.body.classList[state ? 'add' : 'remove']('sidebar-collapse');
  }

  refreshSideMenuIsCollapsed() {
    this.setSideMenuIsCollapsed(this.getSideMenuIsCollapsed());
  }
}

export const appStorage = new AppStorage();