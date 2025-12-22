import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { IoSunnySharp } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import Logo from '../Logo/Logo';
import Container from '../Container';
import { ThemeContext } from '../../../Providers/ThemeContext';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {

  const { user, logOutUser, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, handleChangeTheme } = useContext(ThemeContext);


  const handleLogOut = (e) => {
    e.preventDefault();
    logOutUser()
      .then(() => {
        toast.success('Log Out Successfully!');
        setLoading(false);
      })
      .catch(err => {
        //console.log(err);
      })
  }


  //all nav links 
  const links = <>
    <NavLink to='/'><li className="px-2 pb-0.5 border-b-2 border-transparent">Home</li></NavLink>
    <NavLink to='/about'><li className="px-2 pb-0.5 border-b-2 border-transparent">About</li></NavLink>
    {
      user ? (
        <>
          <NavLink to='/all-tickets'><li className="px-2 pb-0.5 border-b-2 border-transparent">All Tickets</li></NavLink>
          <NavLink to='/dashboard'><li className="px-2 pb-0.5 border-b-2 border-transparent">Dashboard</li></NavLink>

        </>
      ) : <div className="lg:hidden flex flex-col gap-2 mt-2 p-2 border-t">
        <Link to={"/login"} className="btn2 flex items-center justify-center"
        > Login </Link>
        <Link to={"/register"} className="btn1 flex items-center justify-center"
        > SignUp </Link>
      </div>
    }
  </>


  return (
    <nav className=" bg-base-100 shadow-sm py-1">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pr-3 pl-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
              >
                {links}
              </ul>
            </div>
            <Link to="/"><Logo></Logo></Link>
            {/* <a className="text-xl font-medium">Book Palace</a> */}
          </div>
          {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links}
        </ul>
      </div> */}
          <div className="navbar-end">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {links}
              </ul>
            </div>
            <div className='cursor-pointer mr-3 pr-1.5' onClick={handleChangeTheme}>
              {
                theme === 'dark' ? <IoSunnySharp className='w-5 h-5 text-warning' /> : <MdDarkMode className='w-5 h-5' />
              }
            </div>

            {loading ? (
              <span></span>
            ) : user ? (

              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:opacity-90 transition tooltip tooltip-bottom tooltip-primary z-50"
                  data-tip={`${user?.displayName || 'user name'}`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 ">
                    <img
                      src={user?.photoURL || <FaUserCircle />}
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full "

                    />
                  </div>
                </div>

                <div
                  tabIndex={-1}
                  className="dropdown-content menu shadow-lg bg-white rounded-lg mt-3 w-72 px-6 py-6 space-y-6 transition-all text-center"
                >
                  {/* Profile Info */}
                  <div className="border-b border-info-content pb-5">
                    <p className="text-lg font-semibold text-[#1E293B]">
                      {user?.displayName || 'Update Profile'}
                    </p>
                    <p className="text-sm text-[#1E293B] break-all mt-1">
                      {user?.email}
                    </p>
                  </div>

                  {/* Buttons Side-by-Side */}
                  <div>
                    <div className="grid grid-cols-2 gap-3 ">
                      <Link to="/dashboard/profile" ><button className="w-full btn3">
                        Profile
                      </button></Link>

                      <button onClick={handleLogOut} className="w-full btn1">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            ) : (
              <div className='hidden sm:flex'>
                <Link to={"/login"} className="btn2 mr-3.5"
                > Login </Link>
                <Link to={"/register"} className="btn1"
                > SignUp </Link>
              </div>
            )}

            {/* <Link to="/login">
            <button className="btn1"> LogIn </button>
          </Link> */}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;