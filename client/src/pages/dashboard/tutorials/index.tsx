import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Page from "../../../components/Page";
import TutorialCard from "../../../components/tutorial-card";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { EvoTypography } from "../../../components/styled-components";
import { getTutorials } from "../../../service/admin/tutorialService";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import { useTranslation } from "react-i18next";

export default function Tutorials() {
  const theme = useThemeStyle();
  const { t } = useTranslation();
  const [tutorials, setTutorials] = useState<any>();

  useEffect(() => {
    const fetch_tutorials = async () => {
      const d_tutorials = await getTutorials();
      setTutorials(d_tutorials);
    };

    fetch_tutorials().catch((err) => {
      console.log(err);
    });
  });

  return (
    <Page title="Tutorials">
      <Grid
        mt={8}
        sx={{
          height: "auto",
          backgroundColor: theme.palette.backgroundColor?.dark,
          p: { bxs: 5, xs: 1 },
        }}
      >
        <Grid
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "5px",
            marginInline: "auto",
            paddingInline: { bsm: 10, xs: 1 },
            maxWidth: "1800px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
            <EvoTypography
              sx={{
                fontSize: { bmd: "50px", sm: "30px", xs: "20px" },
                color: theme.palette.fontColor?.light,
              }}
            >
              {t("tutorial_title")}
            </EvoTypography>
          </Box>
          <EvoTypography
            sx={{
              fontSize: { sm: "20px", xs: "15px" },
              color: theme.palette.fontColor?.light,
              paddingInline: { bsm: 5, xs: 1 },
              textAlign: "center",
            }}
          >
            {t("tutorial_content")}
          </EvoTypography>
          <Grid
            pb={15}
            sx={{
              marginBlock: 5,
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(auto-fill, minmax(400px, 1fr))",
                xs: "repeat(auto-fill, minmax(300px, 1fr))",
              },
              gridGap: "30px",
            }}
          >
            {tutorials?.map((tutorial: any) => (
              <Grid
                key={tutorial.id}
                sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}
              >
                <TutorialCard tutorial={tutorial} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
