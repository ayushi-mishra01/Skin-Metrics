import React from "react";
import AboutBackground from "./images/i3.jpg";
import AboutBackgroundImage from "./images/i5.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container" style={{marginTop:"-8%"}}>
      {/* <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div> */}
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt=""/>
      </div>
      <div className="about-section-text-container" style={{backgroundColor:"#f0f0f0", marginLeft:"-10%"}}>
        {/* <p className="primary-subheading" style={{ marginLeft:"10%"}}></p> */}
        <h1 className="primary-heading" style={{ marginLeft:"5%"}}>
        Skincare is essential, makeup is a choice.
        </h1>
        <p className="primary-text" style={{ marginLeft:"5%"}}>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <p className="primary-text" style={{ marginLeft:"5%"}}>
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
