import { ReactText } from 'react';
import { toast } from 'react-toastify';
import { getToastConfigure, ConfigureType } from 'helper/getToastConfigure';

export const notifySuccess = (
  title: string = 'Success',
  config: ConfigureType = {},
) => toast.success(title, getToastConfigure(config));

export const notifyError = (
  title: string | ReactText | undefined | null = 'Something wrong',
  config: ConfigureType = {},
) => toast.error(title, getToastConfigure(config)) ?? '';

export const notifyInfo = (
  title: string = 'Info message',
  config: ConfigureType = {},
) => toast.info(title, getToastConfigure(config));