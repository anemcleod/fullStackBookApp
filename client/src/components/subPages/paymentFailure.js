import React from 'react';
import {Link} from 'react-router-dom';
import '../../assets/stylesheets/subPages.css';
import HalongBay from '../svg/halongBay';
 
const PaymentFailure = () => {

    return (
      <div className="payment-result-container">
          <div className="payment-result-background">
            <HalongBay alt="ha long bay"/>
          </div>
            
            <div className="payment-result-content-container">
                <div className="payment-result-content">
                    <h1>Something went wrong</h1>
                    <p>Please try again later</p>                   
                    <div>
                      <Link to="/">
                        <button className="back__button">
                          go back <span>to the beginning</span>
                        </button>
                      </Link> 
                    </div>
                </div>    
            </div>   
      </div>
    )
}

export default PaymentFailure;