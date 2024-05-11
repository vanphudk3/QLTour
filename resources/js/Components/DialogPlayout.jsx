import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertDialog(props) {
    const { width, height, open, handleClose, children, title, actions, fullScreen, Transition } =
        props;

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                TransitionComponent={Transition}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        width: width,
                        height: height,
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ background: "#0dcaf024" }}
                >
                    <i
                        class="fa-solid fa-gears"
                        style={{ marginRight: "10px" }}
                    ></i>
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        background: "#0dcaf024",
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Dialog>
        </div>
    );
}
