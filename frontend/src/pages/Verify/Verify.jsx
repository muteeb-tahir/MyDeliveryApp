import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            // ✅ Only send the request if required values exist
            if (!orderId || !success) {
                console.warn("Missing orderId or success param");
                return navigate('/');
            }

            try {
                const response = await axios.post(url + "/api/order/verify", {
                    success,
                    orderId
                });

                if (response.data.success) {
                    navigate('/myorders');
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error("Verification error:", err);
                navigate('/');
            }
        };

        verifyPayment();
    }, [success, orderId, url, navigate]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify
