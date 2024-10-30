import React, {useState} from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  useHistory  
} from "react-router-dom";
 
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
 
import ImageInput from "./views/imageInput";
import Recommendations from './views/Recommendations'
import Form from "./views/Form";
import Result from "./views/Result";
 
// MUI
import CssBaseline from '@mui/material/CssBaseline';
 
function App() {
  const [imageSrc, setImageSrc] = useState(null);
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/img" element={<ImageInput imageSrc={imageSrc} setImageSrc={setImageSrc} />} />
          <Route path="/form" element={<Result imageSrc={imageSrc} setImageSrc={setImageSrc} />} />
          <Route path="/recs" element={<Recommendations />} />
        </Switch>
        {/*<Footer/>*/}
      </Router>
    </>
 
  );
}
 
export default App;

// import React from "react";
// import './App.css'
// import {
//   BrowserRouter as Router,
//   Routes as Switch,
//   Route,
//   useHistory  
// } from "react-router-dom";

// import Home from './Components/Home';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';

// import ImageInput from "./views/imageInput";
// import Recommendations from './views/Recommendations'
// import Form from "./views/Form";
// import Result from "./views/Result";

// // MUI
// import CssBaseline from '@mui/material/CssBaseline';

// function App() {
//   return (
//     <>
//       <CssBaseline />
//       <Router>
//         <Navbar/>
//         <Switch>
//           <Route path="/" element={<Home />} />
//           <Route path="/img" element={<ImageInput />} />
//           <Route path="/form" element={<Result />} />
//           <Route path="/recs" element={<Recommendations />} />
//         </Switch>
//         <Footer/>
//       </Router>
//     </>

//   );
// }

// export default App;
