import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {API_BASE_URL, INSTANCE} from "../config";
import {Button, Card, CardContent, Container, Grid, Switch, TextField, Typography} from "@mui/material";

const CategoryForm = () => {

        const [formData, setFormData] = useState({
            name: '', active: false, order: ''
        });

        const [formDirty, setFormDirty] = useState({
            name: false, order: false
        });

        const [formError, setFormError] = useState(
            {
                name: 'Имя не может быть пустым',
                order: 'Order не может быть пустым'
            });

        const [formValid, setFormValid] = useState(false);
        const [message, setMessage] = useState('');
        const navigate = useNavigate();
        const categoryId = useParams().id;


        useEffect(() => {
            if (!localStorage.getItem('access_token') && localStorage.getItem('role') !== 'ADMIN') {
                navigate('/login');
            }
            if (categoryId) {
                void categoryFetch();
            }
        }, []);

        useEffect(() => {
            const hasErrors = Object.values(formError).some(errorMessage => errorMessage.length > 0);
            setFormValid(!hasErrors);
        }, [formError]);

        const categoryFetch = useCallback(async () => {
            try {
                const response = await INSTANCE.get(API_BASE_URL + '/category/' + categoryId, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = response.data.data;
                setFormData(prev => ({
                    ...prev,
                    name: data.name,
                    active: data.active,
                    order: data.order
                }))
                setFormDirty(prev => ({...prev, name: true, order: true}))
                setFormError(prev => ({...prev, name: '', order: ''}))
            } catch (e) {
                console.log('Что-то не так')
            }

        });

        const blurHandler = (e) => {
            switch (e.target.name) {
                case "name":
                    setFormDirty(prev => ({...prev, name: true}));
                    break;
                case "order":
                    setFormDirty(prev => ({...prev, order: true}));
                    break;
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
            if (categoryId) {
                void putCategory();
            } else {
                void postCategory();
            }
        }

        const putCategory = async () => {
            try {
                const res = await INSTANCE.put(API_BASE_URL + '/admin/category/' + categoryId, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    processData: false,
                    contentType: false
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (e) {
                console.log('Что-то не так')
            }
        }

        const postCategory = async () => {
            try {
                const res = await INSTANCE.post(API_BASE_URL + '/admin/category', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    processData: false,
                    contentType: false
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/admin/categories');
                }, 1500)
            } catch (e) {
                console.log('Что-то не так')
            }

        }


        return (
            <Container>
                <div style={{marginTop: '75px'}}>
                    <Typography gutterBottom variant="h3" align="center">
                        Category
                    </Typography>
                    {message &&
                    <Typography gutterBottom variant="h5" align="center">
                        {message}
                    </Typography>
                    }
                    <Grid>
                        <Card style={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
                            <CardContent>
                                <form className={'form-style'}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="text" placeholder="Enter name"
                                                       label="name"
                                                       variant="outlined" fullWidth required name={"name"}
                                                       error={!!(formDirty.name && formError.name)}
                                                       helperText={formDirty.name && formError.name ? formError.name : ''}
                                                       value={formData.name}
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

export default CategoryForm;