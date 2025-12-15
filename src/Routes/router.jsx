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
import DashBoardHome from "../Pages/Dashboard/DashBoardHome/DashBoardHome";
import MyBookedTickets from "../Pages/Dashboard/UserDashboard/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/UserDashboard/TransactionHistory";
import ManageTickets from "../Pages/Dashboard/AdminDashboard/ManageTickets";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import AdvertiseTickets from "../Pages/Dashboard/AdminDashboard/AdvertiseTickets";
import MyAddedTickets from "../Pages/Dashboard/VendorDashboard/MyAddedTickets";
import RequestedBookings from "../Pages/Dashboard/VendorDashboard/RequestedBookings";
import RevenueOverview from "../Pages/Dashboard/VendorDashboard/RevenueOverview";
import AddTickets from "../Pages/Dashboard/VendorDashboard/AddTickets";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        hydrateFallbackElement: <Loader></Loader>,
        children: [
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
        children: [
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
        children: [
            {
                index: true,
                element: <DashBoardHome></DashBoardHome>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'booked-tickets',
                element: <MyBookedTickets></MyBookedTickets>
            },
            {
                path: 'transaction-history',
                element: <TransactionHistory></TransactionHistory>
            },
            {
                path: 'manage-tickets',
                element: <ManageTickets></ManageTickets>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'advertise-tickets',
                element: <AdvertiseTickets></AdvertiseTickets>
            },
            {
                path: 'add-tickets',
                element: <AddTickets></AddTickets>
            },
            {
                path: 'added-tickets',
                element: <MyAddedTickets></MyAddedTickets>
            },
            {
                path: 'requested-bookings',
                element: <RequestedBookings></RequestedBookings>
            },
            {
                path: 'revenue-overview',
                element: <RevenueOverview></RevenueOverview>
            }
        ]

    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])