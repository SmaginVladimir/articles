import React, {useEffect} from 'react';
import {API_BASE_URL, INSTANCE} from "../config";
import Article from "../container/Article";

const Home = () => {


    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            INSTANCE.get(API_BASE_URL + '/auth/me', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                localStorage.setItem('role', res.data.user.role);
            });
        }
    }, []);

    return (
        <Article/>
    );
};

export default Home;