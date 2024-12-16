// NotificationHandler.js
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications'; // Import notifications
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Add notification listener
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);

    // Clean up the subscription on unmount
    return () => subscription.remove();
  }, []);

  const handleNotification = (notification) => {
    const { title } = notification.request.content;
    
    if (title === 'ATENçÃO!! Você foi BANIDO do app pelo Administrador!') {
      Alert.alert(
        'Conta Cancelada',
        'Sua conta foi cancelada pelo administrador. Você será redirecionado para a tela inicial.',
        [
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.removeItem('userToken');
              navigation.navigate('Home'); // Redirect to Home
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  return null;
};

export default NotificationHandler;
