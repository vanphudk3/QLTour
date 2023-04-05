import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";



export default function Notification({ children }) {
    const { openEdit, setOpenEdit } = useState(false);
    const [state, setState] = useState({
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenEdit(false);
    };

    return (
        <Snackbar
            open={openEdit}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical,
                horizontal,
            }}
            key={vertical + horizontal}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                style={{
                    width: "100%",
                    Zindex: "999",
                }}
            >
                {children}
            </Alert>
        </Snackbar>
    );
}
