import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Button, Container, Typography} from "@mui/material";
import {API_BASE_URL, INSTANCE} from "../config";
import {Ring} from "@uiball/loaders";
import {useNavigate} from "react-router-dom";


export default function Users() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    function EditButton(user) {
        return (
            <Button onClick={() => navigate('/admin/user/edit/' + user.id)}>Изменить</Button>
        );
    }

    function DeleteButton(user) {
        return (
            <Button onClick={() => deleteUser(user.id)}>Удалить</Button>
        );
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 100},
        {field: 'email', headerName: 'Email', width: 230},
        {field: 'role', headerName: 'Role', width: 100},
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
        void addUsers();
    }, []);

    const addUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + '/admin/users/all', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setUsers(response.data.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
        }
    });

    const deleteUser = (userId) => {
        INSTANCE.delete(API_BASE_URL + `/admin/user-delete/${userId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(() => {
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        });
    }

    return (
        <Container style={{marginTop: '50px'}}>
            <Typography gutterBottom variant="h3" align="center">
                Users
            </Typography>
            <Button onClick={() => navigate('/admin/user/added')}
                    color="inherit">New User</Button>
            <div style={{height: 400, width: '100%'}}>
                {isLoading ?
                    <Ring
                        size={70}
                        lineWeight={2}
                        speed={2}
                        color="black"
                    /> :
                    <DataGrid
                        rows={users}
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
}