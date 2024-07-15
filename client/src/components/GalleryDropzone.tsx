import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { EvoTypography } from "./styled-components";
import { IconButton } from "@mui/material";

const GalleryDropzone = (props: any) => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (props.productImgData) {
      setFiles(props.productImgData);
    }
  }, [props]);

  const handleImgDropped = (acceptedFiles: any) => {
    const draft_files: any = files;
    const d_files: any = [];
    acceptedFiles.map((file: any) => {
      const preview = URL.createObjectURL(file);
      const r_file = new File([file], file.path, { type: file.type });
      d_files.push(r_file);
      draft_files.push({ preview: preview });
    });
    // setFiles([...files, draft_files]);
    setFiles(draft_files);

    props.handleImgData(d_files);
  };

  const removeImage = (index: any) => {
    const d_files = [...files];
    d_files.splice(index, 1);
    setFiles(d_files);
  };

  return (
    <>
      <Dropzone
        multiple
        onDrop={(acceptedFiles) => handleImgDropped(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            style={{
              border: "1px solid #c4c4c4",
              borderStyle: "dashed",
              minHeight: "104px",
              height: "auto",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {files.length == 0 && (
                <>
                  <EvoTypography>Click or Drop images to upload</EvoTypography>
                  <EvoTypography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      opacity: "0.7",
                    }}
                  >
                    Maximum image size: 2MB
                  </EvoTypography>
                </>
              )}
              <div style={{ display: "flex", padding: "5px" }}>
                {files.map((file: any, index: number) => (
                  <div
                    key={file.preview + index}
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={file.preview}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                        marginRight: "5px",
                      }}
                    />
                    <br />
                    <IconButton
                      onClick={() => removeImage(index)}
                      sx={{
                        borderRadius: "5px",
                        p: 0,
                      }}
                    >
                      <EvoTypography color={"#064991"}>Remove</EvoTypography>
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default GalleryDropzone;
