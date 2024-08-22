import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch('http://localhost:2929/api/fooddata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.success) {
                setFoodCat(data.foodcatagory);
                setFoodItems(data.fooditems);
                console.log(data);
            } else {
                console.error('Failed to load data:', data.message);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !importarnt' }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption ' style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://picsum.photos/500/200?burger" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/500/200?momos" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/500/200?pizza" className="d-block w-100" alt="..." />
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
            </div>
            <div className='container mt-5'>
                {foodCat.length > 0 && foodCat.map((data) => {
                    return (
                        <div key={data._id} className='category-section mb-5'>
                            <h2 className='fs-2 fw-bold text-center mb-4'>{data.CategoryName}</h2>
                            <hr className='mb-5' style={{ border: '2px solid #007bff', width: '100', margin: '0 auto' }} />
                            <div className='row'>
                                {foodItems
                                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map((filterItems) => {
                                        return (
                                            <div key={filterItems._id} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
                                                <Card
                                                    name={filterItems.name}
                                                    description={filterItems.description}
                                                    options={filterItems.options[0]}
                                                    price={filterItems.price}
                                                    image={filterItems.image}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </>
    );
}
