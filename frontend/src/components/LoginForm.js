import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_BASE_URL} from "../config";
import {Button, Card, CardContent, Container, Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';
import {checkValue} from "../helpers";

const LoginForm = () => {
        const [formData, setFormData] = useState({email: '', password: ''});
        const [formDirty, setFormDirty] = useState({email: false, password: false});
        const [formError, setFormError] = useState(
            {
                email: 'Email не может быть пустым',
                password: 'Пароль не может быть пустым'
            });
        const [formValid, setFormValid] = useState(false);
        const [messageError, setMessageError] = useState('');
        const navigate = useNavigate();

        useEffect(() => {
            if (localStorage.getItem('access_token')) navigate('/');
        }, []);

        useEffect(() => {
            const hasErrors = Object.values(formError).some(errorMessage => errorMessage.length > 0);
            setFormValid(!hasErrors);
        }, [formError]);

        const blurHandler = (e) => {
            switch (e.target.name) {
                case "email":
                    setFormDirty(prev => ({...prev, email: true}));
                    break;
                case "password":
                    setFormDirty(prev => ({...prev, password: true}));
                    break;
            }
        }

        const changeInputEl = (e) => {
            const {name, value} = e.target;
            if (name === 'password') {
                setFormError(prev => ({
                    ...prev,
                    [name]: value.length < 3 ? 'Поле должно содеражать больше 3 символов' : ''
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
            const data = {
                email: formData.email,
                password: formData.password,
            };
            const res = axios.post(API_BASE_URL + '/auth/login', data);
            res.then(response => {
                    if (Object.keys(response.data).includes('access_token')) {
                        localStorage.setItem('access_token', response.data.access_token);
                        return navigate('/');
                    } else {
                        setMessageError("Неправильный логин или пароль");
                    }
                }
            );
            res.catch(error => {
                setMessageError("Неправильный логин или пароль");
            });

        }


        return (
            <Container>
                <div style={{marginTop: '75px'}}>
                    <Typography gutterBottom variant="h3" align="center">
                        Авторизация
                    </Typography>
                    {messageError &&
                    <Typography gutterBottom variant="h5" align="center" style={{color: 'red'}}>
                        {messageError}
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
                                            <Button onClick={handleSubmit} disabled={!formValid} type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth>Submit</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                            <div style={{textAlign: 'center', marginTop: '15px'}}>
                                <Link className={'link'} to={'/register'}>Нет аккаунта?</Link>
                            </div>
                        </Card>
                    </Grid>
                </div>
            </Container>
        );
    }
;

export default LoginForm;