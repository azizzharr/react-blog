import React, {Component} from "react";
import withBlogService from "../provider/service/with-blog-service";
import BlogSliderItem from "./blog-slider-item";

class BlogSlider extends Component {

    state = {
        blogSlider:[]
    }

    componentDidMount() {
        const {getBlogs} = this.props

        getBlogs().then((blogSlider)=>{
            this.setState({
                blogSlider
            })
        })
    }

    render() {
        const {blogSlider} = this.state
        return (
            <section>
                <div className="container">
                    <div className="owl-carousel owl-theme blog-slider">
                        {blogSlider.map((item =>(
                            <BlogSliderItem key={item.id} item={item}/>
                            )))}

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

export default withBlogService(mapMethodsToProps)(BlogSlider);
