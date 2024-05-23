import {initializeApp } from "firebase/app";

import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";

import {getFirestore, query, getDocs,collection,where,addDoc,} from 'firebase/firestore'
import {React , useEffect, useState} from 'react'

const config = {
    apiKey: "AIzaSyCG8sgYKaplKhzEGkZfdxzcHQOQ-D-jw3c",
    authDomain: "subsetweb-bbe6e.firebaseapp.com",
    projectId: "subsetweb-bbe6e",
    storageBucket: "subsetweb-bbe6e.appspot.com",
    messagingSenderId: "842978956299",
    appId: "1:842978956299:web:d1c2ab0d85a67a921ea30e",
    measurementId: "G-M99BBT0MY7"
};


// firebase.initializeApp(config);
const app =  initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);


const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
    prompt: 'select_account'
});


// export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const SignInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    localStorage.setItem('googleauth', JSON.stringify(true));
    const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  
};







