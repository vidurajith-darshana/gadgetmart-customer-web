// ** core
import React, { useState, useEffect } from 'react';
// ** css
import '../../css/components/Cart/SidePanel.css';
// ** external components
import { Button, Badge } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { showFailedToast, showSuccessToast } from '../../config/showToast';

function SidePanel({togglePanel}) {
        const [isCartView, setisCartView] = useState(true);

        useEffect(() => {
                togglePanel(isCartView)
        }, [isCartView]);
        
        return (
                <section id='cart-side-panel-container'>
                        <Button
                                onClick={() => setisCartView(true)}
                                id='side-panel-item'
                                color={isCartView ? 'primary' : 'secondary'}
                        >
                                Cart View
                        </Button>

                        <Button
                                onClick={() => setisCartView(false)}
                                id='side-panel-item'
                                color={!isCartView ? 'primary' : 'secondary'}
                        >
                                Order History View
                        </Button>

                </section>
        )
}

export default SidePanel;