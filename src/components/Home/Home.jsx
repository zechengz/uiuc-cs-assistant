import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import styles from './Home.scss';
import Button from 'material-ui/Button';
import $ from "jquery";

class Home extends Component {

    componentDidMount() {
//        var w = window.innerWidth;
//        var h = window.innerHeight;
//        var wawa1 = document.getElementById("down1");
//        wawa1.addEventListener("click", function() {
//            var curr = window.pageYOffset;
//            if(curr < h) {
//                var dis = h-curr;
//                function step() {
//                    if(dis > 0 && dis >= 30) {
//                        dis -= 30;
//                        window.scrollTo(0,curr + 30);
//                        curr += 30;
//                        window.requestAnimationFrame(step);
//                    }
//                    else if(dis > 0 && dis < 30) {
//                        window.scrollTo(0,curr + dis);
//                    }
//                }
//                window.requestAnimationFrame(step);
//            }
//        });
//
//        var wawa2 = document.getElementById("down2");
//        wawa2.addEventListener("click", function() {
//            var curr = window.pageYOffset;
//            if(curr < 2*h) {
//                var dis = 2*h-curr;
//                function step() {
//                    if(dis > 0 && dis >= 30) {
//                        dis -= 30;
//                        window.scrollTo(0,curr + 30);
//                        curr += 30;
//                        window.requestAnimationFrame(step);
//                    }
//                    else if(dis > 0 && dis < 30) {
//                        window.scrollTo(0,curr + dis);
//                    }
//                }
//                window.requestAnimationFrame(step);
//            }
//        });
//
//        var wawa3 = document.getElementById("down3");
//        wawa3.addEventListener("click", function() {
//            var curr = window.pageYOffset;
//            if(curr < 3*h) {
//                var dis = 3*h-curr;
//                function step() {
//                    if(dis > 0 && dis >= 30) {
//                        dis -= 30;
//                        window.scrollTo(0,curr + 30);
//                        curr += 30;
//                        window.requestAnimationFrame(step);
//                    }
//                    else if(dis > 0 && dis < 30) {
//                        window.scrollTo(0,curr + dis);
//                    }
//                }
//                window.requestAnimationFrame(step);
//            }
//        });
      $("#down1").click(function() {
        $('html, body').animate({
          scrollTop: $(".container2").offset().top
        }, 500);
      });
      $("#down2").click(function() {
        $('html, body').animate({
          scrollTop: $(".container3").offset().top
        }, 500);
      });
      $("#down3").click(function() {
        $('html, body').animate({
          scrollTop: $(".container4").offset().top
        }, 500);
      });
    }

    render() {
        return(
            <div className="Home">
                <Button href='/login' raised color="accent" className="LoginButton">
                  Register/Login
                </Button>
                <div className="container1">
                    <div id="img1"></div>
                    <div className="front">
                        Different CS Tracks?
                    </div>
                    <div className="back">
                        Which Class of UIUC CS?
                    </div>
                    <div id="down1">
                    </div>
                </div>
                <div className="container2">
                    <div id="img2"></div>
                    <div className="front">
                        <div>Icon for "Hot" Class</div>
                    </div>
                    <div className="back">
                        Which Field Is the Hottest
                    </div>
                    <div id="down2">
                    </div>
                </div>
                <div className="container3">
                    <div id="img3"></div>
                    <div className="front">
                        <div>GPA for Classes</div>
                    </div>
                    <div className="back">

                    </div>
                    <div id="down3">
                    </div>
                </div>
                <div className="container4">
                    <div id="img4"></div>
                    <div className="front">
                        Search Classes
                    </div>
                    <div className="back">
                        Classes Button Search Fields
                    </div>
                    <Button href='/register' id="startButton" raised color="accent">
                        Get Started!
                    </Button>
                </div>
            </div>
        )
    }
}

export default Home
