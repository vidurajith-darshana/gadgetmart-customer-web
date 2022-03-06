// ** core
import React, {useState} from 'react';
// ** css
import '../css/views/LoginScreen.css';
// ** external components
import {Button} from 'reactstrap';
import {ToastContainer} from 'react-toastify';
import {showFailedToast, showSuccessToast, showWarningToast} from '../config/showToast';
import {Link} from 'react-router-dom';
import {signUpApiHandler} from "../config/API";
import {emailValidationHandler, passwordValidationHandler} from "../util/validation";
import Loader from "../config/LoaderConfig";

function SignUpScreen() {


    let [state, setState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        retypePassword: '',
    });

    let [isLoading, setIsLoading] = useState(false);

    const isEnabled = (state?.firstName !== '' && state?.lastName !== '' && state?.address !== ''
        && state?.email !== '' && state?.password !== '' && state?.retypePassword !== '' && state?.password === state?.retypePassword);


    const resetStateHandler = () => {
        setState({
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            password: '',
            retypePassword: '',
        });
    }

    const saveHandler = async () => {
        if (isEnabled) {

            if (emailValidationHandler(state?.email)) {
                if (passwordValidationHandler(state?.password)) {

                    setIsLoading(true);
                    // ** API invoke
                    let response = await signUpApiHandler({
                        firstName: state.firstName,
                        lastName: state.lastName,
                        address: state.address,
                        email: state.email,
                        password: state.password
                    });

                    let {code, result} = response.data

                    if (code === '200') {
                        showSuccessToast("Account has been created!");
                        resetStateHandler();
                    } else if (code === '500') {
                        showFailedToast(result);
                    }

                    setIsLoading(false)

                } else {
                    showWarningToast("Password is not valid.(minimum 5 characters including numbers )");
                }
            } else {
                showWarningToast("Email Address is not valid.");
            }

        } else {
            showWarningToast("Required field must not be blank.");
        }
    }


    return (
        <main className='main-auth-container'>

            <img src={require('../assets/logo-b.png')} id='logo'/>

            <div id='form-container'>
                <div>
                    <h2 id='text-login'>Signup</h2>
                </div>

                <hr id='hr'/>

                {/* input  */}
                <label id='form-label'>first name</label>
                <input
                    className='input-regular'
                    placeholder=''
                    value={state?.firstName}
                    onChange={(val) => {
                        setState({
                            ...state,
                            firstName: val?.target?.value
                        })
                    }}
                />

                {/* input  */}
                <label id='form-label'>last name</label>
                <input
                    className='input-regular'
                    placeholder=''
                    value={state?.lastName}
                    onChange={(val) => {
                        setState({
                            ...state,
                            lastName: val?.target?.value
                        })
                    }}
                />

                {/* input  */}
                <label id='form-label'>address</label>
                <input
                    className='input-regular'
                    placeholder=''
                    type="text"
                    value={state?.address}
                    onChange={(val) => {
                        setState({
                            ...state,
                            address: val?.target?.value
                        })
                    }}
                />

                {/* input  */}
                <label id='form-label'>e-mail address</label>
                <input
                    className='input-regular'
                    placeholder=''
                    value={state?.email}
                    onChange={(val) => {
                        setState({
                            ...state,
                            email: val?.target?.value
                        })
                    }}
                />


                {/* input  */}
                <label id='form-label'>password</label>
                <input
                    className='input-regular'
                    placeholder=''
                    type='password'
                    value={state?.password}
                    onChange={(val) => {
                        setState({
                            ...state,
                            password: val?.target?.value
                        })
                    }}
                />

                {/* input  */}
                <label id='form-label'>retype password</label>
                <input
                    className='input-regular'
                    placeholder=''
                    type='password'
                    value={state?.retypePassword}
                    onChange={(val) => {
                        setState({
                            ...state,
                            retypePassword: val?.target?.value
                        })
                    }}
                />

                {/* button container */}
                <div id='button-login-container'>
                    <Button
                        color="primary"
                        id='button-login'
                        disabled={!isEnabled}
                        onClick={saveHandler}
                    >
                        create account
                    </Button>

                    {/*<label id='warning-text'>*/}
                    {/*    <b>WARNING: </b>*/}
                    {/*    Example@gmail.com is not a valid email address.</label>*/}
                </div>


            </div>


            <footer id='footer-container'>
                <h3 id='footer-text'>Already have an account?</h3>
                <Link to='/'>
                    <h3 id='footer-link'>login</h3>
                </Link>
            </footer>

            <Loader isLoading={isLoading} />
            {/* toast : important */}
            <ToastContainer/>
        </main>
    )
}

export default SignUpScreen;
