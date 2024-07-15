import { Box, Grid, IconButton } from "@mui/material";
import Page from "../../../components/Page";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DownloadCard from "../../../components/download-card";
import { DownloadCardData, TechSupport } from "../../../config/mock";
import AppleIcon from "@mui/icons-material/Apple";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import { EvoTypography } from "../../../components/styled-components";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import { useTranslation } from "react-i18next";

export default function Download() {
  const theme = useThemeStyle();
  const { t } = useTranslation();

  return (
    <Page title="Downloads">
      <Grid
        mt={8}
        sx={{
          height: "auto",
          backgroundColor: theme.palette.backgroundColor?.dark,
          p: { sm: 5, xs: 1 },
        }}
      >
        <Grid
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "5px",
            paddingInline: { sm: 5, xs: 1 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <EvoTypography
              sx={{
                fontSize: { bmd: "50px", sm: "30px", xs: "20px" },
                color: theme.palette.fontColor?.light,
              }}
            >
              {t("download_title")}
            </EvoTypography>
          </Box>
          <EvoTypography
            sx={{
              fontSize: { sm: "20px", xs: "15px" },
              color: theme.palette.fontColor?.light,
              paddingInline: 5,
              textAlign: "center",
            }}
          >
            {t("download_content")}
          </EvoTypography>
          <EvoTypography
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <KeyboardDoubleArrowDownIcon sx={{ fontSize: "40px" }} />
          </EvoTypography>
          <Grid
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
            alignItems="center"
            justifyContent="center"
            p={5}
          >
            {DownloadCardData.map((dataItem: any) => (
              <Grid key={dataItem.title} item md={4} xs={6}>
                <DownloadCard data={dataItem} />
              </Grid>
            ))}
          </Grid>
          <Grid display="flex" justifyContent="center" pb={2}>
            <IconButton sx={{ mr: 5, borderRadius: "5px" }}>
              <EvoTypography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.fontColor?.light,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DesktopWindowsIcon sx={{ mr: 1 }} />
                Windows 64
              </EvoTypography>
            </IconButton>
            <IconButton sx={{ borderRadius: "5px" }}>
              <EvoTypography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.fontColor?.light,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AppleIcon sx={{ mr: 1 }} />
                Mac Coming...
              </EvoTypography>
            </IconButton>
          </Grid>
          <EvoTypography
            sx={{
              fontSize: "13px",
              color: theme.palette.fontColor?.light,
              textAlign: "center",
              pb: 2,
            }}
          >
            { t('system_desc') }
          </EvoTypography>
          <Box display="flex" justifyContent="center" pb={5}>
            <Box>
              {TechSupport.map((techItem) => (
                <EvoTypography
                  key={techItem}
                  sx={{ fontSize: "13px", color: "orange" }}
                >
                  {techItem}
                </EvoTypography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
