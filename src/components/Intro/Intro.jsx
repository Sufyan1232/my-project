import React, { useContext, useEffect, useState } from "react";
import "./Intro.css";
import Vector1 from "../../img/Vector1.jpg";
import Vector2 from "../../img/Vector2.png";
import men from "../../img/men.png";
import yf from "../../img/yf.png";
import thumbup from "../../img/thumbup.png";
import crown from "../../img/crown.png";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
import Github from "../../img/github.png";
import LinkedIn from "../../img/linkedin.png";
import Instagram from "../../img/instagram.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Post from "../../post/Post";
import { db, auth } from "../../firebase";
import "../../post/Post.css";
import Uname from "../../Uname";
const Intro = () => {
  // Transition
  const transition = { duration: 2, type: "spring" };
  const [posts, setPosts] = useState([]);
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  
 
 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
       if(authUser) {
         //user has logged in..
         console.log(authUser);
         setUser(authUser);
       } else {
         // user has logout
         setUser(null);
       }
     })
 
     return () => {
       unsubscribe();
     }
 
   }, [user, username]);

  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span style={{ color: darkMode ? "white" : "" }}>Hy! I Am</span>
          <span>
          {user?.displayName}
          </span>
        
          <span>
            Frontend Developer with high level of experience in web designing
            and development, producting the Quality work
          </span>
        </div>
        <Link to="contact" smooth={true} spy={true}>
          <button className="button i-button">Hire me</button>
        </Link>
        {/* social icons */}
        <div className="i-icons">
          <img src={Github} width="100px" alt="" />
          <img src={LinkedIn} width="100px" alt="" />
          <img src={Instagram} width="100px" alt="" />
        </div>
      </div>
      {/* right image side */}
      <div className="i-right">
      <img src="" width="500" alt="" />
      <img src={men} width = "600" height="750"alt="" />
        
        {/* "https://s3.amazonaws.com/freestock-prod/450/freestock_145394719.jpg" */}
        <img src="" alt="" />
        {/* animation */}
        <motion.img
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          src=""
          alt=""
        />

        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          <FloatinDiv img={crown} text1="Web" text2="Developer" />
        </motion.div>

        {/* animation */}
        <motion.div
          initial={{ left: "9rem", top: "18rem" }}
          whileInView={{ left: "0rem" }}
          transition={transition}
          className="floating-div"
        >
          {/* floatinDiv mein change hy dark mode ka */}
          <FloatinDiv img={thumbup} text1="Best Design" text2="Award" />
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;
