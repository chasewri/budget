import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav";
import Footer from '../components/footer'

function IndexPage() {
  const [user, setUser] = useState({});

  return (
    <div className="index">
      <Nav />
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-6">
            <span className="letter1">F </span>
            <span className="letter2">D </span>
            <span className="letter3">V </span>
          </h1>
          <p className="jumbo">
            A budgeting app that is actually&nbsp;&nbsp;
            <span className="letter2">
              <i>worth</i>
            </span>
            &nbsp;&nbsp;using
          </p>
          <hr className="hr1" />
          <hr width="75%" className="hr2" />
          <hr width="50%" className="hr3" />
          {user.name ? (
            <Link href="#" className="btn btn-lg button">
              View Your Budget
            </Link>
          ) : (
            <Link href="#" className="btn btn-lg button">
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
      <div className="local-wave1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#F7F7F9"
            fill-opacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,122.7C384,107,480,53,576,74.7C672,96,768,192,864,213.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        {/* here */}
        <img width="100%" src="https://i.imgur.com/ZXWWwvD.png" alt="" />
        <p className="section-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
          qui quam ullam! Rem et nisi numquam repellendus eius quo voluptatibus
          similique soluta vel, praesentium labore, esse in. Dolore, molestias
          porro!
        </p>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FFF"
            fill-opacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,154.7C384,192,480,256,576,277.3C672,299,768,277,864,245.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        {/* <svg className="second-white-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFF" fill-opacity="1" d="M0,256L48,240C96,224,192,192,288,170.7C384,149,480,139,576,165.3C672,192,768,256,864,250.7C960,245,1056,171,1152,144C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;
