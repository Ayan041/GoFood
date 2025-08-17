import React, { useRef, useState } from 'react'
// import paneerKabab from '../images/paneer_kabab.jpg'
import { useDispatchCart, useCart } from './ContextReducer';
import { useEffect } from 'react';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    let finalPrice = qty * parseInt(options[size] || 0);

    const handleAddToCart = async () => {

        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (Object.keys(food).length !== 0) {
            if (food.size === size) {
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItem._id,
                    price: parseInt(options[size]), // ✅ unit price only
                    qty: qty,
                    size: size
                });
            }

            else if (food.size !== size) {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
                return
            }
            return
        }

        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
        alert("Added to Cart!");
    };

    // Set default size when component mounts
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    // Log cart whenever it updates
    useEffect(() => {
        console.log("Cart updated:", data);
    }, [data]);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxWidth: "360px" }}>
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt={props.foodItem.name}
                    style={{ height: "160px", objectFit: "fill" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        {/* Quantity selector */}
                        <select
                            className="m-2 h-100 bg-success rounded"
                            onChange={(e) => setQty(parseInt(e.target.value))}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        {/* Size selector */}
                        <select
                            className="m-2 h-100 bg-success rounded"
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>

                        {/* Price */}
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button
                        className="btn btn-success justify-center ms-2"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Card
