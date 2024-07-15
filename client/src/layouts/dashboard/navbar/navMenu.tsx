import * as React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import {
  EvoTypography,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/styled-components";
import { logout } from "../../../service/authService";
import { useDispatch } from "react-redux";
import { filterOptState, setFilterOpt } from "../../../reducers/filterSlice";
import { useSelector } from "react-redux";
import UserMenu from "../../../components/UserMenu";
import UserContext from "../../../contexts/userContext";
import ShopCart from "../../../components/cart";
import { getUserCompanies } from "../../../service/userService";
import { setAccountState, setCompany } from "../../../reducers/accountSlice";
import { UserCompanyType } from "../../../config/interface";

const pages = ["MARKETPLACE", "TUTORIALS", "DOWNLOAD"];
const langs = [
  { abbr: "us", title: "United State" },
  { abbr: "ch", title: "Chinese" },
  { abbr: "ja", title: "Japanese" },
];

const NavMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  //auth
  const contextUser = React.useContext(UserContext);
  const filterOpt = useSelector(filterOptState);
  const userCompaniesState = useSelector((state: any) => state.account.company);
  const accountState = useSelector((state: any) => state.account.accountState);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);
  const [lang, setLang] = React.useState("us");

  React.useEffect(() => {
    const fetch_userCompanyInfo = async () => {
      const userCompanies = await getUserCompanies();
      dispatch(setCompany(userCompanies));
    };
    fetch_userCompanyInfo();
  }, [dispatch]);

  React.useEffect(() => {
    const account_type = 1;
    const companyIdx = undefined;
    dispatch(setAccountState({ companyIdx, account_type }));
  }, [dispatch]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    if (path == "MARKETPLACE") {
      navigate("/dashboard/marketplace/product-store");
    } else {
      navigate("/dashboard/" + path.toLocaleLowerCase());
    }
    setAnchorElNav(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };

  const handleCurrentLang = (inputLang: any) => {
    setLang(inputLang);
    i18next.changeLanguage(inputLang);
  };

  const handleAccountType = (account_type: number, companyIdx?: number) => {
    dispatch(setAccountState({ companyIdx, account_type }));
    handleCloseAccountMenu();
  };

  const logoutEvovor = async () => {
    await logout();
    navigate("/login");
  };

  const handleFilter = (event: any) => {
    if (event.key == "Enter") {
      let opt = Object.assign({}, filterOpt);
      Object.assign(opt, { search: event.target.value });
      dispatch(setFilterOpt(opt));
    }
  };

  return (
    <>
      <Toolbar disableGutters sx={{ maxHeight: "55px" }}>
        <IconButton
          href="/"
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
          }}
        >
          <img
            src="/assets/images/navbar/eflogo.png"
            alt="logo"
            width="100%"
            height="auto"
          />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            // onClose={ () => handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& ul": { backgroundColor: "#1e1e2d" },
            }}
          >
            <IconButton
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
            >
              <img
                src="/assets/images/navbar/eflogo.png"
                alt="logo"
                width="100%"
                height="auto"
              />
            </IconButton>
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  backgroundColor: location.pathname.includes(
                    page.toLowerCase()
                  )
                    ? "#0a5274"
                    : "transparent ",
                }}
              >
                <EvoTypography textAlign="center" color="white">
                  {page}
                </EvoTypography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, ml: 5, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleCloseNavMenu(page)}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                backgroundColor: location.pathname.includes(page.toLowerCase())
                  ? "#0a5274 !important"
                  : "transparent ",
              }}
            >
              <EvoTypography>{t(page.toLocaleLowerCase())}</EvoTypography>
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={(e: any) => handleFilter(e)}
              placeholder={t("search")}
              inputProps={{ "aria-label": "search" }}
              defaultValue={filterOpt.search}
            />
          </Search>
          <ShopCart />
          <IconButton
            onClick={handleOpenAccountMenu}
            sx={{ p: 0, mr: 2.5, color: "#06c5aa", borderRadius: 0 }}
          >
            {accountState.account_type == 1 ? (
              <PersonIcon
                sx={{
                  width: "28px",
                  height: "28px",
                }}
              />
            ) : (
              <ApartmentIcon
                sx={{
                  width: "28px",
                  height: "28px",
                }}
              />
            )}
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="account-menu-appbar"
            anchorEl={anchorElAccount}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElAccount)}
            onClose={handleCloseAccountMenu}
          >
            <MenuItem onClick={() => handleAccountType(1)}>
              <PersonIcon sx={{ color: "#06c5aa", mr: 1 }} />
              <EvoTypography>{contextUser?.user.name}</EvoTypography>
            </MenuItem>
            {userCompaniesState?.map(
              (companyItem: UserCompanyType, index: number) => (
                <MenuItem
                  onClick={() => handleAccountType(2, index)}
                  key={index}
                >
                  <ApartmentIcon sx={{ color: "#06c5aa", mr: 1 }} />
                  <EvoTypography>{companyItem.company[0].name}</EvoTypography>
                </MenuItem>
              )
            )}
          </Menu>
          <IconButton
            onClick={handleOpenLangMenu}
            sx={{ p: 0, mr: 2.5, color: "#f5f5f5bf", borderRadius: 0 }}
          >
            <img
              alt="Remy Sharp"
              src={"/assets/images/flags/" + lang + ".png"}
              style={{ width: "30px", height: "auto" }}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="lang-menu-appbar"
            anchorEl={anchorElLang}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
          >
            {langs.map((langIndex) => (
              <MenuItem key={langIndex.abbr} onClick={handleCloseLangMenu}>
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleCurrentLang(langIndex.abbr)}
                >
                  <img
                    alt="Remy Sharp"
                    src={"/assets/images/flags/" + langIndex.abbr + ".png"}
                    style={{ width: "30px" }}
                  />
                  <EvoTypography sx={{ ml: 1.5 }}>
                    {langIndex.title}
                  </EvoTypography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
          {contextUser?.user?.token ? (
            <UserMenu user={contextUser.user} />
          ) : (
            <IconButton
              href="/login"
              sx={{
                color: "white",
                fontSize: "0.9rem",
                display: "flex",
                alignItmes: "center",
              }}
            >
              {t("sign_in")}
              <AccountCircleIcon sx={{ fontSize: "28px", ml: 1 }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </>
  );
};
export default NavMenu;
