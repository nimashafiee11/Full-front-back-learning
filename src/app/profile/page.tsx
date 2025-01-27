'use client'

import React, { useEffect } from "react";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// تعریف تایپ برای هر آیتم در cart
interface CartItem {
  title: string;
  price : number
  quantity: number;
}

// تعریف تایپ برای هر درخواست در پروفایل
interface Request {
  date: string;
  cart: CartItem[];
}

// کامپوننت پروفایل
const Profile: React.FC = () => {
  const { currentUser, fetchProfile } = useUserContext();
   const Routing = useRouter();
  // گرفتن اطلاعات پروفایل وقتی کامپوننت لود می‌شود
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!currentUser || !currentUser.token ) {
    alert('please login first')
    Routing.push('/auth' )
    return;
  } 

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
      <p className="text-lg text-gray-700 mb-6">
        <span className="font-semibold text-gray-900">Username:</span> {currentUser.username}
      </p>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Requests</h3>
      <ul className="space-y-4">
        {currentUser.profile?.requests.map((request: Request, index: number) => (
          <li
            key={index}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <p className="text-gray-800 font-medium">
              Request #{index + 1} -{" "}
              <span className="text-gray-600 text-sm">
                {new Date(request.date).toLocaleString()}
              </span>
            </p>
            <ul className="mt-2 space-y-2 pl-4 border-l-2 border-gray-300">
              {request.cart.map((item: CartItem, idx: number) => (
                <li
                  key={idx}
                  className="text-gray-700 text-sm flex justify-between"
                >
                  <span>{item.title}  ${item.price} </span>
                  <span className="text-gray-500">Quantity: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;

