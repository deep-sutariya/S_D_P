




import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../components/style/cards.css"
import { UserSelectedResContex } from '../contex/UserSelectedRestaurant';
import { useContext } from 'react';
import { TrayContex } from '../contex/tray_contex';
import axios from 'axios';

const Cards = (props) => {

    const { setSelectedRestaurantMenu,setSelectedRestaurant ,SelectedRestaurant,SelectedRestaurantMenu} = useContext(UserSelectedResContex);

    const { setCartItem ,cartItem } = useContext(TrayContex);

    const navigate = useNavigate();

    const toMenuPage = async (e) =>{
        const SelectedResId = e.target.id;

        const data = await axios.post("/getrestaurent", {
          id: SelectedResId
        });
        sessionStorage.setItem("selectedrestaurent",data?.data?.selectedrestaurenttoken);
        // setting the context values before reaching tp the restaurantmenu page....
        // also initializing the value of cart before reaching the reatuarant menu page.
        setSelectedRestaurant(data?.data?.data);
        setSelectedRestaurantMenu(data?.data?.data?.rmenu);
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
          <h2 style={{fontWeight: "bolder"}}>{props.rating + " ⭐"}</h2>
          <div className='res_btn'><button id={props.rid} onClick={toMenuPage} >VISIT</button></div>
        </div>
      </div>

  )
}

export default Cards