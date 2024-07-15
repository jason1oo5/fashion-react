import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { useState } from "react";
import { Grid, ListItemIcon } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useNavigate } from "react-router";

interface CollapseProps {
  panelItem: any;
  openState: boolean;
}

const CollapseList = ({ panelItem, openState }: CollapseProps) => {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number>(-1);

  const handleClick = (idx: number) => {
    if (idx === openIdx) {
      setOpenIdx(-1);
    } else {
      setOpenIdx(idx);
    }
  };

  const handleAction = (path: string) => {
    if (path.includes("translation")) {
      window.open(path);
    } else {
      navigate("/admin/application/" + path);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#1e1e2d",
        color: "#a2a3b7",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: "#1e1e2d", color: "#494b74" }}
        >
          {openState ? panelItem.title : <MoreHorizRoundedIcon />}
        </ListSubheader>
      }
    >
      {panelItem.listItem?.map((item: any, index: number) => (
        <Grid key={index}>
          <ListItemButton
            onClick={() => handleClick(index)}
            sx={{
              color: openIdx === index ? "white" : "",
              "& svg": openIdx === index ? { color: "#3699ff !important" } : "",
              "&:hover": {
                color: "white",
                "& svg": { color: "#3699ff !important" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "45px" }}>
              <item.icon sx={{ color: "#494b74" }} />
            </ListItemIcon>
            <ListItemText
              primary={openState ? item.name : ""}
              sx={{ "& span": { fontSize: "14px" } }}
            />
            {openIdx === index ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {openState && (
            <Collapse in={openIdx === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItem?.map((subItem: any, index: number) => (
                  <ListItemButton
                    key={index}
                    sx={{ pl: 4 }}
                    onClick={() => handleAction(subItem.action)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "30px",
                        color: "#a2a3b7",
                        fontSize: "14px",
                      }}
                    >
                      <HorizontalRuleRoundedIcon sx={{ width: "12px" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={subItem.subName}
                      sx={{ "& span": { fontSize: "14px" } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </Grid>
      ))}
    </List>
  );
};

export default CollapseList;
