import * as React from "react";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

import {
  HeaderSearchStyling,
  SearchIconWrapper,
  StyledInputBase,
} from "./HeaderSearchStyling";

export default function Header({ query, handleOnSubmit }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const isValidQuery = (event) => {
    return (
      event.keyCode === 13 && event.target.value.replace(/\s+/g, "").length
    );
  };

  const onSubmit = (event) => {
    if (isValidQuery(event)) {
      handleOnSubmit({ query: event.target.value });
      event.preventDefault();
    }
  };

  const menuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const toolbarSearch = (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <HeaderSearchStyling>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for goodies..."
          inputProps={{ "aria-label": "search" }}
          defaultValue={query}
          onKeyDown={onSubmit}
        />
      </HeaderSearchStyling>
    </Box>
  );

  const toolbarProfile = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" aria-label="show 1 new mails" color="inherit">
        <Badge badgeContent={1} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 9 new notifications"
        color="inherit"
      >
        <Badge badgeContent={9} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ height: "5rem" }}>
        <Toolbar>
          {toolbarSearch}
          {toolbarProfile}
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </Box>
  );
}
