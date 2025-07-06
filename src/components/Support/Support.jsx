import images from "../../constants/images";
import "./Support.css";

const Support = () => {
    return(
        <section className="support py-6" id="support">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Updates & Support</h2>
                </div>
                <div className="support-content grid py-6 text-center">
                    <div className="support-content-left" data-aos = "fade-right" data-aos-duration = "2000">
                        <p className="text mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cum ad rem ipsum obcaecati facere nam similique dolor neque, placeat vitae perspiciatis adipisci quas deserunt tempora quam ipsam culpa aut?
                        </p>
                        <p className="text mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cum ad rem ipsum obcaecati facere nam similique dolor neque.
                        </p>
                        <a href="#" className="btn btn-accent">Support Center</a>
                    </div>
                    <div className="support-content-right" data-aos = "fade-left" data-aos-duration = "2000">
                        <img src={images.drink7} alt="" className="mx-auto"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Support;