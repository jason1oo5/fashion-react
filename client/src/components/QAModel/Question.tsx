import React from "react";
import { Grid, Box, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EvoTypography } from "../styled-components";

const Question = (props: any) => {
  const { question } = props;
  const classes = useStyle();

  return (
    <Grid className={classes.question}>
      {question.user == "support" ? (
        <Grid className={classes.support}>
          <Box className={classes.flexCenter}>
            <Avatar
              alt="Support"
              src={"https://mui.com/static/images/avatar/3.jpg"}
            />
            <EvoTypography className={classes.userName}>
              Support :
            </EvoTypography>
            <EvoTypography className={classes.title}>
              {question.title}
            </EvoTypography>
          </Box>
          <EvoTypography
            dangerouslySetInnerHTML={{ __html: `${question.content}` }}
            className={classes.content}
          />
        </Grid>
      ) : (
        <Grid className={classes.user}>
          <Box className={classes.flexCenter}>
            <Avatar alt="YOU" />
            <EvoTypography className={classes.userName}>{question.questionUser[0].name} :</EvoTypography>
            <EvoTypography className={classes.title}>
              {question.title}
            </EvoTypography>
          </Box>
          <EvoTypography
            dangerouslySetInnerHTML={{ __html: `${question.content}` }}
            className={classes.content}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Question;

export const Review = (props: any) => {
  const classes = useStyle();
  const { review } = props;

  return (
    <Grid className={classes.question}>
      <Grid className={classes.support}>
        <Box className={classes.flexCenter}>
          <Avatar
            alt="Support"
            src={"https://mui.com/static/images/avatar/3.jpg"}
          />
          <EvoTypography className={classes.userName}>
            {review.questionUser[0].name} :
          </EvoTypography>
        </Box>
        <EvoTypography
          dangerouslySetInnerHTML={{ __html: `${review.feedback}` }}
          className={classes.content}
        />
      </Grid>
    </Grid>
  );
};

const useStyle = makeStyles({
  question: {
    // borderRadius: "5px",
    // borderColor: "#5C6C75",
    // backgroundColor: "#0d5272 !important",
    // padding: "10px",
  },
  user: {
    borderRadius: "5px",
    borderColor: "#5C6C75",
    backgroundColor: "#1c2d38 !important",
    padding: "10px",
  },
  userName: {
    fontSize: "20px",
    color: "#ffa500",
    marginInline: "10px",
  },
  title: {
    fontSize: "20px",
    color: "white",
    borderBottom: "1px solid",
  },
  content: {
    fontSize: "18px",
    color: "white",
    paddingInlineStart: "50px",
    paddingInlineEnd: "25px",
    paddingBlock: "5px",
  },
  flexCenter: {
    display: "flex",
    // justifyContent: 'center',
    alignItems: "center",
  },
  support: {
    borderRadius: "5px",
    borderColor: "#5C6C75",
    backgroundColor: "#1c2d38 !important",
    padding: "10px",
    marginBlock: "10px",
  },
});
