import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Menu, { MenuProps } from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { Grid, IconButton, Typography } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Badge, { BadgeProps } from "@mui/material/Badge";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid #06c5aa`,
    backgroundColor: "#27273c",
    padding: "0 4px",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const FooterTitle = styled(Typography)`
  color: #868687;
  font-size: 16px;
  font-weight: 600;
`;

export const FooterContent = styled(Typography)`
  color: white;
  font-size: 14px;
  font-weight: 200;
  line-height: 2;
`;
interface LoginInputProps {
  width?: string;
  height?: string;
}
export const LoginInput = styled("input")(
  ({ width, height }: LoginInputProps) => ({
    width: width ? width : "100%",
    height: height ? height : "30px",
  })
);

interface LoginBtnProps {
  bgcolor: string;
  textcolor: string;
  borderraidus?: string;
  width: string;
}

export const LoginButton = styled("button")(
  ({ bgcolor, textcolor, borderraidus, width }: LoginBtnProps) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    verticalAlign: "middle",
    fontSize: "0.9375rem",
    lineHeight: 1.75,
    border: 0,
    minWidth: "64px",
    padding: "8px 22px",
    transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(255, 255, 255)`,
    backgroundColor: "rgb(103, 58, 183)",
    width: "100%",
    boxShadow: "none",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: "rgb(94, 53, 177)",
    },
  })
);

export const EvoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Urbanist",
  fontSize: "14px",
  textTransform: "none",
}));

export const EvoButton = styled(IconButton)(({ theme }) => ({
  width: "100%",
  color: "white",
  fontSize: "18px",
  backgroundColor: "#187DE4 !important",
  borderRadius: "3px",
}));

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export const FormInput = styled("input")`
  background-color: #f3f6f9;
  border-color: #f3f6f9;
  color: #3f4254;
  transition: color 0.15s ease, background-color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease;
  display: block;
  width: -webkit-fill-available;
  height: 19.5px;
  padding: 0.65rem 1rem;
  color: #3f4254;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #c4c4c4;
  border-radius: 0.22rem;
`;

export const AccountWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  borderRadius: 5,
  boxShadow: "0 0 30px 0 rgb(82 63 105 / 30%)",
  backgroundColor: "white",
}));

export const SidebarWrapper = styled(Grid)(({ theme, right }: any) => ({
  width: "375px",
  height: "100%",
  padding: "30px",
  position: "fixed",
  top: 0,
  right: right,
  zIndex: 5,
  fontFamily: "Russo One",
  fontWeight: 250,
  opacity: 0.98,
  border: "0.5px solid #212130",
  backgroundColor: "#27273c",
  transform: "translate(0px, 0px)",
  transitionDuration: "0.5s",
}));
