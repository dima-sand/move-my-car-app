import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBkfrYq-9IMhLDUNvRj43DhftOK5lPIw5g",
  authDomain: "move-my-car-dev.firebaseapp.com",
  projectId: "move-my-car-dev",
  storageBucket: "move-my-car-dev.appspot.com",
  messagingSenderId: "983864320714",
  appId: "1:983864320714:web:3ec5084e5b9a2db146ca33"
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(firebaseApp) : null;
}

const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    return null;
  }
};

export { firebaseApp, messaging, fetchToken };