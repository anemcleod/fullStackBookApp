import React from 'react';
import {Link} from 'react-router-dom';
import '../../assets/stylesheets/legal.css';
import HalongBay from '../svg/halongBay';
 
const PaymentSuccess = () => {

    return (
      <div className="legal-container">
          <div className="legal-background">
            <HalongBay alt="ha long bay"/>
          </div>
            
            <div className="legal-content-container">
                <div className="legal-content">
                    <h1>Payment Successful</h1>

                    <p>download should start automatically</p>
                    <p>press this button to start download</p>
                    <div className="spacer">
                      <Link to="/">
                        <button class="back__button">
                          go back <span>to the beginning</span>
                        </button>
                      </Link> 
                    </div>
                </div>    
            </div>   
      </div>
    )
}

export default PaymentSuccess;