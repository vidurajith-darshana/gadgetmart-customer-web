// ** core
import React, {useEffect, useState} from 'react';

// ** css
import '../../css/components/Cart/OrderHistory.css';

// ** external components
import { Button, Badge } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { showFailedToast, showSuccessToast } from '../../config/showToast';
import ListItem from "./ListItem";
import HistoryItem from './HistoryItem';
import {getOrderByUserEmailApiHandler} from "../../config/API";
import Loader from "../../config/LoaderConfig";

function OrderHistory() {

    const [itemArray, setItemArray] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function initialInvoke () {
            setIsLoading(true);
            let email = await localStorage.getItem('email');
            let response = await getOrderByUserEmailApiHandler(JSON.parse(email));
            let {code, result} = response?.data;

            if (code === '200') {
                setItemArray(result);
                console.log(result)
            } else {
                setItemArray([]);
            }

            setIsLoading(false)

        }

         initialInvoke();

    }, []);


  return (
    <>

      <h5 id='cart-middle-panel-title'>Order History View</h5>

      <section id='order-history-item-list-container'>

          {itemArray && itemArray.map((item, index) =>  <HistoryItem key={index} item={item}/>)}

      </section>

        <Loader isLoading={isLoading} />
    </>
  )
}

export default OrderHistory;
