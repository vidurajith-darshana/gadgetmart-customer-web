// ** core
import React, {useState} from 'react';
// ** css
import '../../css/components/Home/CardItem.css';
// ** external components
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {addToCartAction} from "../../redux/actions/cartAction";


function CardItem({
                      data = null,
                      title = "title not available",
                      image = null,
                      price = 'Price not available',
                      description = "description not available",
                      supplier= ''
                  }) {

    let IMAGE = image ? image : require('../../assets/sample-f1.jpg');

    const dispatch = useDispatch();
    let [isModalOpen, setIsModalOpen] = useState(false);
    let cart = useSelector(state => state.cartState.cart);

    const addToCartHandler = (supplierName) => {
        setIsModalOpen(false);

        let temp = [];
        if (cart !=null) {
            temp = [...cart];
        }

        let modData = {...data}
        modData.supplier = supplierName;

        let filter = temp.filter(item => !(item.name === title) ); // unique obj data
        let filterRemove = temp.filter(item => (item.name === title) );

        if (filterRemove.length > 0) {
            filterRemove[0].count += 1
            filter.push(filterRemove[0]);
        } else {
            modData.count = 1
            filter.push(modData);
        }

        // console.log(supplierName)
        // console.log(filter)

        dispatch(addToCartAction(filter));

    }


    return (
        <section id='card-item-container'>
            <img src={IMAGE} id='card-item-image'/>

            <h5 id='card-item-title'>{title.length < 58 ? title : (title.substring(0, 58) + '... ')} {" [" + data?.brand + ']'}</h5>
            <div id='price-container'>
                <h6 id='card-item-price'>LKR. {price}</h6>
                <h6 id='card-item-price'>{data?.category}</h6>
            </div>
            <h6 id='card-item-description'>{description.length < 63 ? description : (description.substring(0, 150) + '...')}</h6>

            <Button
                color='info'
                id=''
                onClick={() => setIsModalOpen(true)}
            >
                Add to cart
            </Button>


            <div>
                <Modal
                    backdrop={false}
                    // centered
                    scrollable
                    size="sm"
                    // toggle={function noRefCheck(){}}
                    isOpen={isModalOpen}

                >
                    <ModalHeader style={{backgroundColor: '#28C76F'}} toggle={() => setIsModalOpen(false)}>
                        {title && title}
                    </ModalHeader>
                    <ModalBody>
                        <img src={IMAGE} id='card-item-image'/>
                        <h6 id='card-item-price'>brand: {data?.brand}</h6>
                        <h6 id='card-item-price'>category: {data?.category}</h6>
                        <h6 id='card-item-price'>price: LKR. {price}</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => addToCartHandler(supplier)}
                        >
                            Yes, add to cart
                        </Button>
                        {' '}
                        <Button onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>


        </section>
    )
}

export default CardItem;
