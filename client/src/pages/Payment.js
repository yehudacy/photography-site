import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const Payment = () => {
    const { state } = useLocation();


    if(!state){
        return <Navigate to={'/pricing'} />
    }
    console.log(state)

    const handlePlaceOrder = () => {
        
    }


  return (
    <>
    <h1>Payment</h1>
    <button onClick={handlePlaceOrder}>place order</button>
    </>
  )
}

export default Payment