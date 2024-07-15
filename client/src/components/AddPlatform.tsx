import { Grid, IconButton, Input } from "@mui/material";
import MenuSelect from "./select/MenuSelect";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { configState } from "../reducers/configSlice";

const AddPlatform = (props: any) => {
  const { platformList } = useSelector(configState);

  useEffect(() => {
    if (props.getState) {
      props.handlePlatformData(platformData);
    }
  }, [props.getState]);

  const [platformData, setPlatformData] = useState<any>({
    file: "",
    system: "Windows",
  });
  const handleUploadChange = (event: any) => {
    const file = event.target.files[0];
    const d_platformData = { ...platformData };
    Object.assign(d_platformData, { file: file });
    setPlatformData(d_platformData);
  };

  const handleSystem = (value: any) => {
    const d_platformData = { ...platformData };
    Object.assign(d_platformData, { system: value });
    setPlatformData(d_platformData);
  };

  return (
    <Grid sx={{ display: "flex", alignItems: "center" }}>
      <Input
        type="file"
        sx={{ mr: 5 }}
        onChange={(e) => handleUploadChange(e)}
        inputProps={{
          accept: ".zip",
        }}
      />
      <MenuSelect
        type="profile"
        id="system"
        handlePublicState={handleSystem}
        default={platformList[props.type - 1]}
        menuItems={platformList}
        height="34px"
      />
      <IconButton
        onClick={() => props.removePlatform(props.index)}
        sx={{ ml: 5, color: "#eb6565" }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Grid>
  );
};

export default AddPlatform;
