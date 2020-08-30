import React, {Component} from "react";
import Header from "../header";
import HeroBanner from "../hero-banner";
import BlogSlider from "../blog-slider";
import {BlogServiceProvide} from "../provider/service/service-context";
import BlogService from "../../service";

class App extends Component {

    blogService = new BlogService()

    render() {
        return (
            <BlogServiceProvide value={this.blogService}>
                <Header/>
                <HeroBanner/>
                <BlogSlider/>
            </BlogServiceProvide>
        )
    }
}

export default App;
