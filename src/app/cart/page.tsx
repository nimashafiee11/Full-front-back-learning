"use client";
import React from 'react'
import axios from "axios";
import { useCart } from "../../context/CartContext";


const CartPage = () => {
                
  const { cart , removeFromCart, updateQuantity , clearCart } = useCart();
    
     const handleSendRequest = async () =>{
      try {
        const response =  await axios.post('/api/send-request' , {cart}
        ).then((res)=>{
            if(res.status === 200){
              window.alert('your products has sent successfully')
              clearCart();
          } else  {
            window.alert('the request was not successfully')
          }
        })
         console.log(response);
         
      } catch (e) {
       console.log(e);
     }
 
     }
   
  return (
    <React.Fragment>
      <div className='photo' id='background' >
    <div className="p-4"  >
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
              
       <p className='font-bold text-slate-400 text-center mt-60 animate-bounce   '>Your cart is empty...<br/> please choose some <a href="/" >product</a></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-y-violet-800 py-2"
            >
              <div>
                <h2 className="font-bold text-slate-300">{item.title}</h2>
                <p className='text-yellow-600' ><span className="text-orange-600" >price is :</span  >  ${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                  }
                  className="px-2 py-1 bg-red-400 rounded hover:bg-red-500"
                >
                  -
                </button>
                <span className="px-4 text-sky-300 ">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, Math.min( item.quantity + 1 ,10))}
                  className="px-2 py-1 bg-green-300 rounded hover:bg-green-400"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:underline "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-sky-500 ">
            Total: 
            {cart.reduce((acc, item) => acc + item.price * item.quantity ,0)}$
          </div>
          <br/>
          <div className="flex text-center gap-1 content-center items-center justify-center" >
          <button  onClick={clearCart}
          className=" bg-green-500 p-3 rounded-md " >
            
            clear all
            
            </button>
            <button onClick={handleSendRequest}  className="bg-blue-500 p-3 rounded-md " >Send Request</button>
            </div>
        </div>
      )}
    </div>
    </div>
    </React.Fragment>
  );
};

export default CartPage;