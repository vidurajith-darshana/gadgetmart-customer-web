// ** core
import React, {useState} from 'react';
// ** css
import '../css/views/CartScreen.css';
// ** external components
import { Button, Badge } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { showFailedToast, showSuccessToast } from '../config/showToast';
// ** import components
import CompanyPanel from '../components/Home/CompanyPanel';
import SidePanel from '../components/Cart/SidePanel';
import MiddlePanel from '../components/Cart/MiddlePanel';

function CartScreen() {

  const [isCartViewPanel, setisCartViewPanel] = useState(true);

  const togglePanelHandler = (isCardView) => {
      setisCartViewPanel(isCardView);
  }

  return (
    <main id='cart-container'>
            <SidePanel togglePanel={togglePanelHandler} />
            <MiddlePanel isCardViewOpen={isCartViewPanel}/>

    </main>
  )
}

export default CartScreen;