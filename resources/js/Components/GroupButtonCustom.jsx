import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export default function GroupdBttonCustom(props) {
    const { title, items, onClick, variant, color, size, options, open, setOpen, anchorRef } = props;

    const handleMenuItemClick = (event, index) => {
        onClick(index);
        setOpen(false);
    };


    return (
        <ButtonGroup variant={variant} color={color} ref={anchorRef} aria-label="split button">
            <Button onClick={() => onClick(0)} size={size}>{title}</Button>
            <Button
                size={size}
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
                <ArrowDropDownIcon />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <MenuList id="split-button-menu">
                                    {items.map((item, index) => (
                                        <MenuItem
                                            key={item}
                                            selected={index === options}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </ButtonGroup>
    );
}