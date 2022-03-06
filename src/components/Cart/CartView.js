// ** core
import React, {useEffect, useState} from 'react';
// ** css
import '../../css/components/Cart/CartView.css';
// ** external components
import {Button} from 'reactstrap';
import ListItem from './ListItem';
import {useDispatch, useSelector} from "react-redux";
import {remove_duplicates_es6} from "../../util/customArray";
import {createOrderApiHandler} from "../../config/API";
import {showFailedToast, showSuccessToast} from "../../config/showToast";
import {ToastContainer} from "react-toastify";
import {addToCartAction} from "../../redux/actions/cartAction";

function CartView() {
    let cart = useSelector(state => state.cartState.cart);
    const [selectSuppliers, setSelectSuppliers] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [itemArray, setItemArray] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const dispatch = useDispatch();



    useEffect(() => {
        if (cart) {

            let suppliers = [];
            let itemArr = [];
            let total = 0;
            cart.map(item => {
               suppliers.push(item.supplier)

                let tot = Number(item.count) * Number(item.price);
                total += tot;

                let sample =  {
                    itemName: item?.name,
                    subtotal: (Number(item?.price) * Number(item?.count)),
                    itemImage:item?.images[0],
                    shopName: item?.supplier,
                    deliveryLocation: item?.deliveryLocation,
                    warrantyRequest: item?.warrantyRequest,
                    qty: Number(item?.count)
                }

                itemArr.push(sample);
            });

            setItemArray(itemArr);

            let uniqueSup = remove_duplicates_es6(suppliers);
            setSelectSuppliers(uniqueSup)
            setFinalPrice(total);


            // pay button disabled
            let filter = itemArr?.filter(item => item.deliveryLocation === '' || item.warrantyRequest === '');
            if (filter.length > 0) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }

        }

    }, [cart]);




    const payNowHandler = async () => {
        let email = await localStorage.getItem('email');
        email = JSON.parse(email)
        let userDto = {email};


        let data = {
            userDto,
            totalPrice:finalPrice,
            shops: selectSuppliers,
            details: itemArray
        }

        let response = await createOrderApiHandler(data);
        let {code, result} = response?.data
        if (code === '200') {
            showSuccessToast("Order has been created!");
            dispatch(addToCartAction(null));
            setFinalPrice(0);
        } else {
            showFailedToast("Order hasn't been created!")
        }
    }

    return (
        <>
            <h5 id='cart-middle-panel-title'>Cart View</h5>

            <section id='cart-item-list-container'>
                {
                    cart && cart.map((item, index) => {
                        return <ListItem key={index}
                                         id={index}
                                         image={item?.images[0]}
                                         title={item?.name}
                                         price={item?.price}
                                         // setTotalPrice={totalPriceHandler}
                                         data={item}/>
                    })
                }

            </section>

            <footer id='middle-panel-footer'>
                <h6 id='middle-panel-footer-total'>Current Total: LKR. {finalPrice}</h6>
                <Button
                    id='checkout-button'
                    color='primary'
                    onClick={payNowHandler}
                    disabled={isDisabled}
                >
                    PAY NOW
                </Button>
            </footer>
            {/* toast : important */}
            <ToastContainer/>
        </>
    )
}

export default CartView
