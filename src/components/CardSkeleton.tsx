import * as React from "react";

import {
  Card,
  CardHeader,
  Skeleton,
  Avatar,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BaseImage from "./Image";

interface MediaProps {
  cRef: any;
  item: any;
  loading: boolean;
}

function Media(props: MediaProps) {
  const { cRef, item, loading } = props;
  const [isLoading, setIsLoading] = React.useState(loading);

  React.useEffect(() => {
    const showImg = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(showImg);
  }, [props.item]);

  const imgBase = !isLoading && item?.images && (
    <BaseImage cRef={cRef} src={item?.images[0].link} id={item?.id} />
  );

  return (
    <Card>
      <CardHeader
        avatar={
          isLoading ? (
            <Skeleton
              animation="pulse"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          isLoading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          isLoading ? (
            <Skeleton
              animation="pulse"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            item?.account_url?.slice(0, 10)
          )
        }
        subheader={
          isLoading ? (
            <Skeleton animation="pulse" height={10} width="40%" />
          ) : (
            new Date(item?.datetime * 1000).toDateString()
          )
        }
      />
      {(isLoading || !item?.images) && (
        <Skeleton
          sx={{ height: 190 }}
          animation="pulse"
          variant="rectangular"
        />
      )}
      {imgBase}
      <CardContent>
        {isLoading ? (
          <React.Fragment>
            <Skeleton
              animation="pulse"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="pulse" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            noWrap={true}
          >
            {"Why First Minister of Scotland Nicola Sturgeon"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function CardSkeleton({ cRef, item }) {
  return <Media cRef={cRef} item={item} loading={true} />;
}

export default CardSkeleton;
