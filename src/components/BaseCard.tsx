import * as React from "react";

import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Badge,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BaseCard({ item, cRef }) {
  return (
    <Card sx={{ width: 250 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "magenta" }} aria-label="recipe">
            {item.account_url.slice(0, 2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.title}
      />
      <CardMedia
        component="img"
        height="194"
        ref={cRef}
        srcSet={item?.images[0]?.link}
        alt={`${item?.title} image`}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Badge badgeContent={item?.favorite_count} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
