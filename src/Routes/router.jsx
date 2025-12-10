import { createBrowserRouter } from "react-router";
import Loader from "../Components/Shared/Loader";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import ErrorPage from "../Pages/Errors/ErrorPage";
import Profile from "../Pages/Dashboard/DashBoardHome/Profile";
import AllTickets from "../Pages/AllTickets/AllTickets";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        hydrateFallbackElement: <Loader></Loader>,
        children:[
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'about',
                element: <About></About>
            },
             {
                path: 'all-tickets',
                element: <PrivateRoutes>
                    <AllTickets></AllTickets>
                </PrivateRoutes>
            }
       
        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        hydrateFallbackElement: <Loader></Loader>,
        children:[
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        hydrateFallbackElement: <Loader></Loader>,
        children:[
            {
                index: true,
                element: <Profile></Profile>
            }
        ]
       
    },
     {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])