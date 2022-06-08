import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { RichText } from 'prismic-reactjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../assets/stylesheets/footer.css";

import PaymentPortal from './payment';

const Footer = ({setOffsetY, setChapter, chapterData}) => {
    window.scrollTo(0, 0);
    const [showPayment, setShowPayment] = useState(false);

    const reset = () => {
        setOffsetY(0);
        setChapter(1);
    };    

    const togglePayment = () => {
        setShowPayment(prevState => !prevState);
    }

 return (
    <div className="footer-container">
       
        <div className="cta-container">
            <div>
                <h3>want to read more?</h3>
            </div>

            <div className="cta-purchase">
                <p>purchase the book<span>${chapterData.price}</span></p>

                <button 
                    className="buy__button" 
                    onClick={togglePayment}>
                    buy
                </button>
            </div>
        </div>

        <div className="footer-menu">
            <div className="socials">
                <div className="social-btn">
                    <FontAwesomeIcon icon={['fab', 'facebook']}/>
                </div>
                
                <div className="social-btn">
                    <FontAwesomeIcon icon={['fab', 'instagram']}/>
                </div>

                <div className="social-btn">
                    <FontAwesomeIcon icon={['fab', 'linkedin']}/>
                </div>
            </div>
            
            <div className="contributors">
                <div className="contributor">
                    <h4>Copyright</h4>
                    <p>{RichText.asText(chapterData.author)} 2020</p>
                </div>

                <div className="contributor">
                    <h4>Design</h4>
                    <p>{RichText.asText(chapterData.designer)}</p>
                </div>
            </div>

            <div className="legal">
                <Link to="/terms_and_conditions">
                    <h4>t&amp;c's</h4>
                </Link>

                <button 
                    onClick={reset} 
                    className="back__button">
                    go back <span>to the beginning</span>
                </button>    
            </div>

        </div> 
        
        {
            showPayment && <PaymentPortal togglePayment={togglePayment}/>
        }
        
    </div>
 )
}

export default Footer;