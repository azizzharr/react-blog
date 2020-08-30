import React from "react";

const BlogSliderItem = ({item}) => {
    return (
        <div className="card blog__slide text-center">
            <div className="blog__slide__img">
                <img className="card-img rounded-0" src="img/blog/blog-slider/blog-slide1.png" alt=""/>
            </div>
            <div className="blog__slide__content">
                <a className="blog__slide__label" href="#">Fashion</a>
                <h3><a href="#">New york fashion week's continued the evolution</a></h3>
                <p>2 days ago</p>
            </div>
        </div>
    )
}

export default BlogSliderItem;
