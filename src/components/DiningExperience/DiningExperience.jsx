import data from "../../constants/data";
import './DiningExperience.css';

const DiningExperience = () =>{
    return(
        <section className="dining-experience py-6" id="dining-experience">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Dining Experience</h2>
                </div>
                <div className="dining-experience-content grid py-6">
                    {
                        data.dining_experience.map((experience, index) => {
                            return(
                                <div className="dining-experience-item text-center mx-auto" key={index} data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                                    <h3 className="dining-experience-item-title">{experience.type}</h3>
                                    <ul className="dining-experience-item-list">
                                        {
                                            experience.experience_list.map((exper, idx)=>{
                                                return(
                                                    <li key={idx}>{exper}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <a href="#" className="btn btn-accent">try today</a>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default DiningExperience;