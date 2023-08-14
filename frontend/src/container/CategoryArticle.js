import React, {useCallback, useEffect, useState} from 'react';
import {API_BASE_URL, INSTANCE} from "../config";
import {useParams} from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import {Container, Grid, Pagination} from "@mui/material";
import {Ring} from "@uiball/loaders";
import ArticleCard from "../components/ArticleCard";

const CategoryArticle = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const categoryId = useParams().id;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        void addArticles(currentPage);
    }, [currentPage]);

    const addArticles = useCallback(async (page) => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + `/articles/category/${categoryId}/9`, {
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

    return (
        <div className={'main'}>
            <SidebarMenu/>
            <Container>
                <div className={'article'}>
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
                                    <ArticleCard key={i} article={article}/>
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

export default CategoryArticle;