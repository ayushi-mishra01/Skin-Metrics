// import React, { useState } from "react";
// import BannerBackground from "./images/i3.jpg";
// import BannerImage from "./images/i2.jpg";
// import { FiArrowRight } from "react-icons/fi";
// import About from "./About";
// import { useNavigate } from "react-router-dom";
// import ImageInput from "../views/imageInput"; 

// const Home = () => {
//   const navigate = useNavigate();
//   const [showImageInput, setShowImageInput] = useState(false);

//   const handleAnalyseNow = () => {
//     setShowImageInput(true);
//   };

//   return (
//     <>
//       <div className="home-container" style={{ marginTop: "1.5%" }}>
//         <div className="home-banner-container">
//           <div className="home-bannerImage-container">
//             <img src={BannerBackground} alt="" />
//           </div>
//           <div className="home-text-section" style={{ marginLeft: "7%" }}>
//             <h1 className="primary-heading">Skin Analysis</h1>
//             <p className="primary-text">
//               Discover your skin's unique needs with our advanced skin analysis tools. We provide detailed insights into your skin type, concerns, and personalized recommendations for achieving healthy, radiant skin.
//             </p>
//             <button className="secondary-button" onClick={handleAnalyseNow}>
//               Analyse Now <FiArrowRight />
//             </button>
//           </div>
//           <div className="home-image-section" style={{ height:"90vh"}}>
//             <img src={BannerImage} alt=""/>
//           </div>
//         </div>
//       </div>
//       <About />
      
//       {/* Conditionally render ImageInput based on showImageInput state */}
//       {showImageInput && <ImageInput />}
//     </>
//   );
// };

// export default Home;


import React from "react";
import BannerBackground from "./images/i3.2.jpg";
import BannerImage from "./images/i29.jpg";
// import BannerImage from "./images/i20.jpg";
import { FiArrowRight } from "react-icons/fi";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="home-container" style={{marginTop:"1.5%"}}>
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img className="img1" src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section" style={{marginLeft:"7%"}}>
          <h1 className="primary-heading">
            Skin Analysis
          </h1>
          <p className="primary-text">
          Discover your skin's unique needs with our advanced skin analysis tools. We provide detailed insights into your skin type, concerns, and personalized recommendations for achieving healthy, radiant skin.
          {/* "Your skin is the fingerprint of what is going on inside your body, and all skin conditions, from psoriasis to acne to aging, are the manifestations of your body's internal needs, including its nutritional needs." — Georgiana Donadio */}
          </p>
          <button className="secondary-button" onClick={()=>{navigate('/img')}}>
            Analyse Now <FiArrowRight />{" "}
          </button>
        </div>
        {/* <div className="home-image-section" style={{marginTop:"-4%"}}>
          <img className="img2" src={BannerImage} alt="" />
        </div> */}

        <div className="home-image-section">
          <div className="img2-container">
            <img className="img2" src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
