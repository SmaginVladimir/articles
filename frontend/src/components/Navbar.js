import React, {useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {alpha, Container, InputBase, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';




const Navbar = () => {

    const navigate = useNavigate();


    const handleLogOut = (e) => {
        localStorage.removeItem('access_token');
        return navigate('/login');
    };


    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Button onClick={() => navigate('/')} color="inherit">News</Button>
                            {(localStorage.getItem('access_token') && localStorage.getItem('role') === 'ADMIN') &&
                            <>
                                <Button onClick={() => navigate('/admin/users')} color="inherit">Users</Button>
                                <Button onClick={() => navigate('/admin/categories')}
                                        color="inherit">Categories</Button>
                                <Button onClick={() => navigate('/admin/article/added')}
                                        color="inherit">New Article</Button>
                            </>
                            }
                        </Typography>
                        {localStorage.getItem('access_token') ? (
                            <>

                                <Button onClick={e => handleLogOut(e)} color="inherit">Выйти</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} color="inherit">Войти</Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;
