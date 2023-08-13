import React, {useCallback, useEffect, useState} from 'react';
import {alpha, Container, Grid, InputBase, Pagination, Stack, styled} from "@mui/material";
import ArticleCard from "../components/ArticleCard";
import {Ring} from "@uiball/loaders";
import {API_BASE_URL, INSTANCE} from "../config";
import SidebarMenu from "../components/SidebarMenu";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    border: '1px solid blue',
    maxWidth: 300,
    marginBottom: 40,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Article = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        void addArticles(currentPage);
    }, [currentPage]);

    const addArticles = useCallback(async (page) => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + '/articles/9', {
                params: {
                    page: page
                }
            });
            const meta = response.data.meta;
            const totalPages = meta.last_page;
            setArticles(response.data.data);
            setCurrentPage(meta.current_page);
            setTotalPages(totalPages);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
        }
    });

    const articlesFilter = (articleId) => {
        const updatedArticles = articles.filter(article => article.id !== articleId);
        setArticles(updatedArticles);
    }

    const check = async () => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + `/article-slug/${search}`);
            setArticles([response.data.data]);
            setSearch('');
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
        }
    }

    const checkIn = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div className={'main'}>
            <SidebarMenu/>
            <Container>
                <Search className={'search'}>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        onChange={checkIn}
                        value={search}
                    />

                    <Button onClick={check} color="inherit">
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                    </Button>

                </Search>
                <div className={'article search'}>
                    {isLoading ?
                        <Ring
                            size={70}
                            lineWeight={2}
                            speed={2}
                            color="black"
                        /> :
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 3, md: 8, lg: 12}}>
                            {articles.map((article, i) => (
                                <Grid item xs={2} sm={4} md={4} key={i}>
                                    <ArticleCard key={i} article={article} articleFilter={articlesFilter}/>
                                </Grid>
                            ))}
                        </Grid>
                    }
                </div>
                {totalPages > 1 && (
                    <Pagination className={'page'}
                                variant="outlined" shape="rounded"
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, value) => setCurrentPage(value)}
                    />
                )}
            </Container>
        </div>
    );
};

export default Article;