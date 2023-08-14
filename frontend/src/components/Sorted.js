import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Box from "@mui/material/Box";

const Sorted = (props) => {

    const [selectedOption, setSelectedOption] = useState('');
    const handleSortChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sorted</InputLabel>
                <Select
                    labelId="sorted"
                    id="demo-sort"
                    label="Sort"
                    onChange={handleSortChange}
                    value={selectedOption}
                >
                    <MenuItem value={'id'} onClick={() => props.sorted('id')}>ID</MenuItem>
                    <MenuItem value={'slug'} onClick={() => props.sorted('slug')}>Slug</MenuItem>
                    <MenuItem value={'category'} onClick={() => props.sorted('category')}>Category</MenuItem>
                    <MenuItem value={'content'} onClick={() => props.sorted('content')}>Content</MenuItem>
                    <MenuItem value={'order'} onClick={() => props.sorted('order')}>Order</MenuItem>
                    <MenuItem value={'create'} onClick={() => props.sorted('create')}>Create</MenuItem>
                    <MenuItem value={'update'} onClick={() => props.sorted('update')}>Update</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default Sorted;