import React from 'react'

//import components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import { useState, useEffect } from 'react'

//carousel image
import burger from '../images/burger.jpg'
import momos from '../images/momos.jpg'
import pizza from '../images/pizza.jpg'


const Home = () => {

    // object er upor map use hoy na . Array er upor map use hoy
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('')

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        });

        response = await response.json();
        // console.log(response[0], response[1]);

        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, []);      //on first load it will work becaouse no dependencies will given


    return (
        <div>
            <div><Navbar /></div>

            {/* carousel used */}
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel" style={{ objectFit: "contain !important", overflow: "hidden" }}
            >
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className='d-flex justify-content-center '>
                            <input className='form-control me-2' type="search" placeholder='Search' aria-label='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className='btn btn-outline-success text-white bg-success' type='submit'>Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={burger} className="d-block w-100" style={{ height: "90vh", filter: "brightness(50%)", objectFit: "cover" }} alt="Fruit" />
                    </div>
                    <div className="carousel-item">
                        <img src={momos} className="d-block w-100" style={{ height: "90vh", filter: "brightness(50%)", objectFit: "cover" }} alt="Vegetable" />
                    </div>
                    <div className="carousel-item">
                        <img src={pizza} className="d-block w-100" style={{ height: "90vh", filter: "brightness(50%)", objectFit: "cover" }} alt="Grocery" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {foodCat.length > 0 &&
                    foodCat.map((data) => (
                        <div className='row mb-3'>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {
                                foodItem.length > 0 ?
                                    (
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map((filteredItem) => (
                                                <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        foodItem={filteredItem}
                                                        options={filteredItem.options[0]}
                                                    ></Card>
                                                </div>
                                            ))
                                    )
                                    : <div>No such data found</div>
                            }
                        </div>
                    ))
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home
