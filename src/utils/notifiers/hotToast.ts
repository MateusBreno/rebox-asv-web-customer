// ./src/utils/notifiers/hotToast.ts
import toast from 'react-hot-toast';

import { ConfigStyles } from '@config/index';

interface INotify {
  [key: string]: any;
}

const hotToast = (
  message: string,
  type: 'error' | 'loading' | 'success' | 'dismiss',
) => {
  const config: any = {
    position: 'top-center',
    style: {
      fontSize: '14px',
      padding: '12px 20px',
      borderRadius: '4px',
    },
    // className: '',
    // icon: '👏',
    // iconTheme: {
    //   primary: '#000',
    //   secondary: '#fff',
    // },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  const notifyTypes: INotify = {
    success: () =>
      toast.success(message, {
        ...config,
        style: {
          ...config.style,
          borderLeft: `3px solid ${ConfigStyles.rebox.colors.greenEmerald.main}`,
        },
        duration: 3000,
      }),
    error: () =>
      toast.error(message, {
        ...config,
        style: {
          ...config.style,
          borderLeft: `3px solid ${ConfigStyles.rebox.colors.red.main}`,
        },
        duration: 3000,
      }),
    loading: () =>
      toast.loading(message, {
        ...config,
        style: {
          ...config.style,
          borderLeft: `3px solid ${ConfigStyles.rebox.colors.gray.main}`,
        },
      }),
    dismiss: () => toast.dismiss(message),
  };

  return (notifyTypes[type] || notifyTypes.success)();
};

export default hotToast;
