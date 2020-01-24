import { CookiesProvider } from 'react-cookie';
import Cookies from 'universal-cookie';

export const safeFetch = async (input, init, type = 'json') => {
  try {
    const result = await fetch(input, init);

    if (result.status === 401) {
      new Cookies().set('auth', null, { expires: 0 });
      document.location = '/signin';
      return null;
    }

    return await result[type]();
  } catch (ex) {
    return null;
  }
};