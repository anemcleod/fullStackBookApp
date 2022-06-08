import React from 'react';
import {Link} from 'react-router-dom';
import '../../assets/stylesheets/subPages.css';
import HalongBay from '../svg/halongBay';
import PaymentSuccess from './subPageComponents/paymentSuccess';
import PaymentFailure from './subPageComponents/paymentFailure';
 
const PaymentResult = (props) => {
    return (
      <div className="payment-result-container">
          <div className="payment-result-background">
            <HalongBay alt="ha long bay"/>
          </div>           
            <div className="payment-result-content-container">
                <div className="payment-result-content">
                   {
                      props.location.state.success ? 
                      <PaymentSuccess orderId={props.location.state.orderId}/> :
                      <PaymentFailure/>
                   }
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

export default PaymentResult;