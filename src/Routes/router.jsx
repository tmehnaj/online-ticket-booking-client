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
            }
       
        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
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
       
    }
])