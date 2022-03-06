// ** core
import React, {useEffect, useState} from 'react';
// ** css
import '../../css/components/Home/CompanyPanel.css';
import '../../css/components/Home/filter.css';
// ** external components
import {Button} from 'reactstrap';
import Select from 'react-select';
// ** import components
import CardItem from './CardItem';
import {showWarningToast} from "../../config/showToast";
import {ToastContainer} from "react-toastify";

function CompanyPanel({products = [], supplier = '', isLoading}) {

    let [selectProduct, setSelectProduct] = useState([]);
    let [selectBrand, setSelectBrand] = useState('');
    let [selectCategory, setSelectCategory] = useState('');
    let [text, setText] = useState('');

    const brandOptions = [
        {value: '', label: ''},
    ];

    const categoryOptions = [
        {value: '', label: ''},
    ]

useEffect(() => {
    console.log(supplier)
    if (!isLoading &&supplier && products && selectProduct?.length === 0 ) {
        showWarningToast(supplier?.name +" at under maintenance. Please try again later!")
    }
}, [selectProduct])


    if (supplier && products) {
        let productArr = products[supplier?.name];

        let proOptions = [];
        let catOptions = [];
        productArr?.map(item => {
            proOptions.push(item.brand);
            catOptions.push(item.category);
        })

        // remove duplicate
        let uniquePro = [...new Set(proOptions)];
        let uniqueCat = [...new Set(catOptions)];


        uniquePro?.map(item => {
            brandOptions.push(
                {value: item, label: item}
            );
        })

        uniqueCat?.map(item => {
            categoryOptions.push(
                {value: item, label: item}
            );
        });
    }


    useEffect(() => {
        if (supplier && products) {
            setSelectProduct(products[supplier?.name]);
        }
    }, [products, supplier]);

    useEffect(() => {
        if (text === '') {
            if (supplier && products) {
                setSelectProduct(products[supplier?.name]);
            }
        }
    }, [text]);


    const isEnabled = selectBrand && selectCategory && text;

    const filterHandler = () => {
        let filter = selectProduct?.filter(product => {
            return product.brand === selectBrand && product.category === selectCategory && product?.name?.toUpperCase()?.includes(text.toUpperCase());
        });

        setSelectProduct(filter)
    }

    const resetHandler = () => {
        if (supplier && products) {
            setSelectProduct(products[supplier?.name]);
        }
        setSelectCategory('');
        setSelectBrand('');
        setText('');

    }


    return (
        <>

            <section id='filter-container'>
                <div id='filter-item'>
                    <label>Brand</label>
                    <Select options={brandOptions} onChange={(val) => setSelectBrand(val.value)}/>
                </div>

                <div id='filter-item'>
                    <label>Category</label>
                    <Select options={categoryOptions} onChange={(val) => setSelectCategory(val.value)}/>
                </div>

                <div id='filter-item'>
                    <label>Product name: </label>
                    <input id='search-input' onChange={data => setText(data.target.value)} value={text}/>
                </div>
            </section>

            <div id='button-container'>
                <Button
                    color='info'
                    onClick={filterHandler}
                    id='filter-button'
                    disabled={!isEnabled}
                >
                    filter
                </Button>

                <Button
                    color='secondary'
                    onClick={resetHandler}
                    id='filter-button'
                >
                    reset
                </Button>
            </div>

            <hr/>

            <main id='home-tab-panel-container'>

                {supplier && products && selectProduct?.map((item, index) => <CardItem key={index}
                                                                                       data={item}
                                                                                       title={item?.name}
                                                                                       image={item.images[0]}
                                                                                       description={item?.description}
                                                                                       price={item?.price}
                                                                                       supplier={supplier.name}
                />)}



            </main>
            {/* toast : important */}
            <ToastContainer/>
        </>
    )
}

export default CompanyPanel;
