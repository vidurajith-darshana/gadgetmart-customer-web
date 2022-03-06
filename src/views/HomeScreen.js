// ** core
import React, {useEffect, useState} from 'react';
// ** css
import '../css/views/HomeScreen.css';
// ** external components
import { Button, Badge } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import {showFailedToast, showSuccessToast, showWarningToast} from '../config/showToast';
// ** import components
import CompanyPanel from '../components/Home/CompanyPanel';
import { Link } from 'react-router-dom';
import Loader from '../config/LoaderConfig';
import {getAllProductApiHandler, getSupplierApiHandler} from "../config/API";
import {useSelector} from "react-redux";


function HomeScreen() {
        let[suppliers, setSuppliers] = useState([]);
        let[products, setProducts] = useState([]);
        let[selectSupplier, setSelectSupplier] = useState(0);
        let[isLoading, setIsLoading] = useState(false);

        let cart = useSelector(state => state.cartState.cart);

        useEffect(() => {
                (async function () {
                        setIsLoading(true);
                        let response = await getSupplierApiHandler();
                        let response2 = await getAllProductApiHandler();

                        if (response?.data?.code === '200') {
                                setSuppliers(response?.data?.result)
                        } else {
                                setSuppliers([]);
                        }

                        if (response2?.data?.code === '200') {
                                setProducts(response2?.data?.result)

                        } else {
                                setProducts([]);
                        }
                        setIsLoading(false);
                })();


        }, []);






        return (
                <main className='main-container'>

                        <header id='header-Container'>
                                <div id='logo-container'>
                                        <img src={require('../assets/logo-b.png')} id="header-logo" />
                                        <h3 id='logo-text'>Gadjet Mart</h3>
                                </div>

                                <div id='header-action-container'>
                                        <Link to='/profile'>
                                                <img src={require('../assets/profile.png')} id="header-profile-logo" />
                                        </Link>

                                        <Link to='/cart'>
                                                <img src={require('../assets/cart.png')} id="header-cart-logo" />
                                                {(cart && cart?.length > 0) && <Badge color="warning" pill
                                                        id='header-cart-badge'>{cart?.length}</Badge>}
                                        </Link>
                                        <Link to='/'>
                                                <img src={require('../assets/log-out.png')} id="header-logout-logo" />
                                        </Link>

                                </div>
                        </header>



                        <div id='toggle-button-Container'>
                                {/* button 01 */}
                                <Button
                                        color={(selectSupplier === 0) ? "primary" : "secondary"}
                                        id='button-tab'
                                        onClick={() => setSelectSupplier(0)}
                                >
                                        {suppliers.length > 0 ? suppliers[0].name : '-'}
                                </Button>

                                {/* button 02 */}
                                <Button
                                        color={(selectSupplier === 1) ? "primary" : "secondary"}
                                        id='button-tab'
                                        onClick={() =>  setSelectSupplier(1)}
                                >
                                        {suppliers.length > 1 ? suppliers[1].name : '-'}
                                </Button>

                                {/* button 03 */}
                                <Button
                                        color={(selectSupplier === 2) ? "primary" : "secondary"}
                                        id='button-tab'
                                        onClick={() =>  setSelectSupplier(2)}
                                >
                                        {suppliers.length > 2 ? suppliers[2].name : '-'}
                                </Button>
                        </div>


                        <section>
                                <CompanyPanel products={products} supplier={suppliers[selectSupplier]} isLoading={isLoading}/>

                        </section>
                        <Loader isLoading={isLoading} />
                        {/* toast : important */}
                        <ToastContainer/>
                </main>
        )
}

export default HomeScreen;
