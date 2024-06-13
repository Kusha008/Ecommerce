import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header(){
    const cart=useSelector((state)=>state.cart)
}