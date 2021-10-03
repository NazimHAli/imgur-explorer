import React from "react";
import { Alert, Box, Container, Typography } from "@mui/material";

const GalleryTags = React.lazy(() => import("./GalleryTags"));
const GridSearchSort = React.lazy(() => import("./GridSearchSort"));
const Header = React.lazy(() => import("./Header"));
const LoadingResults = React.lazy(() => import("./LoadingResults"));

export function BaseContent(
  showLoading: boolean,
  state: {
    hasNextPage: boolean;
    isInterSecting: boolean;
    isNextPageLoading: boolean;
    nextIdx: number;
    numItemsPerRequest: number;
    stopLazyLoading: boolean;
    requestArgs: {
      filter: boolean;
      newSearch: boolean;
      page: number;
      query: string;
      sort: string;
    };
  },
  submitSearchRequest: (args: any) => void,
  data: any,
  RenderCard: ({ item, index }: { item: any; index: any }) => any,
  ioElementRef: React.MutableRefObject<undefined>
) {
  return (
    <>
      <LoadingResults open={showLoading} />
      <Header
        query={state.requestArgs.query}
        handleOnSubmit={submitSearchRequest}
      />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            my: 2,
          }}
        >
          <GridSearchSort handleSortChange={submitSearchRequest} />
        </Box>

        <Typography variant="h4" sx={{ mb: "1rem" }}>
          Explore Galleries
        </Typography>
        <Box className="gallery-tags">
          <GalleryTags />
        </Box>

        <Box className="container-img">
          {Array.from(
            data ? data.slice(0, state.nextIdx + state.numItemsPerRequest) : []
          ).map((image: any, imgIdx) => (
            <RenderCard key={imgIdx} item={image} index={imgIdx} />
          ))}
        </Box>

        {data && !data?.length && (
          <Alert
            variant="filled"
            severity="info"
            sx={{ mx: "auto", maxWidth: 500 }}
          >
            No search results found :(
          </Alert>
        )}

        {data && data?.length && !state.stopLazyLoading && (
          <Box
            ref={ioElementRef}
            style={{ width: "100%", height: "0px" }}
          ></Box>
        )}
      </Container>
    </>
  );
}
