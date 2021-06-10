export const API_URL = process.env.NEXT_APP_BACKEND_URL || 'http://localhost:1337';
export const NEXT_URL = process.env.NEXT_APP_FRONTEND_URL || 'http://localhost:3000';

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
