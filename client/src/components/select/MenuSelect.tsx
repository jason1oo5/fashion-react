import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { EvoTypography } from "../styled-components";
import { useSelector } from "react-redux";
import { filterOptState, setFilterOpt } from "../../reducers/filterSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;

const MenuSelect = (props: any) => {
  const { t } = useTranslation();
  const { menuItems, type, height, width, id } = props;

  const filterOpt = useSelector(filterOptState);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState(props.default);

  React.useEffect(() => {
    setSelectedItem(props.default);
  }, [props.default]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const selectItemFunc = (item: string, index: number) => {
    setAnchorEl(null);
    setSelectedItem(item);
    const opt = { ...filterOpt };
    switch (type) {
      case "category":
        Object.assign(opt, { type: index + 1 });
        break;

      case "price":
        item = item.replaceAll("$", "").trim();
        const min_p = item.split("~")[0];
        const max_p = item.split("~")[1];
        Object.assign(opt, { minPrice: min_p, maxPrice: max_p });
        break;

      case "sort":
        Object.assign(opt, { sortBy: item });
        break;
      case "perPage":
        Object.assign(opt, { perPage: item });
    }
    switch (id) {
      case "public":
        props.handlePublicState(index);
        break;
      case "system":
        props.handleSystem(item);
        break;
      case "e_price":
        props.handlePrice(item);
        break;
      case "p_category":
        props.handleCategory(index + 1);
        break;
      case "gender":
        props.handleProfile(id, index);
        break;
      case "locale":
        props.handleProfile(id, item);
        break;
      case "normal":
        props.handleMenuFunc(id, item);
        break;
      case "license_service":
        props.handleMenuFunc(id, index + 1);
        break;
      case "api":
        props.handleMenuFunc(id, index);
        break;
      case "field":
        props.handleStructureFunc(props.index, index + 1);
        break;
    }

    if (type == "category" || "sort" || "price" || "perPage") {
      dispatch(setFilterOpt(opt));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: width ?? "100%", maxWidth: props.maxWidth ?? "inherit" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          border:
            type === "profile" || type === "perPage"
              ? "1px solid #c4c4c4"
              : "1px solid white",
          borderRadius: "3px",
          width: "100%",
          height: height ? height : "",
          display: "flex",
          justifyContent: "space-between",
          p: "8px 6px 8px 14px",
          color: type === "profile" ? "" : "white",
        }}
      >
        <EvoTypography
          sx={{
            color:
              type === "profile" || type === "perPage" ? "#757575" : "white",
            fontSize: "16px",
          }}
        >
          {t(selectedItem)}
        </EvoTypography>
        <ArrowDropDownIcon
          sx={{
            color:
              type === "profile" || type === "perPage" ? "#757575" : "white",
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        // defaultValue={menuItems[0]}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: anchorEl ? anchorEl.offsetWidth : "none",
        //   },
        // }}
      >
        {menuItems.map((item: any, index: number) => (
          <MenuItem
            key={item + index}
            selected={item === "Pyxis"}
            onClick={() => selectItemFunc(item, index)}
          >
            {t(item)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuSelect;
