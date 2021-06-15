import { toast, ToastPosition } from 'react-toastify';

export interface ConfigureType {
  position?: ToastPosition,
  autoClose?: number,
  hideProgressBar?: boolean,
  closeOnClick?: boolean,
  pauseOnHover?: boolean,
  draggable?: boolean,
  progress?: undefined,
};

export const getToastConfigure = (
  configureToast: ConfigureType = {},
) => ({
    ...configureToast,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });