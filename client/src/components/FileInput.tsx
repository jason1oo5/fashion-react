import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { EvoTypography } from "./styled-components";

const FileInput = (props: any) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      props.handleImg(URL.createObjectURL(selectedImage), selectedImage.name);
    }
  }, [selectedImage]);

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none", cursor: "pointer" }}
        onChange={(e: any) => setSelectedImage(e.target.files[0])}
      />
      {props.type == "button" ? (
        <label htmlFor="select-image" style={{ cursor: "pointer" }}>
          <EvoTypography
            color="white"
            sx={{
              borderRadius: "5px",
              backgroundColor: "#5c4545",
              padding: 0.8,
              mr: 1,
            }}
          >
            Try another
          </EvoTypography>
        </label>
      ) : (
        <Box
          textAlign="center"
          sx={{
            border: "1px solid #c4c4c4",
            borderRadius: "4px",
          }}
        >
          <label htmlFor="select-image" style={{ cursor: "pointer" }}>
            {imageUrl && selectedImage ? (
              <img src={imageUrl} alt={selectedImage.name} height="100px" />
            ) : (
              <img
                src="/assets/images/page_img/profile-img.svg"
                alt="default img"
                height="100px"
              />
            )}
          </label>
        </Box>
      )}
    </>
  );
};

export default FileInput;
