import React, { useContext } from 'react';
import { FaBus, FaUser } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';
import { ThemeContext } from '../Providers/ThemeContext';
import useRole from '../Hooks/useRole';

const DashboardLayout = () => {
    const { role } = useRole();
    const { theme } = useContext(ThemeContext);



    return (
        <div className="drawer lg:drawer-open">
            <title>Dashboard</title>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-primary-content">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">DashBoard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-secondary-content is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary" data-tip="Homepage">
                                {/* Home icon */}
                                {
                                    theme === 'dark' ? <>
                                        <FaBus className='text-secondary w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                        <span className='logo text-sm  md:text-base lg:text-base font-extrabold bg-[linear-gradient(30deg,#17663F,#d53f3f)]
 text-transparent bg-clip-text is-drawer-close:hidden'>TicketBari</span></>
                                        : <>
                                            <FaBus className='text-secondary w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                            <span className='logo text-sm  md:text-base lg:text-base font-extrabold bg-[linear-gradient(30deg,#44c781,#d53f3fe6)]
 text-transparent bg-clip-text is-drawer-close:hidden'>TicketBari</span></>
                                }
                            </Link>
                        </li>


                        {/* our link */}

                        <li>
                            <Link to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Homepage">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Profile</span>
                            </Link>
                        </li>


                  

                   

                        {
                            role === '' && <>
                                <li>
                                    <Link to="/dashboard/booked-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="My Booked Tickets">
                                        {/* Home icon */}
                                        <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                        <span className='is-drawer-close:hidden'>Booked Tickets</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/transaction-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Transaction History">
                                        {/* Home icon */}
                                        <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                        <span className='is-drawer-close:hidden'>Transaction History</span>
                                    </Link>
                                </li>
                            </>
                        }

                        {
                            role === '' && <>
                                  <li>
                            <Link to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Manage Users">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Manage Users</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/manage-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Manage Tickets">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Manage Tickets</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/advertise-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Advertise Tickets">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Advertise Tickets</span>
                            </Link>
                        </li>
                        </>
                        }

                        {
                            role === '' && <>
                                 <li>
                            <Link to="/dashboard/added-tickets" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Added Tickets">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Added Tickets</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/requested-bookings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Requested Bookings">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Requested Bookings</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/revenue-overview" className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Revenue Overview">
                                {/* Home icon */}
                                <FaUser className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4 ' />
                                <span className='is-drawer-close:hidden'>Revenue Overview</span>
                            </Link>
                        </li>
                        </>
                        }


                        {/* our link end */}

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-primary text-base-content" data-tip="Settings">
                                {/* Settings icon */}
                                <IoSettingsSharp className='w-3 h-3 md:w-4 md:h-4 lg:h-4 lg:w-4' />
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;