import data from "../../constants/data";
import "./Team.css";

const Team = () => {
    return(
        <section className="team py-6 bg-accent" id="team">
            <div className="container">
                <div className="section-title bg-dark">
                    <h2 className="text-upper text-white text-center">Our Team</h2>
                </div>
                <div className="team-content grid py-6">
                    {
                        data.team.map((team, index)=>{
                            return(
                                <div className="team-item text-center text-white" key={index}>
                                    <img src={team.img} alt="team images" className="mx-auto"/>
                                    <p className="text-upper fw-7">{team.name}</p>
                                    <span className="text-upper">{team.post}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default Team;