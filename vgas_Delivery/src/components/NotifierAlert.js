import { Notifier, NotifierComponents } from 'react-native-notifier';

const NotifierAlert = (duration, title, message, type) => {
  Notifier.showNotification({
    duration: duration,
    title: title,
    description: message,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: type,
    },
    containerStyle:{
      marginTop: 30
    }
  });
};

export default NotifierAlert;
