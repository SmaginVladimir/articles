import React, {useCallback, useEffect, useState} from 'react';
import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar';
import {API_BASE_URL, INSTANCE} from "../config";
import {Link} from "react-router-dom";


const SidebarMenu = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        addCategory();
    }, []);

    const addCategory = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await INSTANCE.get(API_BASE_URL + '/categories/all');
            setCategories(response.data.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
        }
    });

    return (
        <div>
            {!isLoading &&
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/"/>}>
                        All
                    </MenuItem>
                    {categories.map((category, i) => (
                        <MenuItem key={i}
                                  component={<Link to={"articles/category/" + category.id}/>}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Menu>
            </Sidebar>
            }
        </div>
    );
};

export default SidebarMenu;