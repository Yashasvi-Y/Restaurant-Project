import data from "../../constants/data";
import "./Gallery.css";

const Gallery = () => {
    return(
        <section className="gallery py-6" id="gallery">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Our Gallery</h2>
                </div>
                <div className="gallery-content grid py-6">
                    {
                        data.gallery.map((gal, index)=>{
                            return(
                                <div className="gallery-item text-center" key={index}>
                                    <img src={gal.img} alt="gallery images" className="mx-auto"/>
                                    <h4 className="text-upper">{gal.title}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default Gallery;