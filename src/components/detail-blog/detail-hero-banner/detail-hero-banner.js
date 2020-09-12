import React from 'react';

const DetailHeroBanner = () => {
    return (
        <section className="mb-30px">
            <div className="container">
                <div className="hero-banner hero-banner--sm">
                    <div className="hero-banner__content">
                        <h1>Blog details</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Blog Details</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default DetailHeroBanner;
