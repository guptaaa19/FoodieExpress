// src/components/Body.js

import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true"
      );

      const json = await data.json();
      const fetchedRestaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      console.log(fetchedRestaurants);

      if (fetchedRestaurants) {
        setListOfRestaurants(fetchedRestaurants);
        setFilteredRestaurants(fetchedRestaurants);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1 className="text-center text-red-600 mt-10">
        Looks like you are offline 😢. Please check your internet connection!!!⛓️‍💥
      </h1>
=======
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().finally(() => setLoading(false));
    }, []);

    const fetchData = async () => {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
            const response = await fetch(proxyUrl + targetUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            const fetchedRestaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            if (fetchedRestaurants) {
                setListOfRestaurants(fetchedRestaurants);
                setFilteredRestaurants(fetchedRestaurants);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            setListOfRestaurants([]);
        }
    };

    const handleSearch = () => {
        const filteredRestaurant = listOfRestaurants.filter(
            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRestaurants(filteredRestaurant);
    };

    return loading ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
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
                {filteredRestaurants.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"restaurants/" + restaurant.info.id}>
                        <ResturantCard resData={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    );
  }
  const { loggedInUser, setUserName } = useContext(UserContext);


  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="container mx-auto p-4">
      {/* Search and Filter Section */}
      <div className="filter flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="search m-4 flex items-center w-full md:w-1/2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.toLocaleLowerCase())
              );
              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className="m-4">
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex items-center p-4 m-4 search">
          <label htmlFor="name" className="font-medium">
            User Name:{' '}
          </label>
          <input
            id="name"
            className="px-4 py-2 border border-transparent shadow-md bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[200px] ml-[20px] focus:border-b-2 focus:border-green-500"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      {/* </div> */}

      
      {/* Restaurant Cards Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={'restaurants/' + restaurant.info.id}
          >
            <ResturantCard resData={restaurant} />
          </Link>
          
        ))}
      </div>
    </div>

  );
};

export default Body;
