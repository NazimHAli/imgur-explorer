import * as React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function GalleryTags() {
  const [galleryTags, setGalleryTags]: any = React.useState({});

  React.useEffect(() => {
    const gd = () => {
      import("../services/imgurAPI").then((mod) => {
        const imgurClient = mod.ImgurAPI.getInstance();

        imgurClient.getGalleryTags().then((res) => {
          setGalleryTags(res.galleries);
        });
      });
    };

    gd();
  }, []);

  return (
    <>
      {Array.from(galleryTags).map((gallery: any) => (
        <Card key={gallery?.id} sx={{ backgroundColor: "#3f51b5" }}>
          <CardActionArea sx={{ height: "100%" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {gallery?.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {gallery?.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}
