import React, {useCallback, useEffect, useState} from 'react';
import {API_BASE_URL, INSTANCE} from "../config";
import {Autocomplete, Button, Card, CardContent, Container, Grid, Switch, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import '../App.css';

const ArticleForm = () => {

        const [formData, setFormData] = useState({
            name: '',
            slug: '',
            category_id: '',
            image: '',
            content: '',
            active: false,
            order: ''
        });

        const [formDirty, setFormDirty] = useState({
            name: false,
            slug: false,
            category_id: false,
            content: false,
            order: false
        });

        const [formError, setFormError] = useState(
            {
                name: 'Name не может быть пустым',
                slug: 'Slug не может быть пустым',
                category_id: 'Category не может быть пустым',
                content: 'Content не может быть пустым',
                order: 'Order не может быть пустым'
            });

        const [formValid, setFormValid] = useState(false);
        const [message, setMessage] = useState('');
        const [selectedImage, setSelectedImage] = useState(null);
        const [categories, setCategories] = useState([]);
        const navigate = useNavigate();
        const articleId = useParams().id;

        useEffect(() => {
            if (!localStorage.getItem('access_token') && localStorage.getItem('role') !== 'ADMIN') {
                navigate('/login');
            }
            if (articleId) {
                void articleFetch();
            }
            void addCategories();
        }, []);

        useEffect(() => {
            const hasErrors = Object.values(formError).some(errorMessage => errorMessage.length > 0);
            setFormValid(!hasErrors);
        }, [formError]);


        const articleFetch = useCallback(async () => {
            try {
                const response = await INSTANCE.get(API_BASE_URL + '/article/' + articleId);
                setFormData(response.data.data);
                setFormData(prev => ({...prev, category_id: response.data.data.category.id}))
                setFormDirty(prev => ({...prev, name: true, slug: true, category_id: true, content: true, order: true}))
                setFormError(prev => ({...prev, name: '', slug: '', category_id: '', content: '', order: ''}))
            } catch (e) {
                console.log('Что-то не так')
            }

        });


        const addCategories = useCallback(async () => {
            try {
                const response = await INSTANCE.get(API_BASE_URL + '/categories/all');
                setCategories(response.data.data);
            } catch (e) {
                console.log('Что-то не так')
            }
        });

        const blurHandler = (e) => {
            switch (e.target.name) {
                case "name":
                    setFormDirty(prev => ({...prev, name: true}));
                    break;
                case "slug":
                    setFormDirty(prev => ({...prev, slug: true}));
                    break;
                case "category_id":
                    setFormDirty(prev => ({...prev, category_id: true}));
                    break;
                case "image":
                    setFormDirty(prev => ({...prev, image: true}));
                    break;
                case "content":
                    setFormDirty(prev => ({...prev, content: true}));
                    break;
                case "order":
                    setFormDirty(prev => ({...prev, order: true}));
                    break;
            }
        }

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                setFormData(prev => ({
                    ...prev,
                    image: file
                }));
            } else {
                setSelectedImage(null);
                setFormData(prev => ({
                    ...prev,
                    image: ''
                }));
            }
        }

        const changeInputEl = (e) => {
            const {name, value} = e.target;
            if (name === 'order' || name === 'active') {
                setFormError(prev => ({
                    ...prev,
                    [name]: ''
                }));
            } else {
                setFormError(prev => ({
                    ...prev,
                    [name]: value.length < 3 ? 'Поле должно содеражать больше 3 символов' : ''
                }));
            }
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (articleId) {
                void putArticle();
            } else {
                void postArticle();
            }
        }

        const putArticle = async () => {
            let updatedImage = formData.image;
            let updatedFormData = {...formData};
            let headers = {
                'Content-Type': 'multipart/form-data/',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            };
            if (typeof updatedImage === 'string') {
                if (updatedImage.includes('http://127.0.0.1:8000/storage/')) {
                    updatedImage = updatedImage.replace('http://127.0.0.1:8000/storage/', "");
                }
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                };
                updatedFormData = {
                    ...formData,
                    image: updatedImage
                };
            }
            try {
                const res = await INSTANCE.put(API_BASE_URL + '/admin/article/' + articleId, updatedFormData, {
                    headers: headers,
                    processData: false,
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (e) {
                console.log('Что-то не так')
            }
        }

        const postArticle = async () => {
            try {
                const res = await INSTANCE.post(API_BASE_URL + '/admin/article', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    processData: false,
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1500)
            } catch (e) {
                console.log('Что-то не так')
            }

        }


        return (
            <Container>
                <div style={{marginTop: '75px'}}>
                    <Typography gutterBottom variant="h3" align="center">
                        Article
                    </Typography>
                    {message &&
                    <Typography gutterBottom variant="h5" align="center">
                        {message}
                    </Typography>
                    }
                    <Grid>
                        <Card style={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
                            <CardContent>
                                <form className={'form-style'} encType="multipart/form-data">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{marginTop: '10px'}}
                                                name={'image'}
                                            />
                                            {selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Selected"
                                                    style={{maxWidth: '100%', marginTop: '10px'}}
                                                />
                                            ) : formData.image && <img
                                                src={formData.image}
                                                alt="Selected"
                                                style={{maxWidth: '100%', marginTop: '10px'}}
                                            />}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="text" placeholder="Enter name"
                                                       label="Name"
                                                       variant="outlined" fullWidth required name={"name"}
                                                       error={!!(formDirty.name && formError.name)}
                                                       helperText={formDirty.name && formError.name ? formError.name : ''}
                                                       value={formData.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="text" placeholder="Enter slug"
                                                       label="Slug"
                                                       variant="outlined" fullWidth required name={"slug"}
                                                       error={!!(formDirty.slug && formError.slug)}
                                                       helperText={formDirty.slug && formError.slug ? formError.slug : ''}
                                                       value={formData.slug}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={categories}
                                                sx={{width: 300}}
                                                getOptionLabel={(category) => category.name}
                                                value={categories.find(category => category.id === formData.category_id) || null}
                                                onBlur={blurHandler}
                                                onChange={(_, newValue) => {
                                                    setFormError(prev => ({
                                                        ...prev,
                                                        category_id: newValue ? '' : 'Выберите категорию',
                                                    }));
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        category_id: newValue ? newValue.id : '',
                                                    }));
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        type="text"
                                                        placeholder="Enter Category"
                                                        label="Category"
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        name="category_id"
                                                        error={!!(formDirty.category_id && formError.category_id)}
                                                        helperText={formDirty.category_id && formError.category_id ? formError.category_id : ''}
                                                        value={formData.category_id}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="text" placeholder="Enter content"
                                                       label="Content"
                                                       variant="outlined" fullWidth required name={"content"}
                                                       error={!!(formDirty.content && formError.content)}
                                                       helperText={formDirty.content && formError.content ? formError.content : ''}
                                                       value={formData.content}
                                                       multiline
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Switch
                                                onChange={(event) => {
                                                    const newValue = !event.target.checked;
                                                    changeInputEl({target: {name: 'active', value: newValue}});
                                                }}
                                                checked={!formData.active}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="number" placeholder="Enter order"
                                                       label="Order"
                                                       variant="outlined" fullWidth required name={"order"}
                                                       error={!!(formDirty.order && formError.order)}
                                                       helperText={formDirty.order && formError.order ? formError.order : ''}
                                                       value={formData.order}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button onClick={handleSubmit} disabled={!formValid} type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </div>
            </Container>
        );
    }
;

export default ArticleForm;
