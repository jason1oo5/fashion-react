import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  IconButton,
  Box,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { EvoTypography } from "../../../../../components/styled-components";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, useRef } from "react";
import { LocaleType } from "../../../../../config/interface";
import { toast } from "react-toastify";
import MenuSelect from "../../../../../components/select/MenuSelect";
import {
  getLocalesData,
  updateLocalesData,
} from "../../../../../service/localeService";
import ConfirmModal, {
  ActionType,
} from "../../../../../components/ConfirmModal";

const Translations = [
  "Append new translations",
  "Replace existing translations",
];

export default function TranslationTable(props: any) {
  const classes = useStyle();

  const [showTState, setShowTState] = useState(false);
  const [langValues, setLangValues] = useState<any>();
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [replaceLocaleState, setReplaceLocaleState] = useState(0);
  const [files, setFiles] = useState("");
  const [confirmDlgState, setConfirmDlgState] = useState(false);
  const [currentLocales, setCurrentLocales] = useState<LocaleType[]>(
    props.locale
  );

  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    const fetch_locales = async () => {
      const draft_locales = await getLocalesData();
      setLangValues(draft_locales);
    };
    if (currentLocales) {
      fetch_locales();
    }
  }, [showTState]);

  const handleMenuFunc = (id: any, value: number) => {
    setReplaceLocaleState(value);
  };

  const importJsonFile = (e: any) => {
    const fileReader = new FileReader();
    setUploadedFileName(e.target.files[0].name);
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e: any) => {
      setFiles(JSON.parse(e.target.result));
      if (replaceLocaleState == 1) {
        setLangValues(e.target.result);
      } else {
        const d_langValues = { ...langValues };
        Object.assign(d_langValues, JSON.parse(e.target.result));
        setLangValues(d_langValues);
      }
    };
  };

  const handleImportBtn = (e: any) => {
    fileInputRef.current.click();
  };

  const handleExportBtn = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(langValues)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "locales.json";

    link.click();
  };

  const updateLocaleValues = (key: string, locale: string, inputVal: any) => {
    let d_langValues = { ...langValues };
    const localeValues = { ...langValues[locale] };
    Object.assign(localeValues, { [key]: String(inputVal) });
    Object.assign(d_langValues, { [locale]: localeValues });
    // d_langValues[locale][key] = String(inputVal);
    setLangValues(d_langValues);
  };

  const getLangValue = (key: string, value: string, locale: string) => {
    if (langValues[locale] == undefined || null) {
      return "";
    }
    return langValues[locale][key] ?? "";
  };

  const confirmDlgAction = (state: boolean) => {
    if (state) {
      changeLocalesData();
    }
    setConfirmDlgState(false);
  };

  const changeLocalesData = async () => {
    try {
      const result = await updateLocalesData(langValues);
      if (result) {
        toast.success("successfully updated");
      } else {
        toast.success("successfully updated");
      }
    } catch (err) {
      console.log(err);
      toast.success("successfully updated");
    }
  };

  return (
    <TableContainer>
      <Grid className={classes.flexGrid}>
        <Button
          autoFocus
          onClick={() => setShowTState(!showTState)}
          sx={{
            backgroundColor: "#5cb85c !important",
            paddingBlock: 0.9,
            paddingInline: "50px",
          }}
        >
          <EvoTypography color="white">
            {showTState ? "Hide" : "Show"} translations
          </EvoTypography>
        </Button>
        {/* <Search
          style={{
            border: "1px solid #c4c4c4",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#c4c4c4" }} />
          </SearchIconWrapper>
          <StyledInputBase
            onKeyDown={(e: any) => handleFilter(e)}
            placeholder={"Search"}
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
        }}
      >
        <MenuSelect
          id="api"
          handleMenuFunc={handleMenuFunc}
          default={Translations[0]}
          menuItems={Translations}
          type="profile"
          width="400px"
          height="35px"
        />
        <input
          ref={fileInputRef}
          onChange={importJsonFile}
          type="file"
          hidden
        />
        <Button
          onClick={handleImportBtn}
          autoFocus
          sx={{
            backgroundColor: "#5cb85c !important",
            paddingInline: "25px",
            paddingBlock: 0.9,
            ml: 5,
          }}
        >
          <FileUploadIcon sx={{ mr: 1 }} />
          <EvoTypography color="white">Import</EvoTypography>
        </Button>
        <EvoTypography
          sx={{
            ml: 2,
            fontSize: "16px",
            color: "#3498db",
          }}
        >
          {uploadedFileName}
        </EvoTypography>
        <Box sx={{ flex: 1 }} />
        <Button
          onClick={handleExportBtn}
          autoFocus
          sx={{
            backgroundColor: "#5cb85c !important",
            paddingInline: "25px",
            paddingBlock: 0.9,
            ml: 5,
          }}
        >
          <FileDownloadIcon sx={{ mr: 1 }} />
          <EvoTypography color="white">Export</EvoTypography>
        </Button>
      </Grid>

      <Table
        className={classes.table}
        sx={{ minWidth: 350, display: showTState ? "table" : "none" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>No</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Key</TableCell>
            {currentLocales.map((localeItem, index) => (
              <TableCell
                key={index}
                sx={{ textAlign: "center", textTransform: "uppercase" }}
              >
                {localeItem.locale}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {showTState &&
            langValues["en"] &&
            Object.entries(langValues["en"]).map(([key, value], index) => (
              <TableRow hover key={key}>
                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{key}</TableCell>
                {currentLocales.map((localeItem, index) => (
                  <TableCell key={index} sx={{ textAlign: "center" }}>
                    <TextareaAutosize
                      className={classes.textArea}
                      aria-label="empty textarea"
                      placeholder="Empty"
                      onChange={(e) =>
                        updateLocaleValues(
                          key,
                          localeItem.locale,
                          e.target.value
                        )
                      }
                      value={String(
                        getLangValue(key, String(value), localeItem.locale)
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <EvoTypography
        sx={{
          fontSize: "20px",
          borderBottom: "1px solid #c4c4c4",
          marginBlock: 3,
        }}
      >
        Export all translations
      </EvoTypography>
      <Button
        id="publish"
        autoFocus
        onClick={() => setConfirmDlgState(true)}
        sx={{
          backgroundColor: "#337ab7 !important",
          paddingInline: "15px",
        }}
      >
        <EvoTypography color="white" textTransform={"capitalize"}>
          Publish all
        </EvoTypography>
      </Button>
      <ConfirmModal
        action={ActionType.UPDATE}
        title={"Translation Manager"}
        content={"Are you sure to submit updates?"}
        open={confirmDlgState}
        onClose={confirmDlgAction}
      />
    </TableContainer>
  );
}

const useStyle = makeStyles({
  flexGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    fontFamily: "Urbanist",
    fontSize: "14px",
    backgroundColor: "#f3f6f9",
    transition:
      "color .15s ease,background-color .15s ease,border-color .15s ease,box-shadow .15s ease",
    padding: "0.65rem 1rem",
    color: "#3f4254",
    backgroundClip: "padding-box",
    border: "1px solid #c4c4c4",
    borderRadius: "0.22rem",
    // minHeight: "17px",
    minWidth: "100px",
  },
  table: {
    "& td": {
      padding: "0px !important",
      lineHeight: 0,
    },
  },
});
