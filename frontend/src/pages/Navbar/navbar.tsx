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
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useRef } from "react";
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
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }} className="navBar">
      <AppBar position="static">
        <Toolbar>
          <img
            src={ico}
            alt="hhh"
            width="3.2%"
            style={{ margin: "0 20px 0 0", padding: 0, left: 0 }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit" sx={{ marginRight: 0 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                Home
              </Typography>
            </Button>
          </Link>
          <Search className="search">
            <form onSubmit={handleSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <input
                placeholder="e.g < at > for aeration tank"
                ref={searchRef}
                className="Winput"
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Link
            to="../allitn"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">Inspections</Button>
          </Link>
          <Link
            to="../allconcrete"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">CONCRETE</Button>
          </Link>
          <Link
            to="../allreinforcement"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">Material</Button>
          </Link>{" "}
          <Link
            to="../allNcr"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">Conformities</Button>
          </Link>{" "}
          <Link
            to="../allQor"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">observations</Button>
          </Link>
          <Link
            to="../allLab"
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "0 12px",
            }}
          >
            <Button color="inherit">Docs&nbsp;/&nbsp;Lab</Button>
          </Link>
          <Box sx={{ display: { xs: "flex", md: "none", marginRight: 3 } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            sx={{
              margin: "0 18px",
              textTransform: "lowercase",
              xs: "flex",
              md: "none",
            }}
          >
            {email}
          </Button>
          {user && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LogoutIcon />}
              className="barbar"
              onClick={() => {
                signOut(auth);
                console.log("logged out");
                navigate("/register");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
