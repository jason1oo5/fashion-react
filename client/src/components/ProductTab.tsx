import * as React from "react";
import { Box, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IconButton, styled } from "@mui/material";
import { EvoTypography, FormInput } from "./styled-components";
import { useThemeStyle } from "../hooks/useThemeStyle";
import { useTranslation } from "react-i18next";
import Question, { Review } from "./QAModel/Question";
import { Questions, Reviews } from "../config/mock";
import { Editor } from "../config/ReactQuill";
import ReactQuill from "react-quill";
import { addQuestion, addReview } from "../service/productService";
import { toast } from "react-toastify";
import { QuestionType, ReviewType } from "../config/interface";

interface TabProps {
  description: any;
  reviews: any;
  questions: any;
  productId: number;
}

export default function ProductTab({
  description,
  reviews,
  questions,
  productId,
}: TabProps) {
  const [value, setValue] = React.useState("1");
  const [review, setReview] = React.useState<string>("");
  const [question, setQuestion] = React.useState<QuestionType>({
    title: "",
    content: "",
  });
  const theme = useThemeStyle();
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onReviewChange = (e: any) => {
    setReview(e);
  };

  const onContentChange = (e: any) => {
    const d_question = { ...question };
    d_question.content = e;
    setQuestion(d_question);
  };
  const onTitleChange = (e: any) => {
    const d_question = { ...question };
    d_question.title = e.target.value;
    setQuestion(d_question);
  };

  const addUserReview = async () => {
    try {
      const result = await addReview({
        feedback: review,
        product_id: productId,
      });
      if (result) {
        toast.success("Review added successfully");
      } else {
        toast.error("Error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addUserQuestion = async () => {
    try {
      const result = await addQuestion({
        title: question.title,
        content: question.content,
        product_id: productId,
      });
      if (result) {
        toast.success("Question published");
      } else {
        toast.error("Error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ width: "100%", EvoTypography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "#262626" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tab example"
            sx={{
              "& div": {
                flexDirection: { sm: "row", xs: "column" },
                alignItems: { sm: "left", xs: "center" },
              },
              "& button": {
                color: theme.palette.fontColor?.light + " !important",
                fontSize: "20px",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: { sm: "#ffa500", xs: "transparent" },
              },
            }}
          >
            <Tab
              label={t("description")}
              value="1"
              sx={{
                mr: { sm: 2, xs: 0 },
                borderBottom: {
                  sm: "none",
                  xs: value == "1" ? "2px solid #ffa500" : "none",
                },
              }}
            />
            <Tab
              label={t("reviews")}
              value="2"
              sx={{
                mr: { sm: 2, xs: 0 },
                borderBottom: {
                  sm: "none",
                  xs: value == "2" ? "2px solid #ffa500" : "none",
                },
              }}
            />
            <Tab
              label={t("questions")}
              value="3"
              sx={{
                borderBottom: {
                  sm: "none",
                  xs: value == "3" ? "2px solid #ffa500" : "none",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 3 }}>
          <EvoTypography color={theme.palette.fontColor?.light}>
            All objects have manually adjusted LODs and collision meshes. Most
            of meshes come with 4k texture sets. Include decal and grass
            materials.
          </EvoTypography>
          <EvoTypography
            fontSize="22px"
            color={theme.palette.fontColor?.light}
            fontWeight={200}
            sx={{ mt: 3 }}
          >
            Technical Details
          </EvoTypography>
          <Box
            dangerouslySetInnerHTML={{ __html: `${description}` }}
            id="product-description"
            sx={{
              fontSize: "15px",
              color: theme.palette.fontColor?.light,
              lineHeight: 1.8,
            }}
          />
        </TabPanel>
        <TabPanel value="2">
          {reviews.length == 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <EvoTypography
                color={theme.palette.fontColor?.light}
                fontSize="15px"
              >
                No customer reviews have been written for this product yet
              </EvoTypography>
            </Box>
          ) : (
            <>
              {reviews.map((review: ReviewType, index: number) => (
                <Review key={index} review={review} />
              ))}
            </>
          )}
          <Box
            mt={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ReactQuill
              formats={Editor.formats}
              modules={Editor.modules}
              theme="snow"
              onChange={(e) => onReviewChange(e)}
            />
            <IconButton
              onClick={addUserReview}
              sx={{
                backgroundColor: "orange !important",
                marginInline: "auto",
                fontSize: "18px",
                padding: "10px",
                paddingInline: "20px",
                color: "black",
                borderRadius: "3px",
                mt: 1,
              }}
            >
              Add Review
            </IconButton>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          {/* question length == 0 is no question */}
          {questions.length == 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <EvoTypography
                color={theme.palette.fontColor?.light}
                fontSize="15px"
              >
                No questions have been asked about this product yet
              </EvoTypography>
            </Box>
          ) : (
            <Grid>
              {questions.map((question: QuestionType, index: number) => (
                <Question question={question} key={index} />
              ))}
            </Grid>
          )}
          <Box
            mt={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid>
              <FormInput
                onChange={onTitleChange}
                placeholder="Title"
                sx={{
                  mb: 2,
                }}
              />
              <ReactQuill
                formats={Editor.formats}
                modules={Editor.modules}
                theme="snow"
                onChange={(e) => onContentChange(e)}
              />
            </Grid>
            <IconButton
              onClick={addUserQuestion}
              sx={{
                backgroundColor: "orange !important",
                marginInline: "auto",
                fontSize: "18px",
                padding: "10px",
                paddingInline: "20px",
                color: "black",
                borderRadius: "3px",
                mt: 1,
              }}
            >
              Ask a Question
            </IconButton>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
