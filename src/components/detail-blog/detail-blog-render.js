import React from 'react';
import DetailHeroBanner from "./detail-hero-banner";
import Moment from "react-moment";
import parse from "html-react-parser";
import SidebarWidgets from "../blog-post-area/sidebar-widgets";
import {Link} from "react-router-dom";
import withLogin from "../provider/login/with-login";

const DetailBlogRender = ({blog, user}) => {

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
                                        {user.username === blog.author &&
                                        <Link to={`/update-blog/${blog.id}`}>Изменить</Link>}
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

export default withLogin(DetailBlogRender);
