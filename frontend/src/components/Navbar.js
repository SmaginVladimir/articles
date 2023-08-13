import React, {useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {alpha, Container, InputBase, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Navbar = () => {
    const [serch, setSerch] = useState('');
    const navigate = useNavigate();


    const handleLogOut = (e) => {
        localStorage.removeItem('access_token');
        return navigate('/login');
    };

    const check = () => {
        setSerch('')
    }

    const checkIn = (e) => {
        setSerch(e.target.value);
    }

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
                                <Button onClick={() => navigate('/admin/categories')} color="inherit">Categories</Button>
                            </>
                            }
                        </Typography>
                        {localStorage.getItem('access_token') ? (
                            <>
                                <Search>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{'aria-label': 'search'}}
                                        onChange={checkIn}

                                    />

                                    <Button onClick={check} color="inherit">
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                    </Button>

                                </Search>
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
