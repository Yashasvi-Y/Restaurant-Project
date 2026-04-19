import { useNavigate } from 'react-router-dom';
import images from "../../constants/images";
import "./Support.css";

const Support = () => {
    const navigate = useNavigate();

    return(
        <section className="support py-6" id="support">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Updates & Support</h2>
                </div>
                <div className="support-content grid py-6 text-center">
                    <div className="support-content-left" data-aos = "fade-right" data-aos-duration = "2000">
                        <p className="text mx-auto">
                            We're committed to providing exceptional dining experiences and world-class service. Have questions about our menu, need to modify your reservation, or have suggestions to improve your next visit? Our dedicated support team is here to help!
                        </p>
                        <p className="text mx-auto">
                            Stay updated with our latest specials, seasonal dishes, and exclusive dining events. Reach out to us anytime—we'd love to hear from you and ensure your experience with us is unforgettable.
                        </p>
                        <button className="btn btn-accent" onClick={() => navigate('/support-form')}>Support Center</button>
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