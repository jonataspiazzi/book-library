const languages = {
  'pt-BR': {
    shortDays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    days: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    shortMonths: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    months: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'dezembro']
  }
}

const dateFormat = (date, format, language = 'pt-BR', timeZoneMinutes = -180) => {
  const formatSplited = formatSpliter(format);
  const lang = getLanguage(language);
  const parsedDate = new Date(date);

  parsedDate.setMinutes(parsedDate.getMinutes(timeZoneMinutes));

  let result = '';

  for (let s of formatSplited) {
    switch(s.char) {
      case "d": result += formatDay(parsedDate, s.count, lang); break;
      case "M": result += formatMonth(parsedDate, s.count, lang); break;
      case "y": result += formatYear(parsedDate, s.count); break;
      //case 'h': result += formatHour(parsedDate, s.count, false); break;
      //case 'H': result += formatHour(parsedDate, s.count, true); break;
      default: result += s.char; break;
    }
  }

  return result;
}

const formatSpliter = (format) => {
  if (!format || typeof format !== 'string') return [];

  const result = [];
  let current = '';
  let count = 0;

  for (let i = 0; i < format.length; i++) {
    if (current == format[i]) {
      count++;
    }
    else {
      result.push({ char: current, count });
      current = format[i];
      count = 1;
    }
  }

  result.push({ char: current, count });
  result.shift();

  return result;
}

const getLanguage = (language) => {
  return languages[language];
}

const formatDay = (date, count, language) => {
  switch(count) {
    case 1: return date.getDate();
    case 2: return date.getDate().toString().padStart(2, '0');
    case 3: return language.shortDays[date.getDay()];
    default: return language.days[date.getDay()];
  }
}

const formatMonth = (date, count, language) => {
  switch(count) {
    case 1: return date.getMonth() + 1;
    case 2: return (date.getMonth() + 1).toString().padStart(2, '0');
    case 3: return language.shortMonths[date.getMonth()];
    default: return language.months[date.getMonth()];
  }
}

const formatYear = (date, count) => {
  switch(count) {
    case 1: return Number(date.getFullYear().toString().padStart(4, '0').substr(2, 2));
    case 2: return date.getFullYear().toString().padStart(4, '0').substr(2, 2);
    default: return date.getFullYear().toString().padStart(count, '0');
  }
}

const formatHour = (date, count, upper) => {
  let hour = date.getHours();
  if (!upper && hour > 12) hour -= 12;

  switch(count) {
    case 1: return hour;
    default: return hour.toString().padStart(2, '0');
  }
}

module.exports = { dateFormat };