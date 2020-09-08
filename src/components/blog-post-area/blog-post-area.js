import React, {Component} from "react";
import withBlogService from "../provider/service/with-blog-service";
import Pagination from "react-js-pagination";
import SidebarWidgets from "./sidebar-widgets";
import BlogItem from "./blog-item";
import {withRouter} from "react-router-dom";
import getSearchParam, {setSearchParam} from "../hooks/search-params";


class BlogPostArea extends Component {
    state = {
        blogs: {},
        loading: true,
        activePage: 1
    }

    handlePageChange = (pageNumber) => {
        const {history: {push, location: {search}}} = this.props
        push({search: setSearchParam(search, 'page', pageNumber)})
        this.setState({activePage: pageNumber});
    }

    getBlogsFromServer = () => {
        const {getBlogs} = this.props;
        getBlogs(this.state.activePage).then((blogs) => {
            this.setState({
                blogs,
                loading: false
            })
        })
    }

    componentDidMount() {
        const {location: {search}} = this.props;
        const page = +(getSearchParam(search, 'page') || 1)
        this.setState({activePage: page}, () => {
            this.getBlogsFromServer()
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.activePage !== this.state.activePage) {
            this.getBlogsFromServer()
        }
    }

    render() {
        const {blogs, loading} = this.state;
        if (loading) {
            return <p>Loading...</p>
        }
        return (
            <section className="blog-post-area section-margin mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {blogs.results.map((item) => (
                                <BlogItem key={item.id} item={item}/>
                            ))}
                            <div className="row">
                                <div className="col-lg-12">
                                    <nav className="blog-pagination justify-content-center d-flex">
                                        <Pagination
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={10}
                                            totalItemsCount={blogs.count}
                                            pageRangeDisplayed={5}
                                            onChange={this.handlePageChange}
                                            itemClass='page-item'
                                            linkClass='page-link'
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <SidebarWidgets/>
                    </div>
                </div>
            </section>
        )
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        getBlogs: blogService.getBlogs
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(BlogPostArea));
