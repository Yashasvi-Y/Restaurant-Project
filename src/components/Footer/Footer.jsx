import data from '../../constants/data';
import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {data.footerData.map((section, idx) => (
        <div className="footer-section" key={idx}>
          <h4>{section.section}</h4>

          {/* Address */}
          {section.content &&
            Array.isArray(section.content) &&
            typeof section.content[0] === "string" &&
            section.content.map((line, index) => <div key={index}>{line}</div>)
          }

          {/* Timing - Hours */}
          {section.content &&
            Array.isArray(section.content) &&
            typeof section.content[0] === "object" &&
            section.content.map((item, index) => (
              <div key={index}>{item.label} {item.time}</div>
            ))
          }

          {/* Social icons */}
          {section.social && (
  <div className="footer-social">
    {section.social.map((social, index) => (
      <a
        key={index}
        href={social.url}
        aria-label={social.label}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-icon"
      >
        {social.icon}
      </a>
    ))}
  </div>
)}
        </div>
      ))}
    </div>
    <div className="footer-copyright" data-aos="fade-up" data-aos-duration = "2500">
      © 2025 INDRIYA, All Rights Reserved
    </div>
  </footer>
);

export default Footer;