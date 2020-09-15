import React, {Component} from 'react';
import SidebarWidgets from "../blog-post-area/sidebar-widgets";
import DetailHeroBanner from "./detail-hero-banner";
import {withRouter} from "react-router-dom";
import withBlogService from "../provider/service/with-blog-service";
import Loader from "../loader";
import Moment from "react-moment";
import parse from "html-react-parser";
import DetailBlogRender from "./detail-blog-render";

class DetailBlog extends Component {
    state = {
        blog: {},
        loading: true,
        error: null
    }

    componentDidMount() {
        this.getBlog().then(() => {
            this.setState({loading: false})
        })
    }

    getBlog = async () => {
        const {getBlog, match: {params: {id}}} = this.props
        await getBlog(id).then((data) => {
            this.setState({blog: data})
        }).catch(({res}) => {
            if (res && res.status === 404) {
                this.setState({error: 404})
            }
        })
    }

    render() {
        const {blog, loading, error} = this.state
        if (loading) {
            return <Loader/>
        }
        if (error === 404) {
            return <p>Не найдено</p>
        }
        return (
            <DetailBlogRender blog={blog}/>
        );
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        getBlog: blogService.getBlog
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(DetailBlog));
