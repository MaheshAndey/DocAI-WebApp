
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Login from './Screens/login.js';
import Intro from './Screens/Intro';
import Form from './Screens/form';
import Spinner from './Screens/loading';
import FileUploadPage from './Screens/cropper';
import SignUp from './Screens/signup';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './Screens/Navbar'

import {auth} from './firebase/utils';
import LoadingScreen from 'react-loading-screen';



const user=JSON.parse(localStorage.getItem('user'));



function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
            const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            })
          return unsubscribe
        }
    ) 

console.log("Islogin by google : ", JSON.parse(localStorage.getItem('googleauth')))
console.log("Islogin by app: ", JSON.parse(localStorage.getItem('user'))?true:false)


  return (
    <>
      <Router>
        <div className='App'>
          
        <LoadingScreen
          loading={JSON.parse(localStorage.getItem('googleauth')) && (currentUser===null)}
          bgColor='rgba(100, 100, 100, 0.3)'
          spinnerColor='red'
          textColor='#676767'
          // logoSrc='/logo.png'
          text='Loading'
        >

          <NavBar currentGuser = {currentUser} currentUser={user}/>
          <Routes>
            <Route path="/" element={<Intro currentGuser = {currentUser} currentUser={user}/>} />
            <Route path="/login" element={<Login currentGuser = {currentUser} currentUser={user} />} />

            <Route path="/form" element={(user||currentUser)?<Form currentGuser = {currentUser} currentUser={user} />:<Login />} />
            <Route path="/cropper" element={(user||currentUser)?<FileUploadPage />:<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/spinner" element={<Spinner/>} />
          </Routes>
          </LoadingScreen>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

// user?<Form />:<Intro />
// user?<FileUploadPage />:<Intro/>

export default App






