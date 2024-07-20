import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  CssBaseline,
  Menu,
  MenuItem,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import "./navbar.css";
import { useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAppSelector } from "../../state/hooks";
import { getAuthData } from "../../state/reducers/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ico from "../../images/favicon.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("xs")]: {
    marginLeft: 50,
    width: "240px",
  },
}));

const SearchIconWrapper = styled("div")({
  padding: 10,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SearchInput = styled("input")(({ theme }) => ({
  color: "inherit",
  border: "none",
  outline: "none",
  background: "transparent",
  width: "80%",
  padding: "8px 10px",
  fontSize: "1rem",
}));
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

export default function NavBar() {
  const searchRef = useRef<any>(null);
  const { user, displayName, email } = useAppSelector(getAuthData);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("adadfads222222", searchRef.current);
    if (searchRef.current.value === "at") {
      navigate("/aerationTank");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p7") {
      navigate("/PrimaryClarifierP7");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p8") {
      navigate("/PrimaryClarifierP8");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p9") {
      navigate("/PrimaryClarifierP9");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p24") {
      navigate("/secondaryClarifierP24");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p25") {
      navigate("/secondaryClarifierP25");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "p32") {
      navigate("/secondaryClarifierP32");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "mb") {
      navigate("/mainBuilding");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "ws") {
      navigate("/workShop");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "ct") {
      navigate("/chlorinationTank");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "ps2") {
      navigate("/pumpingStation2");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "ps1") {
      navigate("/pumpingStation1");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "sf") {
      navigate("/sandFilter");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "cw") {
      navigate("/closingWall");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "pt") {
      navigate("/preliminaryTreatment");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "br") {
      navigate("/blowersRoom");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "ms") {
      navigate("/mainStation");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "er1") {
      navigate("/electricalRoom1");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "er2") {
      navigate("/electricalRoom2");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "wp") {
      navigate("/waterPipesNetwork");
      window.location.reload();
      return false;
    } else if (searchRef.current.value === "st") {
      navigate("/sludgeTreatmentBuilding");
      window.location.reload();
      return false;
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";
  const isMobile = useMediaQuery("(max-width: 800px)"); // Breakpoint for mobile devices

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // // Function to handle mobile menu open/close
  // const handleMobileMenuOpen = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };

  // Function to handle mobile menu open
  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Function to handle mobile menu close
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar className="navBar" style={{ height: 60 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          {!isMobile && (
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: "5px",
                marginLeft: 4,
              }}
            >
              <img
                src={ico}
                alt="hhh"
                width="35vw"
                style={{ margin: "0 10px 0 0", padding: 0, left: 0 }}
              />
            </Link>
          )}
          {/* Home link (Visible on larger screens) */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: "5px",
              marginLeft: 4,
            }}
          >
            {!isMobile && (
              <Button color="inherit" sx={{ marginRight: 0, fontSize: 20 }}>
                <Typography variant="h6" noWrap component="div">
                  Home
                </Typography>
              </Button>
            )}
          </Link>
          {/* Search component (adjust the code as needed) */}
          <Search className="search">
            {/* Search component (adjust the code as needed) */}
            <form onSubmit={handleSearch}>
              <SearchIconWrapper sx={{ mt: -0.5 }}>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput
                placeholder={!isMobile ? "ex 'at' for aerationTank" : "search"}
                ref={searchRef}
                sx={{ ml: 3.5 }}
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          {/* Menu items (Visible on larger screens) */}
          {!isMobile ? (
            <>
              <Link
                to="../allitn"
                style={{
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">Inspections</Button>
              </Link>
              <Link
                to="../allconcrete"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">CONCRETE</Button>
              </Link>
              <Link
                to="../allreinforcement"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">Material</Button>
              </Link>{" "}
              <Link
                to="../allNcr"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">Conformities</Button>
              </Link>{" "}
              <Link
                to="../allQor"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">observations</Button>
              </Link>
              <Link
                to="../allLab"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: "5px",
                  marginLeft: 4,
                }}
              >
                <Button color="inherit">Docs&nbsp;/&nbsp;Lab</Button>
              </Link>
            </>
          ) : (
            // Mobile menu button (visible on mobile screens)
            <>
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    md: "flex",
                    marginRight: 3,
                    position: "absolute",
                    left: 0,
                  },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                  sx={{ transform: "scale(1.5)", ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileMoreAnchorEl}
                  open={Boolean(mobileMoreAnchorEl)}
                  onClose={handleMobileMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* Add menu items for mobile screens here */}
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allitn"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Inspections
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allconcrete"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Concrete
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allreinforcement"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Material
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allncr"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Conformities
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allqor"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Observations
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <Link
                      to="../allLab"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Doc / Lab
                    </Link>
                  </MenuItem>
                  {/* Add other menu items for mobile screens here */}
                </Menu>
              </Box>
            </>
          )}
          {/* User information (Visible on larger screens) */}
          {!isMobile && (
            <LightTooltip title={email}>
              <AccountCircleIcon
                style={{
                  cursor: "pointer",
                  // backgroundColor: "rebeccapurple",
                  borderRadius: 4,
                  fontSize: 36,
                  padding: 5,
                  margin: 5,
                }}
              />
            </LightTooltip>
          )}
          {/* Logout button (Visible on larger screens and if the user is logged in) */}
          {user && (
            <LightTooltip title="Logout">
              <LogoutIcon
                style={{
                  cursor: "pointer",
                  backgroundColor: "purple",
                  borderRadius: 25,
                  fontSize: 36,
                  padding: 5,
                }}
                sx={{ right: 0, position: "relative" }}
                onClick={() => {
                  signOut(auth);
                  console.log("logged out");
                  navigate("/register");
                }}
              />
            </LightTooltip>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
