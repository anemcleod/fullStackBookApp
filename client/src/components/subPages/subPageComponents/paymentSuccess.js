import React, { useEffect } from 'react';
 
const PaymentSuccess = ({orderId}) => {
  const handleDownload = () => {
    fetch(`http://localhost:3001/${process.env.REACT_APP_DOWNLOAD_API_ENDPOINT}`, {
      method: 'GET',
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/pdf",
      },
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, '_blank');
    });
  }

  useEffect(()=>{
    handleDownload();
  }, []); 
   
  return (
    <>
      <h2>Thank you for purchasing 'book title'</h2>
      <div>
        <p className="order-id"><span>Order ID: #</span>{orderId}</p>
        <p>Your download should start automatically</p>
        <p>or press this button to start your download</p>
      </div>
      <button onClick={handleDownload} className="download-btn">
            download
      </button>
    </>
  )
}

export default PaymentSuccess;