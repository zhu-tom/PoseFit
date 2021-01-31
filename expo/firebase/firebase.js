import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: ' AIzaSyBC55eyQ4_pGx85dvXkLKc89D3mL4tKh3g ',
  authDomain: 'cuhacking2021-7de0d.firebaseapp.com',
  databaseURL: 'https://cuhacking2021-7de0d-default-rtdb.firebaseio.com',
  projectId: 'cuhacking2021-7de0d',
  storageBucket: 'cuhacking2021-7de0d.appspot.com',
  messagingSenderId: '706847653524',
  appId: '1:706847653524:ios:1603476d45a6c9b3897e81',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const database = firebase.database();