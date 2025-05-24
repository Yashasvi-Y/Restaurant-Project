import images from "../../constants/images";
import data from "../../constants/data";
import "./WhatWeOffer.css";

const WhatWeOffer = () =>{
    return(
        <section className="what-we-offer py-6" id="what-we-offer">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">What We Offer</h2>
                </div>
                <div className="what-we-offer-content">
                    {
                        data.what_we_offer.map((whatItem, index) => {
                            return(
                            <div className="what-we-offer-item grid text-center" key={index}>
                                <div className="what-we-offer-item-left" data-aos="fade-right">
                                    <img src={whatItem.image} alt="" className="mx-auto"/>
                                </div>
                                <div className="what-we-offer-item-right" data-aos="fade-left">
                                    <h4 className="text-upper fs-20">{whatItem.title}</h4>
                                    <p className="text mx-auto">{whatItem.paragraph}</p>
                                    <a href="#" className="btn btn-accent">view more</a>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default WhatWeOffer;