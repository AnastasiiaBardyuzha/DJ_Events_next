export const API_URL = 
  process.env.NEXT_PUBLIC_PRODUCTION_APP_BACKEND_URL 
  || process.env.NEXT_PUBLIC_APP_BACKEND_URL;
export const NEXT_URL =
  process.env.NEXT_PUBLIC_PRODUCTION_APP_FRONTEND_URL
  || process.env.NEXT_PUBLIC_APP_FRONTEND_URL;

interface actionType {
  [key: string]: string,
}

export const actType: actionType = Object.freeze({
  add: 'Add',
  edit: 'Edit',
  update: 'Update',
});

export const PER_PAGE = 4;

export const FETCH_METHODS = Object.freeze({
  get: 'GET',
  post: 'POST',
});

export const COOKIES_ACTIONS = Object.freeze({
  set: 'set',
  destroy: 'destroy',
});
