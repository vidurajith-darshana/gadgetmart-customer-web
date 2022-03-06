import axios from "axios";
import {
    baseURL,
    createOrderURL, getOrderByUserEmailURL,
    getProductsURL,
    getSuppliersURL,
    getUserURL,
    loginURL,
    signUpURL,
    updateUserURL
} from "./urlConfig";
import {showFailedToast, showSuccessToast} from "./showToast";

// ** AUTH
export const signInApiHandler =  async ({email, password}) => {
    let url = baseURL + loginURL
    try {
        let response = await axios.post(url, {
            email: email,
            password: password
        });

        return response;
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}

export const signUpApiHandler = async ({firstName, lastName, address, email, password }) => {
    let url = baseURL + signUpURL;
    try {
        let response = await axios.post(url, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            password: password
        });

        return response;

    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}

export const updateUserApiHandler =  async ({firstName, lastName, address, email }) => {
    let url = baseURL + updateUserURL;

    try {
        let token = await localStorage.getItem('token');
        let response = await axios.post(url, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            address: address,
        },
            { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} });

        let {code, result} = response.data

        if (code === '200') {
            showSuccessToast("Account has been updated!")
        } else if (code === '500') {
            showFailedToast(result)
        }
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}

export const getUserApiHandler =  async (email) => {
    let url = baseURL + getUserURL + email;
    try {
        let token = await localStorage.getItem('token');
        let response = await axios.get(url, { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} });
        return response;
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}




// ** COMPANY
export const getSupplierApiHandler = async () => {
    let url = baseURL + getSuppliersURL;
    try {
        let token = await localStorage.getItem('token');

        let response = await axios.get(url,  { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} });
        return response;
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}


export const getAllProductApiHandler = async () => {
    let url = baseURL + getProductsURL;
    try {
        let token = await localStorage.getItem('token');
        let response = await axios.get(url,  { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} });
        return response;
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}


// ** ORDER
export const createOrderApiHandler = async ({userDto, totalPrice, shops, details }) => {
    let url = baseURL + createOrderURL;
    try {
        let token = await localStorage.getItem('token');
        let response = await axios.post(url, {
            userDto: userDto,
            totalPrice: totalPrice,
            shops: shops,
            details: details,
        },
         { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} } );

        return response;

    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}


export const getOrderByUserEmailApiHandler = async (email) => {
    // let url = baseURL + getOrderByUserEmailURL + "vidu996@gmail.com";
    let url = baseURL + getOrderByUserEmailURL + email;
    try {
        let token = await localStorage.getItem('token');
        let response = await axios.get(url,  { headers: {"Authorization" : `Bearer ${JSON.parse(token)}`} });
        return response;
    } catch (e) {
        console.warn(e);
        showFailedToast("Internal Server Error - code [500]");
    }
}


// ** ADMIN
