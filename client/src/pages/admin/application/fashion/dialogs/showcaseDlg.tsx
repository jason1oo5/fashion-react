import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  EvoTypography,
  FormInput,
} from "../../../../../components/styled-components";
import EvoImgLoader from "../../../../../components/image-crop/ImgLoader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

export default function AddShowcaseDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [editState, setEditState] = React.useState(false);
  const [showcase, setShowcase] = React.useState<any>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [imgPreview, setImgPreview] = React.useState("");
  const [imgFile, setImgFile] = React.useState<any>();
  const titleRef = React.useRef<any>();
  const descRef = React.useRef<any>();
  const linkRef = React.useRef<any>();

  React.useEffect(() => {
    if (props.selectedShowcase) {
      setShowcase(props.selectedShowcase);
      setEditState(true);
    } else {
      setShowcase({
        title: "",
        description: "",
        link: "",
      });
      setEditState(false);
    }
    setOpen(props.openState);
  }, [props.openState]);

  const handleClose = () => {
    setOpen(false);
    props.handleHeadAction();
  };

  const openImgLoader = (open: any) => {
    setOpenDialog(open);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleImgUpload = (blog: any, previewUrl: any, imgName: any) => {
    const imgFile = new File([blog], imgName, { type: blog.type });
    setImgFile(imgFile);
    setImgPreview(previewUrl);
  };

  const handleShowcase = () => {
    const formData = new FormData();
    formData.append("imgFile", imgFile);
    formData.append("title", titleRef.current.value);
    formData.append("description", descRef.current.value);
    props.handleAddShowcase(formData);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{ sx: { position: "fixed", top: 50, m: 0 } }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <EvoTypography>New license</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ maxWidth: "none", overflow: "auto" }}>
          <Grid
            container
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Grid mt={2} item xs={4}>
              <EvoTypography>Title</EvoTypography>
            </Grid>
            <Grid mt={2} item xs={8}>
              <FormInput ref={titleRef} defaultValue={showcase?.title} />
            </Grid>
            <Grid mt={2} item xs={4}>
              <EvoTypography>Description</EvoTypography>
            </Grid>
            <Grid mt={2} item xs={8}>
              <FormInput ref={descRef} defaultValue={showcase?.description} />
            </Grid>
            <Grid mt={2} item xs={4}>
              <EvoTypography>Image</EvoTypography>
            </Grid>
            <Grid
              mt={2}
              item
              xs={8}
              sx={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="img-preview"
                  style={{ width: "100px", height: "80px" }}
                />
              )}
              <IconButton
                onClick={openImgLoader}
                sx={{
                  color: "cadetblue",
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ backgroundColor: "#F3F6F9" }}
          >
            <EvoTypography textTransform="capitalize" color="#3699FF">
              Close
            </EvoTypography>
          </Button>
          <Button
            autoFocus
            onClick={handleShowcase}
            sx={{ backgroundColor: "#1BC5BD !important" }}
          >
            <EvoTypography textTransform="capitalize" color="white">
              {editState ? "Update" : "Save"}
            </EvoTypography>
          </Button>
        </DialogActions>
        <EvoImgLoader
          handleImgUpload={handleImgUpload}
          openState={openDialog}
          handleHeadAction={closeDialog}
        />
      </BootstrapDialog>
    </>
  );
}
