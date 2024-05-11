import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalPlayout(props) {
    const { width, height, open, handleClose, children } = props;

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        bgcolor: "background.paper",
        border: "2px solid #ccc",
        boxShadow: 24,
        p: 4,
        background: "white",
        // overflow: "scroll",
        borderRadius: "10px",
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll" }}
            >
                <Box sx={style}>
                    <div style={{ background: "#0dcaf024" }}>
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
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                position: "absolute",
                                left: "30%",
                                top: "2%",
                                transform: "translateX(-50%)",
                                textAlign: "left",
                            }}
                        >
                            {/* <FontAwesomeIcon icon="fa-solid fa-gears" /> */}
                            <i
                                class="fa-solid fa-gears"
                                style={{ marginRight: "10px" }}
                            ></i>
                            {props.title}
                        </Typography>
                    </div>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        style={{ height: "100%" }}
                    >
                        {children}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
