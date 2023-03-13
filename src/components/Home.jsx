import React from 'react'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Types from '../components/Types';
import Cards from '../components/Cards';
import BounceLoader from "react-spinners/BounceLoader";
import '../components/style/home.css'
import "../components/style/cards.css"


function Home({ setNavType }) {

    useEffect(() => {
        setNavType("user");
    }, [])


    const [restaurents, setRestaurents] = useState([]);
    const [filteredRes, setfilteredRes] = useState([]);
    let [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        const data = await axios.post("/res");
        setRestaurents(data.data);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    // useEffect(() => {
    //     console.log(filteredRes)
    // }, [filteredRes]);

    let pincode;
    const search = async () => {
        pincode = document.getElementById('searchid').value;
        if (pincode === "") setfilteredRes([]);
        else if (pincode.length === 6) {
            const data = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

            if (data?.data[0].Status === "Success") {

                setfilteredRes(restaurents?.filter(resData => {
                    console.log(resData.rcity.toLowerCase());
                    return (
                        // resData.rcity.toLowerCase() === data?.data[0].PostOffice[0].District.toLowerCase()
                        // ||
                        resData.rcity.toLowerCase() === data?.data[0].PostOffice[0].Block.toLowerCase()
                        ||
                        resData.rpincode === data?.data[0].PostOffice[0].Pincode
                    )
                })
                )
            }
            else {
                document.getElementById('searchid').value = "";
                setfilteredRes([]);
                alert('Enter Valid Pincode');
            }

        } else {
            document.getElementById('searchid').value = "";
            setfilteredRes([]);
            alert('Enter Valid Pincode');
        }
    }


    const enterHandle = (e) => {
        if (e.key == 'Enter') {
            search();
        }
    }

    return (
        <>

            {/* <h1 style={{textAlign : "center",margin: "40px 0px"}}>Categories</h1>
        <Types /> */}

            <div className="search_box">
                <input className="search_input" type="text" placeholder="PinCode..." id='searchid' onKeyDown={enterHandle} />
                <button className="search_button" onClick={search}>
                    <i className="fas fa-search"></i>
                </button>
            </div>

            <h1 style={{ textAlign: "center", margin: "50px 0px", textDecoration: "underline" }}>Restaurants</h1>
            {loading ? <div className="loader"><BounceLoader
                size={50}
                color="black"
                aria-label="Loading Spinner"
                data-testid="loader"
            /> </div> : <div className="all_cards">
                {
                    filteredRes.length > 0 ?
                        filteredRes.map(({ _id, rname, raddress, rimage, rating, ratingcount }) => (
                            <div key={_id}><Cards
                                rimage={rimage}
                                rname={rname}
                                raddress={raddress}
                                rid={_id}
                                rating={rating}
                                ratingCount={ratingcount}
                                /></div>
                                ))

                        :

                        Object.keys(restaurents).length > 0 &&
                        restaurents.map(({ _id, rname, raddress, rimage, rating, ratingcount }) => (
                            <div key={_id}><Cards
                            rimage={rimage}
                            rname={rname}
                                raddress={raddress}
                                rid={_id}
                                rating={rating}
                                ratingCount={ratingcount}
                                /></div>
                        ))
                }
            </div>}

        </>
    )
}

export default Home