import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";
import '../components/style/allmenu.css'
import axios from "axios";
import { LoginDetails } from "../contex/Logincontex";
import BounceLoader from "react-spinners/BounceLoader";

const AllMenu = () => {

  const {loginrestaurant ,setloginrestaurant} = useContext(LoginDetails);
  const [Restaurant, setRestaurant] = useState({});
  const [RestaurantMenu, setRestaurantMenu] = useState([]);

  let [loading, setLoading] = useState(true);

  const getData =  async() => {
    setLoading(true);
    const data = await axios.post("/getrestaurent",{
      id: localStorage.getItem("restaurantId")
    });
    setRestaurantMenu(data.data.rmenu);
    setRestaurant(data.data);
    setLoading(false);
  }

  const [addmenu, setaddmenu] = useState({
    name:"",
    des:"",
    price:"",
    type:"",
  });


  let name , value;
  const updateMenu = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setaddmenu({...addmenu, [name] : value});
  }

  const errmag = document.getElementById('addmenuerror');

  const saveMenu = async () =>{
    
    if(addmenu.price && addmenu.des && addmenu.name && addmenu.type){
     
      const data = await axios.post("/addmenu", {
        resid: Restaurant._id.toString(),
        iname: addmenu.name,
        iprice: addmenu.price,
        ides: addmenu.des
      })

      setRestaurantMenu({...RestaurantMenu,addmenu});
      console.log(RestaurantMenu);
      console.log(data.data.data);
    }

    else{
      errmag.innerText = "Error! : *** Fill All Details ***";
      errmag.style = 'color:red;';
    }
  }

  useEffect(() => {
    getData();
  },[]); 

  return (

    <>
      <div className="res_menus">

        <div className="addbutton">
          <a className="modify_button addmenu" href="#addmenuitem">Add Menu +</a>
        </div>

        {/* Add Menu Pop-up */}

        <div id="addmenuitem" className="overlay">

          <div className="popup">
            <h2>"Add Menu Item</h2>
            <a className="close" href="#">
              &times;
            </a>
            <hr />
            <div className="popup_info">
              <label>Item Name:</label>
              <input type="text" placeholder="Menu Item name" name="name" value={addmenu.name} onChange={updateMenu} />
              <label>Price:</label>
              <input type="number" placeholder="Menu Item Price" name="price" value={addmenu.price} onChange={updateMenu} />
              <label>Description:</label>
              <input type="textarea" placeholder="Description" name="des" value={addmenu.des} onChange={updateMenu} />
              <label>Type:</label>
              <input type="textarea" placeholder="Type" name="type" value={addmenu.type} onChange={updateMenu} />
              <span id="addmenuerror"></span>
            </div>
            <a className="popup_btn save" style={{margin:"7px 0px"}} href="" onClick={saveMenu}>Save</a>
          </div>

        </div>
          {(loading) ? <div className="loader"><BounceLoader
                        size={50}
                        color="black"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div>: 
          <div className="menublock">
                {   (RestaurantMenu && Object.keys(RestaurantMenu).length > 0) && RestaurantMenu.map(({ _id, name, des, price, type }, index) => {
                  
                    return (<ResMenuCard key={index} id={_id} index={index} name={name} price={price} des={des} type={type} />)
                  })
                }
          </div>}
      </div>
    </>
  );
};

export default AllMenu;