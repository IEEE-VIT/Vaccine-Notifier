import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import UserNavbar from "./components/Dashboard/UserNavbar.js";
import How from "./components/Dashboard/How";
import Card from "./components/Login/Card";
import Form from "./components/Register/Form";
// import { getUid } from "./services/firebase";

import axios from "axios";

import "./Dashboard.css";

export default function Dashboard() {
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [mail, setMail] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const uid = cookie.load("key");
    if (uid === null) {
      console.log("uid is null");
      //   return (window.location.href = "/");
    }
    const headers = { Authorization: uid };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get`, { headers })
      .then((response) => {
        console.log(response, "hereeee");
        if (!response.data.user_exists) {
            return (window.location.href = "/");
        } else if (response.data.data.age !== 0) {
          let data = response.data.data;
		  console.log(data);
          setMail(data.email);
          setDistrict(data.district);
          setAge(data.age);
        }
      })
      .catch((error) => {
        console.log(error.message);
        window.location.href = "/";
      });
  };

  return (
    <>
      <UserNavbar />
      <div className="bg2">
        <div className="container col-lg-6 col-xs-12 col-md-6 ">
          <div className="name">
            <h3>Fill in your details here!</h3>
          </div>
          <div className="maild">
            <h5>{mail} is here</h5>
          </div>
          <div className="form">
            <Form district={district} age={age} />
          </div>
          <div>
            <How />
          </div>
          <div className="bug">
            <button className="privacy white">Report a bug</button>
            <button className="privacy white">Privacy Policy</button>
          </div>
        </div>
      </div>
      <div
        className="container col-lg-12 col-xs-12 col-md-12 "
        id="otherresources"
      >
        <div className="web">
          <h6>
            <center>
              A curated list of websites that are actively helping all of us in
              this fight against the pandemic.
            </center>
          </h6>
        </div>
        <div className="row">
          <Card />
          <Card />
        </div>
        <div className="row">
          <Card />
          <Card />
        </div>
        <div className="row">
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
