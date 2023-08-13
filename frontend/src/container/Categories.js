import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, Typography} from "@mui/material";
import {API_BASE_URL, INSTANCE} from "../config";
import {Ring} from "@uiball/loaders";
import {DataGrid} from "@mui/x-data-grid";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    function EditButton(category) {
        return (
            <Button onClick={() => navigate('/admin/category/edit/' + category.id)}>Изменить</Button>
        );
    }

    function DeleteButton(category) {
        return (
            <Button onClick={() => deleteCategory(category.id)}>Удалить</Button>
        );
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 220},
        {field: 'active', headerName: 'Active', width: 110},
        {field: 'order', headerName: 'Order', width: 95},
        {field: 'create', headerName: 'Create', width: 200},
        {field: 'update', headerName: 'Update', width: 200},
        {field: 'edit', headerName: 'Edit', width: 100, renderCell: EditButton},
        {field: 'delete', headerName: 'Delete', width: 100, renderCell: DeleteButton},

    ];


    useEffect(() => {
        if (!localStorage.getItem('access_token') && localStorage.getItem('role') !== 'ADMIN') {
            navigate('/login');
        }
        void addCategories();
    }, []);

    const addCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + '/categories/all', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setCategories(response.data.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
        }
    });

    const deleteCategory = (categoryId) => {
        INSTANCE.delete(API_BASE_URL + `/admin/category-delete/${categoryId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(() => {
            const updatedCategories = categories.filter(category => category.id !== categoryId);
            setCategories(updatedCategories);
        });
    }

    return (
        <Container style={{marginTop: '50px'}}>
            <Typography gutterBottom variant="h3" align="center">
                Categories
            </Typography>
            <Button onClick={() => navigate('/admin/user/added')}
                    color="inherit">New Category</Button>
            <div style={{height: 400, width: '100%'}}>
                {isLoading ?
                    <Ring
                        size={70}
                        lineWeight={2}
                        speed={2}
                        color="black"
                    /> :
                    <DataGrid
                        rows={categories}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 5},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                }
            </div>
        </Container>
    );
};

export default Categories;