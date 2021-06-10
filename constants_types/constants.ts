export const API_URL = process.env.NEXT_APP_BACKEND_URL || 'http://localhost:1337';

interface actionType {
  [key: string]: string,
}

export const actType: actionType = Object.freeze({
  add: 'Add',
  edit: 'Edit',
  update: 'Update',
});

export const PER_PAGE = 4;