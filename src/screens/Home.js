import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8080/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Carousel Section */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
              />
            </div>
          </div>
          
          {/* Carousel Items */}
          <div className="carousel-item active">
            <img src="images/noodles.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Noodles" />
          </div>
          <div className="carousel-item">
            <img src="images/pizza.png" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src="images/paneer.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Paneer" />
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories and Items */}
      <div className="container my-4">
        {
          foodCat.length > 0 ? (
            foodCat.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filteredItem => (
                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                          <Card
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="text-center">No Such Data Found</div>
                  )}
                </div>
              );
            })
          ) : ""
        }
      </div>

      <Footer />
    </div>
  );
}
