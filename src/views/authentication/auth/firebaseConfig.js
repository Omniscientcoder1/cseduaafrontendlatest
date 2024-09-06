// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2aYx8IBIK2Itef4UVfZKNYVmHpkZznVI',
  authDomain: 'cseduaa-c1a30.firebaseapp.com',
  projectId: 'cseduaa-c1a30',
  storageBucket: 'cseduaa-c1a30.appspot.com',
  messagingSenderId: '137515276822',
  appId: '1:137515276822:web:0debdc77bf4373ca63f337',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
