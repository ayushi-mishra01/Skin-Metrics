import React, { useState }  from 'react';
import WebcamResult from './Components/webCamResult';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid, Button } from '@mui/material';
import bgImg from './Components/img/bgBlue2.webp'
 
const Result=({ imageSrc, setImageSrc})=>{
    const navigate= useNavigate();
 
    return (
        // <div style={{backgroundImage:`url(${bgImg})`}}>
        <div> 
            <div className="container">
                <div className="left-half">
                <Grid item xs={2} style={{marginBottom: "0%"}}>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => navigate(`/img`)}
                        // sx={{ mt: 3 }}
                    >
                        Back
                    </Button> */}
                </Grid>
                <div className='captured-image'>
                    <WebcamResult imageSrc={imageSrc} setImageSrc={setImageSrc} />
                </div>
                </div>
                <div className="right-half">
                    <Form/>
                </div>
            </div>
        </div>
    )
}
 
export default Result;

// import React from 'react';
// import Webcam from 'react-webcam';
// import Form from './Form';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import {Grid, Button } from '@mui/material';

// const Result=()=>{
//     const navigate= useNavigate();

//     return (
//         <div>
//             <div className="container">
//                 <div className="left-half">
//                 <Grid item xs={2} style={{marginBottom: "2%"}}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         onClick={() => navigate(`/img`)}
//                         // sx={{ mt: 3 }}
//                     >
//                         Back
//                     </Button>
//                 </Grid>
//                     <Webcam/>
//                 </div>
//                 <div className="right-half">
//                     <Form/>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Result;