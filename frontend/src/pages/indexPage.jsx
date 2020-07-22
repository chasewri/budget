import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ScrollMagic from "scrollmagic";
import { TimelineMax, Power1, TweenLite, Linear } from "gsap/all";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

import Nav from "../components/nav";
import AuthContext from "../context/auth-context";

function IndexPage() {
  ScrollMagicPluginGsap(ScrollMagic,TweenLite, TimelineMax);
  gsap.registerPlugin(CSSPlugin);
  const { token } = useContext(AuthContext);
  const history = useHistory();

  // --------------------- gsap ----------------------------
  const timeline = new TimelineMax({ paused: true });

  const header = useRef(null);
  const jumbo = useRef(null);
  const buttonTl = useRef(null);
  const footer = useRef(null);
  const svgContent = useRef(null);
  const f = useRef(null);
  const d = useRef(null);
  const v = useRef(null);

  // other effect
  //  --------- zoom in with scrollmagic -----------------------

  useEffect(() => {
    TweenLite.defaultEase = Linear.easeNone;
    const controller = new ScrollMagic.Controller();
    const tl = new TimelineMax();

    tl.staggerFrom(".content", 0.5, {
      scale: 0,
      cycle: {
        y: [-50, 50],
      },
      stagger: {
        from: "center",
        amount: 0.5,
      },
    });

    new ScrollMagic.Scene({
      triggerElement: "#scene",
      duration: "70%",
      triggerHook: 0.5,
    })
      .setTween(tl)
      .addTo(controller);
  }, []);
  // ---------------------------
// fade in gsap -------------------------------------------------
  useEffect(() => {
    timeline
      .from(header.current, 0.8, {
        display: "none",
        autoAlpha: 0,
        delay: 0.25,
        ease: Power1.easeIn,
      })
      .from(jumbo.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(f.current, 0.4, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(d.current, 0.4, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(v.current, 0.4, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(buttonTl.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(svgContent.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      })
      .from(footer.current, 0.7, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut,
      });

    timeline.play();
  }, []);

  const changePage = (e, destination) => {
    e.preventDefault();
    timeline.reverse();
    const timelineDuration = timeline.duration() * 1000;
    setTimeout(() => {
      history.push(destination);
    }, timelineDuration);
  };

  return (
    <>
      <div ref={header} className="index">
        {/* nav -------------------------------------------------------------- */}
        <Nav timeline={timeline} changePage={changePage} />
        {/* nav --------------------------------------------------------------------- */}
        {/* jumbotron ------------------------------------------------------- */}
        <div ref={jumbo} className="jumbotron jumbotron-fluid">
          <div className="container-fluid">
            <h1 className="display-6">
              <span ref={f} className="letter1">
                F{" "}
              </span>
              <span ref={d} className="letter2">
                D{" "}
              </span>
              <span ref={v} className="letter3">
                V{" "}
              </span>
            </h1>

            <p className="jumbo">
              A budgeting app that is actually&nbsp;&nbsp;
              <span className="letter2">
                <i>worth</i>
              </span>
              &nbsp;&nbsp;using&nbsp;<i className="fas fa-exclamation"></i>
            </p>
            <div ref={buttonTl}>
              <hr className="hr1" />
              <hr width="75%" className="hr2" />
              <hr width="50%" className="hr3" />
              {token ? (
                <Link to="/budget" className="btn btn-lg button">
                  View Your Budget
                </Link>
              ) : (
                <button
                  onClick={(e) => changePage(e, "/login")}
                  className="btn btn-lg button"
                >
                  Log In Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* jumbotron end -------------------------------------------- */}
        <div ref={svgContent} className="local-wave1">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#F7F7F9"
              fillOpacity="1"
              d="M0,96L48,85.3C96,75,192,53,288,80C384,107,480,181,576,202.7C672,224,768,192,864,165.3C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          {/* here */}
          {/* content div --------------------------------------------------- */}
          <div className="container" id="scene">
            <img
              className="content"
              width="100%"
              src="https://i.imgur.com/ZXWWwvD.png"
              alt="money"
            />
            <p className="section-text content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates qui quam ullam! Rem et nisi numquam repellendus eius
              quo voluptatibus similique soluta vel, praesentium labore, esse
              in. Dolore, molestias porro!
            </p>
          </div>
          {/* end content div -------------------------------------------- */}
          {/* footer --------------------------------------------------- */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#FFF"
              fillOpacity="1"
              d="M0,96L48,101.3C96,107,192,117,288,154.7C384,192,480,256,576,277.3C672,299,768,277,864,245.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div ref={footer}>
        <footer>FDV | You Deserve a Better Budget</footer>
      </div>
    </>
  );
}

export default IndexPage;
