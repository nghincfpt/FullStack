import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8vOShpc9Khf_HuQ37BCrAbLEw5XxYUUc",
    authDomain: "mockproduct-c343f.firebaseapp.com",
    databaseURL:
        "https://mockproduct-c343f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mockproduct-c343f",
    storageBucket: "mockproduct-c343f.appspot.com",
    messagingSenderId: "491689079553",
    appId: "1:491689079553:web:26770415bbe7fd58bfa100",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
