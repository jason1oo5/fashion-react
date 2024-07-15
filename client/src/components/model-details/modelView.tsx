import { Grid } from "@mui/material";
import { useEffect } from "react";

export default function ModelView({ imgRender }: any) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.js";
    script.async = true;
    // script.onload = () => this.scriptLoaded();

    document.body.appendChild(script);
  }, [imgRender]);

  return (
    <Grid sx={{ width: "100%" }}>
      {imgRender ? (
        <div
          className="fotorama"
          data-nav="thumbs"
          data-allowfullscreen="true"
          data-fit="contain"
          data-width="100%"
          data-height="800/600"
          dangerouslySetInnerHTML={{ __html: `${imgRender}` }}
        ></div>
      ) : (
        <div
          className="fotorama"
          // data-allowfullscreen="true"
          // data-fit="contain"
          data-width="100%"
        >
          <img src="/assets/images/page_img/intro.jpg" />
          <img src="/assets/images/page_img/intro.jpg" />
          <img src="/assets/images/page_img/intro.jpg" />
        </div>
      )}
    </Grid>
  );
}
