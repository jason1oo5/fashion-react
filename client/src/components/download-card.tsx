import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DownloadUrls } from "../config/navConfig";
import UserContext from "../contexts/userContext";
import { useThemeStyle } from "../hooks/useThemeStyle";
import { EvoTypography } from "./styled-components";

interface DCardProps {
  data: any;
}

export default function DownloadCard({ data }: DCardProps) {
  const { t } = useTranslation();
  const contextUser = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useThemeStyle();

  const handleDownloadBtn = (btnName: any) => {
    if (contextUser?.user.token) {
      if (btnName == "Download") {
        window.open(DownloadUrls["evovor.com"]);
        window.open(DownloadUrls["devovor.com"]);
        window.open(DownloadUrls["etoron.com"]);
        window.open(DownloadUrls["evoauth.personal"]);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        width: "294px",
        height: data.active ? "706px" : "606px",
        backgroundColor: data.active ? "#058499" : theme.palette.primary.main,
        p: 1,
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ textAlign: "center", paddingBlockStart: 10 }}>
        <EvoTypography fontSize="26px" fontWeight="600" color="white">
          {t(data.title)}
        </EvoTypography>
        <EvoTypography
          fontSize="26px"
          fontWeight="300"
          color="white"
          sx={{ marginBlock: "30px" }}
        >
          {t(data.type)}
        </EvoTypography>
        {data.content.map((item: any, index: number) => (
          <EvoTypography key={item + index} color="white">
            {t(item)}
          </EvoTypography>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBlockEnd: data.active ? 18 : 8,
        }}
      >
        <IconButton
          onClick={() => handleDownloadBtn(data.btnName)}
          sx={{
            backgroundColor: "white !important",
            borderRadius: "5px",
            paddingInline: 3,
          }}
        >
          <EvoTypography fontSize="20px" fontWeight={600} color="#78268d">
            {t(data.btnName)}
          </EvoTypography>
        </IconButton>
      </Box>
    </Box>
  );
}
