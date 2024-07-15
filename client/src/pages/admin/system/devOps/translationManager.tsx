import * as React from "react";
import { Box, Button, Grid, Link, IconButton, Tooltip } from "@mui/material";
import Page from "../../../../components/Page";
import {
  EvoTypography,
  FormInput,
} from "../../../../components/styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import DownloadingIcon from "@mui/icons-material/Downloading";
import TranslationTable from "./tables/translationTable";
import {
  addNewLocale,
  getCurrentLocales,
  removeLocale,
} from "../../../../service/localeService";
import { LocaleType } from "../../../../config/interface";
import { toast } from "react-toastify";
import ConfirmModal, { ActionType } from "../../../../components/ConfirmModal";
// import { useSelector } from "react-redux";
// import { localeState } from "../../../../reducers/localeSlice";

const TranslationManager = () => {
  const localeRef = React.useRef<any>();
  const localeNameRef = React.useRef<any>();
  const [locales, setLocales] = React.useState<any>();
  const [reload, setReload] = React.useState(false);
  const [confirmDlgState, setConfirmDlgState] = React.useState(false);
  const [localeID, setLocaleID] = React.useState<any>();
  // const locales = useSelector(localeState);

  React.useEffect(() => {
    const fetch_locales = async () => {
      const res_locales = await getCurrentLocales();
      setLocales(res_locales);
    };
    fetch_locales().catch((err) => {
      console.log(err);
    });
  }, [reload]);

  const addLocale = async () => {
    const newLocale = {
      locale: localeRef.current.value,
      locale_name: localeNameRef.current.value,
    };

    try {
      const result = await addNewLocale(newLocale);
      if (result) {
        toast.success("Locale successfully added");
        setReload(!reload);
      } else {
        toast.error("Error occured");
      }
    } catch (err) {
      toast.error("Error occured");
    }
  };

  const deleteLocale = async (_id: any) => {
    setLocaleID(_id);
    setConfirmDlgState(true);
  };

  const confirmDlgAction = async (state: boolean) => {
    if (state) {
      try {
        const result = await removeLocale(localeID);
        if (result) {
          toast.success("Successfully deleted");
          setReload(!reload);
        } else {
          toast.error("Error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setConfirmDlgState(false);
  };

  return (
    <Page title="Translation Manager">
      <Box
        sx={{
          height: "55px",
          backgroundColor: "#222222",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          href="#"
          sx={{ textDecoration: "none", ml: 3, cursor: "pointer" }}
        >
          <EvoTypography
            sx={{
              color: "#9d9d9d",
              "&:hover": { color: "#fff" },
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Translation Manager
          </EvoTypography>
        </Link>
      </Box>
      <Grid p={3}>
        <EvoTypography
          sx={{ fontSize: "20px", borderBottom: "1px solid #c4c4c4" }}
        >
          Supported locales
        </EvoTypography>
        <EvoTypography sx={{ mt: 2, mb: 1.5 }}>
          Current supported locales
        </EvoTypography>
        {locales && (
          <CheckboxList locale={locales} deleteLocale={deleteLocale} />
        )}
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <FormInput
            ref={localeRef}
            placeholder="Locale"
            style={{ width: "100px", height: "12px" }}
          />
          <FormInput
            ref={localeNameRef}
            placeholder="Locale Name"
            style={{ width: "200px", height: "12px", marginLeft: "33px" }}
          />
          <Button
            autoFocus
            onClick={addLocale}
            sx={{
              border: "1px solid #c4c4c4",
              paddingInline: "20px",
              marginBlock: 2,
              ml: 5,
            }}
          >
            <EvoTypography color="black" textTransform={"capitalize"}>
              Add new locale
            </EvoTypography>
          </Button>
        </Grid>
        <EvoTypography
          sx={{
            fontSize: "20px",
            borderBottom: "1px solid #c4c4c4",
            marginBlock: 3,
          }}
        >
          Manage translations
        </EvoTypography>
        <Grid sx={{ marginBlock: 3 }}>
          {locales && <TranslationTable locale={locales} reload={reload} />}
        </Grid>
      </Grid>
      <Tooltip title="Ready publish?">
        <Link
          href="#publish"
          sx={{
            position: "fixed",
            top: "300px",
            right: "40px",
          }}
        >
          <DownloadingIcon
            sx={{
              width: "28px",
              height: "28px",
            }}
          />
        </Link>
      </Tooltip>
      <ConfirmModal
        action={ActionType.DELETE}
        title={"Translation Manager"}
        content={"Are you sure to delete this locale?"}
        open={confirmDlgState}
        onClose={confirmDlgAction}
      />
    </Page>
  );
};

function CheckboxList(props: any) {
  const { locale } = props;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      {locale.map((localeItem: LocaleType, index: number) => {
        const labelId = `checkbox-list-label-${localeItem.locale}`;

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              role={undefined}
              dense
              sx={{ pointerEvents: "none" }}
            >
              <ListItemIcon>
                <IconButton
                  onClick={() => props.deleteLocale(localeItem._id)}
                  sx={{ pointerEvents: "auto" }}
                >
                  <ClearIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={localeItem.locale}
                sx={{
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TranslationManager;
