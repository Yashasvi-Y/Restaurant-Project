import React from "react";
import images from '../../constants/images';
import "./Header.css";
import { FaRegPaperPlane } from "react-icons/fa";
import Navbar from '../Navbar/Navbar';

const Header = () => {
    return(
        <header className="header flex" id="header">
            <Navbar/>
            <div className="container">
                <div className="header-content grid text-center py-6 text-white">
                    <div className="header-content-left" data-aos="fade-right">
                        <h1 className="text-upper header-title">Indriya</h1>
                        <p className="text">Welcome to Indriya, where every meal is a celebration of flavors and tradition. Embark on a culinary journey that excites your palate and soothes your soul. Join us for exceptional food, attentive service, and an ambiance that makes every visit truly special.</p>
                        <a href="#" className="btn btn-dark">
                            <span>view more</span> <FaRegPaperPlane />
                        </a>
                    </div>
                    <div className="header-content-right" data-aos="fade-left">
                        <img src={images.header_image} alt="header image Restaurant" />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;