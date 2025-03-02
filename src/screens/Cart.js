/*import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import React from "react"





export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    )
  }

const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail");
    console.log("hello")
    let response= await fetch("http://localhost:8080/api/orderData",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            order_data:data,
            email:userEmail,
            order_date: new Date().toDateString()
        })

    });

    console.log(response)
    response = await response.json();
    console.log("JSON Response:::::",response.status)
    if(response.status === 200){
        dispatch({type:"DROP"})
    }
}  
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
 
  return (
    <div>

      
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th style={{color:"white"}} scope='row' >{index + 1}</th>
                <td style={{color:"white"}}>{food.name}</td>
                <td style={{color:"white"}}>{food.qty}</td>
                <td style={{color:"white"}}>{food.size}</td >
                <td style={{color:"white"}}>{food.price}</td >
                <td style={{color:"white"}}><button type="button" className="btn p-0"><Delete style={{color:"white"}} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
         <div>
          <button className='btn bg-success mt-5 text-white ' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>



    </div>
  )
} */

  /*import Delete from '@material-ui/icons/Delete';
  import { useCart, useDispatchCart } from '../components/ContextReducer';
  import React, { useState } from "react";
  
  export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const [isCheckout, setIsCheckout] = useState(false); // Add state to track if checkout happened
  
    if (data.length === 0 && !isCheckout) {
      return (
        <div>
          <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
        </div>
      );
    }
  
    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      console.log("hello");
      let response = await fetch("http://localhost:8080/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
  
      console.log(response);
      response = await response.json();
      console.log("JSON Response:::::", response.status);
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setIsCheckout(true); // Set the checkout flag to true
      }
    }
  
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
  
    return (
      <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
          <table className='table table-hover '>
            <thead className=' text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}> {/* Add key to the tr */ /* }
                  <th style={{color: "white"}} scope='row'>{index + 1}</th>
                  <td style={{color: "white"}}>{food.name}</td>
                  <td style={{color: "white"}}>{food.qty}</td>
                  <td style={{color: "white"}}>{food.size}</td>
                  <td style={{color: "white"}}>{food.price}</td>
                  <td style={{color: "white"}}>
                    <button type="button" className="btn p-0">
                      <Delete style={{color: "white"}} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}> Check Out </button>
          </div>
        </div>
      </div>
    );
  } */

import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import React, { useState, useEffect } from "react";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  
  // This state will help us track if the checkout was successful.
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    // If the data is cleared, set checkoutComplete to true and rerender the component
    if (data.length === 0 && checkoutComplete) {
      setCheckoutComplete(true);
    }
  }, [data]);

  // Check if the cart is empty and handle showing the empty message after checkout
  if (data.length === 0 && !checkoutComplete) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("Checking out...");
    
    try {
      let response = await fetch("http://localhost:8080/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      response = await response.json();
      console.log("Checkout response:", response);

      if (response.status === 200) {
        dispatch({ type: "DROP" }); // Dispatch the DROP action to clear the cart
        setCheckoutComplete(true); // Set the state to true after checkout
      } else {
        console.error("Checkout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Calculate the total price of all items in the cart
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}> {/* Add unique key to each row */}
                <th style={{ color: "white" }} scope='row'>{index + 1}</th>
                <td style={{ color: "white" }}>{food.name}</td>
                <td style={{ color: "white" }}>{food.qty}</td>
                <td style={{ color: "white" }}>{food.size}</td>
                <td style={{ color: "white" }}>{food.price}</td>
                <td style={{ color: "white" }}>
                  <button type="button" className="btn p-0">
                    <Delete style={{ color: "white" }} onClick={() => dispatch({ type: "REMOVE", index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>
    </div>
  );
}

  
