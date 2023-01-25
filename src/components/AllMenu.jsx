import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ResMenuCard from "./ResMenuCard";

const AllMenu = () => {
  const [Restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setRestaurant(data.rmenu);
    console.log(data.rmenu);
  }, []);

  return (
    <div className="res_menus">

      {
        Object.keys(Restaurant).length > 0 &&
        Restaurant.map(({ _id, name, des, price }) => {
          return (<ResMenuCard key={_id} name={name} price={price} des={des} />)
        })
      }

    </div>
  );
};

export default AllMenu;
