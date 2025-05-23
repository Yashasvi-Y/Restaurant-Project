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
                    <div className="header-content-left">
                        <h1 className="text-upper header-title">Indriya</h1>
                        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellat voluptatum corporis ab ipsa, itaque id quis non aspernatur aut possimus asperiores quaerat vero aliquid excepturi voluptas voluptatem necessitatibus nobis!</p>
                        <a href="#" className="btn btn-dark">
                            <span>view more</span> <FaRegPaperPlane />
                        </a>
                    </div>
                    <div className="header-content-right">
                        <img src={images.header_image} alt="header image Restaurant" />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;