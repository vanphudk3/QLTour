import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const {count, page, onChange} = props;

    return (
        <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={onChange} color="primary" />
        </Stack>
    );
}