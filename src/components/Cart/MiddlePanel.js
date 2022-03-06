// ** core
import React, { useState } from 'react';
// ** css
import '../../css/components/Cart/MiddlePanel.css';
// ** external components
import { Button, Badge } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { showFailedToast, showSuccessToast } from '../../config/showToast';
import CartView from './CartView';
import OrderHistory from './OrderHistory';

function MiddlePanel({ isCardViewOpen }) {
        return (
                <main id='cart-middle-panel-container'>
                        {isCardViewOpen ? <CartView />
                                :
                                <OrderHistory />}

                </main>
        )
}

export default MiddlePanel;