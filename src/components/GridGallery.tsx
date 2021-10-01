import React from "react";

const BaseGrid = React.lazy(() => import("./BaseGrid"));

class GridGallery extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    sortOrder: "asc",
  };
  items: any;

  constructor(props) {
    super(props);
    this.items = [];

    this._handleNewRequest("meow");
  }

  _submitSearchRequest = async ({
    searchQuery = "meow",
    pageNumber = 1,
    newSearch = false,
  }) => {
    await import("../services/imgurAPI").then(async (mod) => {
      const imgurClient = mod.ImgurAPI.getInstance();

      await imgurClient
        .submitGallerySearch(searchQuery, pageNumber, true)
        .then((response) => {
          this.items = newSearch ? response : this.items.concat(response);
        });
    });
  };

  _loadNextPage = (...args: number[]) => {
    const numItemsPerLoad = 12;

    this.setState({ isNextPageLoading: true }, () => {
      setTimeout(() => {
        this.setState((state: any) => ({
          hasNextPage: state.items.length < 100,
          isNextPageLoading: false,
          items: [...state.items].concat(
            this.items.slice(args[0], args[0] + numItemsPerLoad)
          ),
        }));
      }, 100);
    });
  };

  _handleNewRequest = async (searchQuery) => {
    const numItemsPerLoad = 12;
    await this._submitSearchRequest({
      searchQuery: searchQuery,
      newSearch: true,
    });

    this.setState((state: any) => ({
      hasNextPage: state.items.length < 100,
      isNextPageLoading: false,
      items: this.items.slice(0, numItemsPerLoad),
    }));
  };

  _handleSortOrderChange = (e) => {
    this.items.sort((a, b) => {
      if (e.target.value === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    this.setState({
      sortOrder: e.target.value,
      items: [],
    });
  };

  render() {
    const { hasNextPage, isNextPageLoading, items } = this.state;
    return (
      <React.Fragment>
        <BaseGrid
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={items}
          loadNextPage={this._loadNextPage}
        />
      </React.Fragment>
    );
  }
}

export default GridGallery;
