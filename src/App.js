//App.js

import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import ResturantMenu from "./components/ResturantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";  // creates a routing configuration

const AppLayout = () => {
    return(
        <div className="app">
            <Header />
            <Outlet />
        </div>
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
                path: "/restuarants/:resId",   //dynamic addressing
                element:  <ResturantMenu />,
            },
        ],
        errorElement : <Error />
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
