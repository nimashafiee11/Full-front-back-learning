'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// تعریف تایپ‌ها برای کاربر و کانتکست
interface User {
  username: string;
  token: string;
  profile?: Record<string, any>; // می‌توانید این را دقیق‌تر تعریف کنید
}

interface UserContextType {
  currentUser: User | null;
  signUp: (username: string, password: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchProfile: () => Promise<void>;
}

// تعریف کانتکست
const UserContext = createContext<UserContextType | undefined>(undefined);

// تعریف پراپ‌های UserProvider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const Routing = useRouter()

  // متد ثبت‌نام
  const signUp = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      },{headers:{
        'Content-Type' : 'application/json'
      }}).then((res)=>{
        if(res.data.status === 200){
          Routing.push('/profile')
          setCurrentUser(res.data)
        }
        console.log(response);
        
      })
      // setCurrentUser(response.data);
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };

  // متد ورود
  const signIn = async (username: string, password: string) => {
    try {
      const respponse = await axios.post("http://localhost:5000/signin", {
        username,
        password,
      }).then((res)=>{
        if(res.data.status === 200){
          Routing.push('/profile')
          setCurrentUser(res.data)
        }
      })
      console.log(respponse);
      
      // setCurrentUser(response.data);
    } catch (error) {
      console.error("SignIn Error:", error);
    }
  };

  // متد خروج
  const signOut = () => {
    setCurrentUser(null);
  };

  // متد گرفتن اطلاعات پروفایل
  const fetchProfile = async () => {
    if (!currentUser) return;
    try {
      const response = await axios.get("http://localhost:5000/user/profile", 
        {headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setCurrentUser({ ...currentUser, profile: response.data });
    } catch (error) {
      console.error("Fetch Profile Error:", error);
    }
  };
     
  return (
    <UserContext.Provider
      value={{ currentUser, signUp, signIn, signOut, fetchProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// هوک استفاده از کانتکست
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
