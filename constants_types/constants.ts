/* eslint-disable import/prefer-default-export */
import { isDevelopmentMode } from 'helper/isDevelopmentMode';

export const API_URL = isDevelopmentMode() ? 'http://localhost:3000' : process.env.NEXT_APP_BACKEND_URL;