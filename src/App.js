//App.js

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import ResturantMenu from "./components/ResturantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";  // creates a routing configuration
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux"; //acts as a bridge between react app and redux
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {

    const [userName, setUserName] = useState();

    //authentication
    useEffect(() =>{
        // Make an API call and send username and password
        // suppose we got some data , like sth below and then update the UserInfo, it could be done like this:
        const data = {
            name: "User",
        };
        setUserName( data.name ); 
    }, []);

    // now we have got this information of this new user via authentication, if we want to pass this informaion to our app then we have to use ContextProvider as shown below. We can pass as many as ContextProvider as we want.


    return(
        <Provider store = { appStore }>  {/* we have wrapped our whole app inside our store, we can also wrap it around a specific portion of our app too */}
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>  {/* overriding the default value */}
        <div className="app">
            <Header />
            <Outlet />
            <ToastContainer />
        </div>
        </UserContext.Provider>
        </Provider>
    ); 
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element:  <ContactUs />,
            },
            {
                path: '/restaurants/:resId',   //dynamic addressing using useParams
                element:  <ResturantMenu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
        errorElement : <Error />
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
