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
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

export default function Header({ query, handleOnSubmit }) {
  const [curQuery, setCurQuery] = useState(query);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: {
    currentTarget: React.SetStateAction<HTMLElement>;
  }) => {
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
    const validEvent = ["click"].includes(event.type) || event.keyCode === 13;
    return validEvent && curQuery.replace(/\s+/g, "").length > 0;
  };

  const onSubmit = (event) => {
    if (isValidQuery(event)) {
      handleOnSubmit({ query: curQuery });
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
        display: "grid",
        gridColumn: { xs: "2/13", sm: "4/11" },
        gridTemplateColumns: "1fr auto",
      }}
    >
      <TextField
        fullWidth
        sx={{ textAlign: "center" }}
        placeholder="Search for goodies..."
        inputProps={{ "aria-label": "search" }}
        value={curQuery}
        onKeyDown={onSubmit}
        onChange={(e) => setCurQuery(e.target.value)}
        type="search"
        variant="standard"
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );

  const toolbarProfile = (
    <Box sx={{ display: { xs: "none", md: "flex", gridColumnEnd: 13 } }}>
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
        <Toolbar className="header-toolbar" sx={{ display: "grid" }}>
          {toolbarSearch}
          {toolbarProfile}
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </Box>
  );
}
