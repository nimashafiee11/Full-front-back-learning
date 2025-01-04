'use client'
import React, { useState } from 'react'
import {   useUserContext  } from '@/context/userContext'
    

function page() {

    const {signIn ,  signUp  } = useUserContext(); 
    const [username , setUserName ] = useState('');
    const [password , setPassword] = useState('');
       
     const handleSignIn =(e:any)=>{
      e.preventDefault();
      signIn(username , password);
      console.log(handleSignIn);
      
     }
     const handleSignUp = (e:any)=> {
      e.preventDefault();
     signUp(username , password);
     console.log(handleSignUp);
     
     }
  return (
   <React.Fragment>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Welcome Back</h2>
        <form  className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="username"
              name="username"
              value={username}
              id="email"
              placeholder="Enter your name"
              onChange={(e)=>{setUserName(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              placeholder="Enter your password"
             onChange={(e)=>{setPassword(e.target.value)}}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <button
           onClick={handleSignIn}
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            signIn
          </button>
          <button
           onClick={handleSignUp}
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300"
          >
            signUp
          </button>
        </form>
      </div>
    </div>
    </React.Fragment>
  );
}


export default page