import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <div>
    <Box
      sx={{
        // py: 2,
        // px: 4,
        // mt: "auto",
        // backgroundColor: "#f5f5f5",
        // textAlign: "center",
        py: 2,
        px: 4,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "6%"
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Skin Expert. All rights reserved.
      </Typography>
    </Box>
    </div>
  );
}

export default Footer;


// import React from "react";
// import Logo from "../Assets/Logo.svg";
// import { BsTwitter } from "react-icons/bs";
// import { SiLinkedin } from "react-icons/si";
// import { BsYoutube } from "react-icons/bs";
// import { FaFacebookF } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <div className="footer-wrapper">
//       <div className="footer-section-one">
//         <div className="footer-logo-container">
//           {/* <img src={Logo} alt="" /> */}
//         </div>
//         <div className="footer-icons">
//           <BsTwitter />
//           <SiLinkedin />
//           <BsYoutube />
//           <FaFacebookF />
//         </div>
//       </div>
//       <div className="footer-section-two">
//         <div className="footer-section-columns">
//           <span>Qualtiy</span>
//           <span>Help</span>
//           <span>Share</span>
//           <span>Carrers</span>
//           <span>Testimonials</span>
//           <span>Work</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>244-5333-7783</span>
//           <span>hello@food.com</span>
//           <span>press@food.com</span>
//           <span>contact@food.com</span>
//         </div>
//         <div className="footer-section-columns">
//           <span>Terms & Conditions</span>
//           <span>Privacy Policy</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
