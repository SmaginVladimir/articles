import UserForm from "./components/UserForm";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CategoryArticle from "./container/CategoryArticle";
import React from "react";
import Users from "./container/Users";
import Categories from "./container/Categories";
import ArticleForm from "./components/ArticleForm";
import CategoryForm from "./components/CategoryForm";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path={'/articles/category/:id'} element={<CategoryArticle/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/admin/article/added'} element={<ArticleForm/>}/>
                <Route path={'/admin/article/edit/:id'} element={<ArticleForm/>}/>
                <Route path={'/admin/users'} element={<Users/>}/>
                <Route path={'/admin/user/added'} element={<UserForm/>}/>
                <Route path={'/admin/user/edit/:id'} element={<UserForm/>}/>
                <Route path={'/admin/categories'} element={<Categories/>}/>
                <Route path={'/admin/category/added'} element={<CategoryForm/>}/>
                <Route path={'/admin/category/edit/:id'} element={<CategoryForm/>}/>
                <Route path={'*'} element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
