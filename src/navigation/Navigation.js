import React from "react";
import {
        BrowserRouter,
        Routes,
        Route,
        Link
} from "react-router-dom";


import LoginScreen from '../views/LoginScreen';
import SignupScreen from '../views/SignUpScreen';
import HomeScreen from '../views/HomeScreen';
import CartScreen from '../views/CartScreen';
import ProfileScreen from '../views/ProfileScreen';



function Navigation() {
        return (
                <BrowserRouter>
                        <Routes>
                                <Route path="/profile" element={<ProfileScreen/>}/>
                                <Route path="/cart" element={<CartScreen/>}/>
                                 <Route path="/home" element={<HomeScreen/>} />
                                <Route path="/auth/signup" element={ <SignupScreen/> } />
                                <Route path="/" element={ <LoginScreen />}/>
                        </Routes>
                </BrowserRouter>
        )
}

export default Navigation;
