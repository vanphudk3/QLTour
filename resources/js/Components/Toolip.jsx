import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip(props) {
    const { title, children,placement,arrow } = props;
  return (
    <Tooltip title={title} placement={placement} arrow={arrow}>
        {/* <IconButton aria-label={title}>{children}</IconButton> */}
        {children}
    </Tooltip>
  );
}