//firebase 9버전 부터는 임포터 형태가 아래로 바뀜
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//firebase 프로젝트 불러오기
//아래 키들은 .env파일에 변수로 저장하여 불러옴
//깃허브 올릴 시 가려주기 위한 방법
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUR_ID,
};

const apiKey = firebaseConfig.apiKey;

firebase.initializeApp(firebaseConfig);
const authService = firebase.auth();

export { authService, apiKey };
