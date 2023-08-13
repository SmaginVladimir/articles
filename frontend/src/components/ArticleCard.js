import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Card} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ArticleCard(props) {
    const navigate = useNavigate();


    function deleteArticle() {

    }


    return (
        <Card sx={{maxWidth: 345}} className={'article-card'}>
            <CardMedia
                sx={{height: 140}}
                image={
                    props.article.image}
                alt={props.article.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.article.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={() => navigate('/admin/article/edit/' + props.article.id)}>Изменить</Button>
                <Button size="small">Удалить</Button>
            </CardActions>
        </Card>
    );
}
