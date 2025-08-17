import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { data } from 'react-router-dom';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const response = await res.json();
            setOrderData(response.orderData ? response.orderData.order_data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((item, index) => (
                            <div key={index} className="w-100">
                                {/* Order Date */}
                                {item[0]?.Order_date && (
                                    <div className="m-auto mt-5">
                                        <h5>Order Date: {item[0].Order_date}</h5>
                                        <hr />
                                    </div>
                                )}

                                {/* Items */}
                                {item.map((arrayData, i) => (
                                    !arrayData.Order_date && (
                                        <div key={i} className="col-12 col-md-6 col-lg-3">
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                {/* <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                        <span className="m-1">{arrayData.qty}</span>
                                                        <span className="m-1">{arrayData.size}</span>
                                                        <span className="m-1">{arrayData.Order_date}</span>
                                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center mt-5">No Orders Found</h4>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrder;
