import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { AuthContext } from "../../App";
export default function NavbarUI() {
  const [openNav, setOpenNav] = useState(false);
  const [loggedin, setLoggedIn] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") == "true") {
      setLoggedIn(true);
      navigate("/");
    }
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography className="p-1 font-normal text-gray-600 hover:text-gray-800 text-base transition hover:underline ">
        <Link to="/Account" className="flex items-center">
          Account
        </Link>
      </Typography>
      <Typography className="p-1 font-normal text-gray-600 hover:text-gray-800 text-base transition hover:underline ">
        <Link to="/help" className="flex items-center">
          Help
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4 h-[9vh]">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal text-lg"
        >
          <Link to="/">
            <i className="text-amber-600"> P</i>
            <i className="text-blue-500">i</i>
            <i className="text-purple-600">n</i>
            <i className="text-emerald-600">-GO</i>
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {loggedin ? (
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block mx-2"
          >
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </Button>
        ) : (
          <div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block mx-2"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block mx-2"
            >
              <Link to="/signup">Signup</Link>
            </Button>
          </div>
        )}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {loggedin ? (
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Logout</span>
            </Button>
          ) : (
            <div>
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Signup</span>
              </Button>
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Login</span>
              </Button>
            </div>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
