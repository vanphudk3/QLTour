import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from '@mui/icons-material/Home';
import TourIcon from '@mui/icons-material/Tour';
import NearMeIcon from '@mui/icons-material/NearMe';
import BookIcon from '@mui/icons-material/Book';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FocusLink from "../FocusLink";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function HeaderMobile() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>
                    <FocusLink
                        href={route("welcome")}
                        active={route().current("welcome")}
                        className="flex justify-content"
                    >
                        Home
                    </FocusLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TourIcon />
                    </ListItemIcon>
                    <ListItemText>
                    <FocusLink
                        href={route("tour")}
                        active={route().current("tour")}
                    >
                        Tour
                    </FocusLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <NearMeIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <FocusLink
                            href={route("destination")}
                            active={route().current("destination")}
                        >
                            Destination
                        </FocusLink>
                    </ListItemText>
                </ListItemButton>
            </List>
            <Divider />
            <List>
            <ListItemButton>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText>
                    <FocusLink
                        href={route("welcome")}
                        active={route().current("welcome")}
                        className="flex justify-content"
                    >
                        Blog
                    </FocusLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText>
                    <FocusLink
                        href={route("tour")}
                        active={route().current("tour")}
                    >
                        About
                    </FocusLink>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ContactPageIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <FocusLink
                            href={route("destination")}
                            active={route().current("destination")}
                        >
                            Contact
                        </FocusLink>
                    </ListItemText>
                </ListItemButton>
            </List>
        </Box>
    );
    return (
        <div>
            {["left"].map((anchor) => (
                <>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <i className="fa-solid fa-bars" />
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </>
            ))}
        </div>
    );
}
