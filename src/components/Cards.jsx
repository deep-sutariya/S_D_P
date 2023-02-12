import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../components/style/cards.css"
import { UserSelectedResContex } from '../contex/UserSelectedRestaurant';
import { useContext } from 'react';
import { TrayContex } from '../contex/tray_contex';
import axios from 'axios';

const Cards = (props) => {

    const { setSelectedRestaurantMenu,setSelectedRestaurant } = useContext(UserSelectedResContex);

    const { setCartItem } = useContext(TrayContex);

    const navigate = useNavigate();

    const toMenuPage = async (e) =>{
        const SelectedResId = e.target.id;

        const data = await axios.post("/getrestaurent", {
          id: SelectedResId
        });

        console.log(data);
        
        // setting the context values before reaching tp the restaurantmenu page....
        // also initializing the value of cart before reaching the reatuarant menu page.
        setSelectedRestaurant(data?.data);
        setSelectedRestaurantMenu(data?.data?.rmenu);
        const cart = Array(data.data.rmenu.length).fill(0);
        setCartItem(cart);

        localStorage.removeItem("cart")
        navigate("/restaurentmenu");
    }

  return (

      <div className="res_card">
        <div className="res_img">
            <img src={props.rimage} alt={props.rid}/>
        </div>
        <div className="res_details">
          <h2 className='res_heading'>{props.rname.toUpperCase()}</h2>
          <p>{props.raddress}</p>
          <div className='res_btn'><button id={props.rid} onClick={toMenuPage} >VISIT</button></div>
        </div>
      </div>

  )
}

export default Cards