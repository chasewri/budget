import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";


import { TimelineMax, Power1 } from "gsap/all";

import Nav from "../../components/nav";
import Footer from "../../components/footer/footer";
import styles from "./signUp.module.scss";
import AuthContext from "../../context/auth-context";

function SignUp() {
  const { login, logout, token, userId } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const history = useHistory();
  const location = useLocation();

  // ---------------- gsap -----------------------
  const thisTl = new TimelineMax({ paused: true });

  const wholePage  = useRef(null)
  const footer = useRef(null)
  const formTl = useRef(null)
  const bigDiv = useRef(null)

  useEffect(() => {
    thisTl
      .from(wholePage.current, 0.9, {
        display: "none",
        autoAlpha: 0,
        delay: 0.7,
        ease: Power1.easeIn,
      })
      .from(bigDiv.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(formTl.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(footer.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      });
 

    thisTl.play();
  },[]);







  // --------------gsap ---------------------------

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitEmail = email.toLowerCase();

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let graphBody = {
      query: `
            query {
                login(email: "${submitEmail}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
        `,
    };
    if (currentPath === "/signup") {
      graphBody = {
        query: `
                mutation {
                    createUser(userInput: {email: "${submitEmail}", password: "${password}"}) {
                        _id
                        email
                    }
                }
            `,
      };
    }

    fetch("http://localhost:3001/api", {
      method: "POST",
      body: JSON.stringify(graphBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Sign Up Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        login(resData.data.login);
        if (currentPath === '/signup') {
          history.push('/login')
          setPassword('')
          setEmail('')
          return
        }
        history.push("/budget");
      })
      .catch((err) => {
        console.log(err);
      });
  };





  return (
    <>
      <Nav />
      <div ref={wholePage} className={styles.main}>
        <div ref={bigDiv}  className="container">
          <h1 >
            {currentPath === "/signup"
              ? "Sign Up for FDV"
              : "Welcome Back, Please Log In!"}
          </h1>
          <form ref={formTl} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Please, enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formActions}>
              <button className="btn btn-large" type="submit">
                {currentPath === "/signup" ? "Submit" : "Log In"}
              </button>
            </div>
          </form>
        </div>
        <div ref={footer}>
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FFF"
            fillOpacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,154.7C384,192,480,256,576,277.3C672,299,768,277,864,245.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div >
      <footer>FDV | You Deserve a Better Budget</footer>
    </div>
    </div>
      </div>
    </>
  );
}

export default SignUp;
