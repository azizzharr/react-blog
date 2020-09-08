import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {BlogServiceProvide} from "./components/provider/service/service-context";
import BlogService from "./service";

const blogService = new BlogService()

ReactDOM.render(
    <BlogServiceProvide value={blogService}>
        <App/>
    </BlogServiceProvide>
    ,
    document.getElementById('root')
);


