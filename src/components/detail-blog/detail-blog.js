import React, {Component} from 'react';
import SidebarWidgets from "../blog-post-area/sidebar-widgets";
import DetailHeroBanner from "./detail-hero-banner";
import {withRouter} from "react-router-dom";
import withBlogService from "../provider/service/with-blog-service";
import Loader from "../loader";
import Moment from "react-moment";
import parse from "html-react-parser";

class DetailBlog extends Component {
    state = {
        blog: {},
        loading: true,
    }

    componentDidMount() {
        const {getBlog, match: {params: {id}}} = this.props
        getBlog(id).then((data) => {
            this.setState({blog:data,loading: false})
        })
    }

    render() {
        const {blog, loading} = this.state
        if (loading) {
            return <Loader/>
        }
        return (
            <div>
                <DetailHeroBanner/>
                <section className="blog-post-area section-margin">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main_blog_details">
                                    <img className="img-fluid" src={blog.imageBlog} alt=""/>
                                    <a href="#"><h4>{blog.title}</h4></a>
                                    <div className="user_details">
                                        <div className="float-left">
                                            <a href="#">Lifestyle</a>
                                            <a href="#">Gadget</a>
                                        </div>
                                        <div className="float-right mt-sm-0 mt-3">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5>{blog.author}</h5>
                                                    <p><Moment format="YYYY-MM-DD HH:mm">{blog.createAt}</Moment></p>
                                                </div>
                                                <div className="d-flex">
                                                    <img width="42" height="42" src="/img/blog/user-img.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {parse(blog.body || "")}
                                </div>
                            </div>
                            <SidebarWidgets/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        getBlog: blogService.getBlog
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(DetailBlog));
