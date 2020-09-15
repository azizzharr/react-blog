import React, {Component} from 'react';
import withBlogService from "../provider/service/with-blog-service";
import SetBlog from "../set-blog";
import Loader from "../loader";

const typekey = {
    All: 'a',
    Sport: 's',
    Technology: 't',
    Politics: 'p'
}

class UpdateBlog extends Component {
    state = {
        data: {},
        loading: true,
    }

    componentDidMount() {
        const {match: {params: {id}}, getBlog} = this.props
        getBlog(id).then((resData) => {
            const data = {
                id: resData.id,
                title: resData.title,
                body: resData.body,
                type: typekey[resData.type],
                short_body: resData.shortBody,
            }
            this.setState({data, loading: false})
        })
    }

    updateBlog = (data) => {
        return this.props.updateBlog(data.id, data)
    }

    render() {
        const {loading, data} = this.state
        if (loading) {
            return <Loader/>
        }
        return <SetBlog data={data} updateBlog={this.updateBlog}/>;
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        updateBlog: blogService.updateBlog,
        getBlog: blogService.getBlog
    }
}

export default withBlogService(mapMethodsToProps)(UpdateBlog);
