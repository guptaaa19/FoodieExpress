import RestaurantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
    // Local state variables - super powerful
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [ searchText, setSearchText ] = useState("");

    // * Whenever a state variable updates or changes, react triggers a reconciliation cycle(re-renders the component)
    console.log('Body rendered');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(
                "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );

            const json = await data.json();
            console.log(json);

            console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

            const fetchedRestaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if (fetchedRestaurants) {
                setListOfRestaurants(fetchedRestaurants);
                setFilteredRestaurants(fetchedRestaurants);
            }
    } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    //conditional rendering
    // if(listOfRestaurants.length === 0){
    //     return < Shimmer />;
    // }

    return (listOfRestaurants.length === 0) ? < Shimmer /> :
    (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type = "text" className="search-box" value={searchText} // tied the value to an empty string
                    onChange= { (e) => { setSearchText(e.target.value)
                    }}/>
                    <button onClick={() => {
                        // Filter the restro-cards and update the UI
                        // searchText
                        console.log(searchText);
                        const filteredRestaurant = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLocaleLowerCase())
                        );
                        setFilteredRestaurants(filteredRestaurant);
                    }}>Search</button>
                    {/* made the search case-sensitive */}

                </div>
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4
                    );
                    setFilteredRestaurants(filteredList);
                }}>
                    Top Rated Restaurant
                </button>
            </div>
            <div className="res-container">
                {/* Restaurant cards */}
                {
                    filteredRestaurants.map((restaurant) => (
                        <Link key={restaurant.info.id} to = {"restuarants/" + restaurant.info.id }>
                            <RestaurantCard  resData={restaurant} />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Body;
