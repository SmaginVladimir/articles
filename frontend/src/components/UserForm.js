import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, CardContent, Container, Grid, Switch, TextField, Typography} from "@mui/material";
import '../App.css';
import {API_BASE_URL, INSTANCE} from "../config";
import {useNavigate, useParams} from "react-router-dom";
import {checkValue} from "../helpers";

const UserForm = () => {

        const [formData, setFormData] = useState({
            name: '', email: '', password: '', active: false,
            order: ''
        });

        const [formDirty, setFormDirty] = useState({
            name: false, email: false, password: false, order: false
        });

        const [formError, setFormError] = useState(
            {
                name: 'Имя не может быть пустым',
                email: 'Email не может быть пустым',
                password: 'Пароль не может быть пустым',
                order: 'Order не может быть пустым'
            });

        const [formValid, setFormValid] = useState(false);
        const [message, setMessage] = useState('');
        const navigate = useNavigate();
        const userId = useParams().id;


        useEffect(() => {
            if (!localStorage.getItem('access_token') && localStorage.getItem('role') !== 'ADMIN') {
                navigate('/login');
            }
            if (userId) {
                void userFetch();
            }
        }, []);

        useEffect(() => {
            const hasErrors = Object.values(formError).some(errorMessage => errorMessage.length > 0);
            setFormValid(!hasErrors);
        }, [formError]);

        const userFetch = useCallback(async () => {
            try {
                const response = await INSTANCE.get(API_BASE_URL + '/admin/user/' + userId, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = response.data.data;
                setFormData(prev => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                    password: '',
                    active: data.active,
                    order: data.order
                }))
                setFormDirty(prev => ({...prev, name: true, email: true, order: true}))
                setFormError(prev => ({...prev, name: '', email: '', order: ''}))
            } catch (e) {
                console.log('Что-то не так')
            }

        });

        const blurHandler = (e) => {
            switch (e.target.name) {
                case "name":
                    setFormDirty(prev => ({...prev, name: true}));
                    break;
                case "email":
                    setFormDirty(prev => ({...prev, email: true}));
                    break;
                case "password":
                    setFormDirty(prev => ({...prev, password: true}));
                    break;
                case "order":
                    setFormDirty(prev => ({...prev, order: true}));
                    break;
            }
        }

        const changeFormErrorName = (e) => {
            setFormData(prev => ({...prev, name: e.target.value}));
            if (e.target.value.length < 3) {
                setFormError(prev => ({...prev, name: "Некоректное имя"}));
            } else {
                setFormError(prev => ({...prev, name: ""}));
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
                    [name]: checkValue(name, value)
                }));
            }
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }


        const handleSubmit = (e) => {
            e.preventDefault();
            if (userId) {
                void putUser();
            } else {
                void postUser();
            }
        }

        const putUser = async () => {
            try {
                const res = await INSTANCE.put(API_BASE_URL + '/admin/user/' + userId, formData, {
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

        const postUser = async () => {
            try {
                const res = await INSTANCE.post(API_BASE_URL + '/admin/user', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    processData: false,
                    contentType: false
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/admin/users');
                }, 1500)
            } catch (e) {
                console.log('Что-то не так')
            }

        }


        return (
            <Container>
                <div style={{marginTop: '75px'}}>
                    <Typography gutterBottom variant="h3" align="center">
                        Users
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
                                                       onChange={changeFormErrorName}
                                                       type="text" placeholder="Enter name"
                                                       label="name"
                                                       variant="outlined" fullWidth required name={"name"}
                                                       error={!!(formDirty.name && formError.name)}
                                                       helperText={formDirty.name && formError.name ? formError.name : ''}
                                                       value={formData.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="email" placeholder="Enter email"
                                                       label="Email"
                                                       variant="outlined" fullWidth required name={"email"}
                                                       error={!!(formDirty.email && formError.email)}
                                                       helperText={formDirty.email && formError.email ? formError.email : ''}
                                                       value={formData.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onBlur={blurHandler}
                                                       onChange={changeInputEl}
                                                       type="password"
                                                       placeholder="Enter password" label="Password"
                                                       variant="outlined" fullWidth required name={"password"}
                                                       error={!!(formDirty.password && formError.password)}
                                                       helperText={formDirty.password && formError.password ? formError.password : ''}
                                                       value={formData.password}
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
export default UserForm;