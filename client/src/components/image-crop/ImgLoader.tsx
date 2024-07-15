import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { EvoTypography } from "../styled-components";
import FileInput from "../FileInput";
import { canvasPreview } from "./canvasPreview";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface ImgLoaderTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: ImgLoaderTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function EvoImgLoader(props: any) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [loadedImg, setLoadedImg] = React.useState("");
  const [imgName, setImgName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 400,
    height: 300,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>({
    x: 125,
    y: 79.3984375,
    width: 250,
    height: 166.796875,
    unit: "px",
  });

  React.useEffect(() => {
    setOpen(props.openState);
  }, [props.openState]);

  const handleClose = () => {
    setOpen(false);
    props.handleHeadAction();
  };

  const handleCropChange = (c: any) => {
    Object.assign(c, {
      width: crop.width,
      height: crop.height,
    });
    setCrop(c);
  };

  const handleImg = (imgSrc: any, imgName: any) => {
    setLoadedImg(imgSrc);
    setImgName(imgName);
  };

  function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve: any) => {
      canvas.toBlob(resolve);
    });
  }

  const uploadImg = async () => {
    const canvas = document.createElement("canvas");
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      canvas
    ) {
      canvasPreview(imgRef.current, canvas, completedCrop, 1, 0);

      const blog = await toBlob(canvas);
      // if (previewUrl) {
      //   URL.revokeObjectURL(previewUrl)
      // }
      const previewUrl = URL.createObjectURL(blog);
      props.handleImgUpload(blog, previewUrl, imgName);
      handleClose();
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <EvoTypography>Load Image</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "none",
            overflow: "auto",
            width: "500px",
            height: "300px",
          }}
        >
          {loadedImg ? (
            <ReactCrop
              crop={crop}
              onChange={(c) => handleCropChange(c)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img ref={imgRef} src={loadedImg} alt="loaded img" />
            </ReactCrop>
          ) : (
            <FileInput handleImg={handleImg} />
          )}
        </DialogContent>
        <DialogActions>
          <FileInput type="button" handleImg={handleImg} />
          <Button
            autoFocus
            onClick={uploadImg}
            sx={{ backgroundColor: "#1BC5BD !important" }}
          >
            <EvoTypography textTransform="capitalize" color="white">
              Apply
            </EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
