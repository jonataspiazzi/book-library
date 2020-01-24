const basicUrl = (name, id, query) => `/api/${name}${id ? `/${id}` : ''}${query ? `?${query}` : ''}`;

export const studentUrl = (id, query) => basicUrl('students', id, query);
export const bookUrl = (id, query) => basicUrl('books', id, query);
export const borrowUrl = (id, query) => basicUrl('loans/borrows', id, query);
export const returnUrl = (id, query) => basicUrl('loans/returns', id, query);
export const signInUrl = () => '/api/users/signin';
export const signOutUrl = () => '/api/users/signout';
export const userAuthenticated = () => '/api/users/authenticated';