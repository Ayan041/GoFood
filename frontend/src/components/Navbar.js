import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {

    const [cartView, setCartView] = useState(false)
    const data = useCart();

    let navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        navigate("\login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                    </li>
                                    : ""
                            }
                        </ul>


                        {
                            (!localStorage.getItem("authToken")) ?

                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                                </div>
                                :
                                <div>
                                    <div className='btn bg-white text-success mx-2 fs-5' onClick={() => { setCartView(true) }}>
                                        MyCart {" "}
                                        <Badge pill bg='danger'>{data.length}</Badge>
                                    </div>
                                    {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                                    <div className='btn bg-danger text-white mx-2 fs-5' onClick={logoutHandler}>Logout</div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar


