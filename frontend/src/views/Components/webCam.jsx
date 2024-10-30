import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import img1 from "./img/img1.jpg";
import img3 from "./img/img3.jpg";
// import img2 from "./img/img2.jpg";
// import img4 from "./img/img4.jpg";
// import image2 from "./image2.avif";
// import image4 from "./image4.jpg";
 
 
// MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
 
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
 
const aspectRatio = 4 / 3;
const thresholdPercentFace = 0.3;
const thresholdFaceScore = 0.7;
 
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
 
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
 
    return windowDimensions;
}
 
const WebcamCapture = ({ imageSrc, setImageSrc, setOnPlay, onPlay }) => {
    const navigate = useNavigate();
    let { width: windowWidth, height: windowHeight } = useWindowDimensions();
    let camHeight = windowHeight * 0.7;
    let camWidth = camHeight * aspectRatio;  
 
    if (camWidth > windowWidth) {
        camWidth = windowWidth * 0.9;  
        camHeight = camWidth / aspectRatio;  
    }
    const videoConstraints = {
        height: camHeight,
        width: camWidth,
        facingMode: "user"
    };
 
    // useEffect( () =>
    //     {
    //         console.log(videoConstraints.height)
    //         console.log(videoConstraints.width)
    //     }, [videoConstraints.height, videoConstraints.width]
    // )
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            setImageSrc(imageSrc)
        }, [webcamRef]
    );
 
    const [initialising, setInitialising] = useState(false)
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URI = process.env.PUBLIC_URL + '/models';
            setInitialising(true)
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
                // faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
                // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
                // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URI),
            ]).then(() => { console.log("models imported") });
        }
        loadModels();
    }, [])
 
 
 
    const [faceOK, setFaceOK] = useState(null)
    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (initialising) {
                setInitialising(false)
            }
            let detections = []
            if(webcamRef.current !== null)
                detections = await faceapi.detectAllFaces(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions());
            if (detections.length > 1) {
                // Multiple faces
                setFaceOK("Multiple faces detected")
            }
            else if (detections[0] !== undefined) {
                // One face
                const boxArea = Math.round(detections[0].box.height) * Math.round(detections[0].box.width)
                const ImageArea = detections[0].imageWidth * detections[0].imageHeight
                const percentFace = boxArea / ImageArea
 
                if (percentFace < thresholdPercentFace) {
                    // Not close enough
                    setFaceOK("Come closer")
                } else if (detections[0].score < thresholdFaceScore) {
                    // detected face score is low
                    setFaceOK("Blurry or Not enough lighting")
                } else {
                    // all conditions satisfied
                    setFaceOK("OK")
                }
            }
            else {
                // No face
                setFaceOK("no face detected")
            }
        }, 500)
    }
 
    const handleRecapture = () => {
        setImageSrc(null);
        navigate('/img', { state: { setImageSrc } });
    };
 
 
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <div className="camera-container">
            {imageSrc ? (
                <div style={{ marginTop: "0px", paddingTop: "0px" }}>
                    <img src={imageSrc} alt="Captured" />
                    <div className="webcam-recapture-button">
                        <button
                            onClick={handleRecapture}
                            className="capture-button re"
                        >
                            Recapture
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="webcam-img">
                        <div className="webcam-instructions">
                            {initialising ? "Initialising..." : faceOK}
                        </div>
                        <Webcam
                            id="webcam"
                            audio={false}
                            height={videoConstraints.height}
                            width={videoConstraints.width}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={handleVideoOnPlay} />
                    </div>
                    <div className="webcam-button">
                        <button
                            onClick={capture}
                            disabled={(initialising) || (faceOK !== "OK")}
                            className="capture-button"
                        >
                            Capture photo
                        </button>
                    </div>
                </>
            )}
        </div>
        <div className="image-container">
                <img src={img1} alt="bg-image" className="image2" />
                <img src={img3} alt="overlay-image" className="image3" />
        </div>
        {/* <div className="image-container">
          <img src={image1} alt="bg-image" />
        </div> */}
        </div>
        </>
    );
};
 
export default WebcamCapture

// import React, { useRef, useCallback, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from 'face-api.js';
// import { useNavigate } from 'react-router-dom';
 
// // MUI
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
 
// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//         width,
//         height
//     };
// }
 
// const aspectRatio = 4 / 3;
// const thresholdPercentFace = 0.3;
// const thresholdFaceScore = 0.7;
 
// function useWindowDimensions() {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
 
//     useEffect(() => {
//         function handleResize() {
//             setWindowDimensions(getWindowDimensions());
//         }
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
 
//     return windowDimensions;
// }
 
// const WebcamCapture = ({ imageSrc, setImageSrc, setOnPlay, onPlay }) => {
//     const navigate = useNavigate();
//     let { width: windowWidth, height: windowHeight } = useWindowDimensions();
//     let camHeight = windowHeight * 0.7;
//     let camWidth = camHeight * aspectRatio;  
 
//     if (camWidth > windowWidth) {
//         camWidth = windowWidth * 0.9;  
//         camHeight = camWidth / aspectRatio;  
//     }
//     const videoConstraints = {
//         height: camHeight,
//         width: camWidth,
//         facingMode: "user"
//     };
 
//     // useEffect( () =>
//     //     {
//     //         console.log(videoConstraints.height)
//     //         console.log(videoConstraints.width)
//     //     }, [videoConstraints.height, videoConstraints.width]
//     // )
//     const webcamRef = useRef(null);
//     const capture = useCallback(
//         () => {
//             const imageSrc = webcamRef.current.getScreenshot();
//             console.log(imageSrc)
//             setImageSrc(imageSrc)
//         }, [webcamRef]
//     );
 
//     const [initialising, setInitialising] = useState(false)
//     useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URI = process.env.PUBLIC_URL + '/models';
//             setInitialising(true)
//             Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
//                 // faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
//                 // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
//                 // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URI),
//             ]).then(() => { console.log("models imported") });
//         }
//         loadModels();
//     }, [])
 
 
 
//     const [faceOK, setFaceOK] = useState(null)
//     const handleVideoOnPlay = () => {
//         setInterval(async () => {
//             if (initialising) {
//                 setInitialising(false)
//             }
//             let detections = []
//             if(webcamRef.current !== null)
//                 detections = await faceapi.detectAllFaces(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions());
//             if (detections.length > 1) {
//                 // Multiple faces
//                 setFaceOK("Multiple faces detected")
//             }
//             else if (detections[0] !== undefined) {
//                 // One face
//                 const boxArea = Math.round(detections[0].box.height) * Math.round(detections[0].box.width)
//                 const ImageArea = detections[0].imageWidth * detections[0].imageHeight
//                 const percentFace = boxArea / ImageArea
 
//                 if (percentFace < thresholdPercentFace) {
//                     // Not close enough
//                     setFaceOK("Come closer")
//                 } else if (detections[0].score < thresholdFaceScore) {
//                     // detected face score is low
//                     setFaceOK("Blurry or Not enough lighting")
//                 } else {
//                     // all conditions satisfied
//                     setFaceOK("OK")
//                 }
//             }
//             else {
//                 // No face
//                 setFaceOK("no face detected")
//             }
//         }, 500)
//     }
 
//     const handleRecapture = () => {
//         setImageSrc(null);
//         navigate('/img', { state: { setImageSrc } });
//     };
 
 
//     return (
//         <div className="camera-container">
//             {imageSrc ? (
//                 <div style={{marginTop:"0px", paddingTop:"0px"}}>
//                     <img src={imageSrc} alt="Captured" />
//                     <div className="webcam-recapture-button">
//                     <button
//                         onClick={()=>{handleRecapture()}}
//                         className="capture-button re"
//                     >
//                         Recapture
//                     </button>
//                 </div>
//                 </div>
//             ) : (
//                 <>
//                     <Grid item sx={{marginTop:"2vh"}}>
//                         <Typography variant="h5" component="div" textAlign="center" sx={{marginBottom:"2vh"}}>
//                             {initialising ? "Initialising..." : faceOK}
//                         </Typography>
//                         <Webcam
//                             id="webcam"
//                             audio={false}
//                             height={videoConstraints.height}
//                             width={videoConstraints.width}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             videoConstraints={videoConstraints}
//                             onUserMedia={handleVideoOnPlay} />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Button
//                             onClick={capture}
//                             variant="contained"
//                             disabled={(initialising) || (faceOK !== "OK")}
//                             fullWidth>
//                             Capture photo
//                         </Button>
//                     </Grid>
//             </>
//          )}
//         </div>
//     );
// };
 
// export default WebcamCapture

// // import React, { useRef, useCallback, useState, useEffect } from "react";
// // import Webcam from "react-webcam";
// // import * as faceapi from 'face-api.js';

// // // MUI
// // import Button from '@mui/material/Button';
// // import Grid from '@mui/material/Grid';
// // import Typography from '@mui/material/Typography';

// // function getWindowDimensions() {
// //     const { innerWidth: width, innerHeight: height } = window;
// //     return {
// //         width,
// //         height
// //     };
// // }

// // const aspectRatio = 4 / 3;
// // const thresholdPercentFace = 0.3;
// // const thresholdFaceScore = 0.7;

// // function useWindowDimensions() {
// //     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

// //     useEffect(() => {
// //         function handleResize() {
// //             setWindowDimensions(getWindowDimensions());
// //         }
// //         window.addEventListener('resize', handleResize);
// //         return () => window.removeEventListener('resize', handleResize);
// //     }, []);

// //     return windowDimensions;
// // }

// // const WebcamCapture = ({ setImageSrc, setOnPlay, onPlay }) => {
// //     let camHeight = useWindowDimensions().height*0.9
// //     let camWidth = useWindowDimensions().width
// //     if (camHeight > camWidth) {
// //         camHeight = Math.round(camWidth * aspectRatio)
// //     } else {
// //         camHeight = Math.round(camHeight * 0.9)
// //         camWidth = Math.round(camHeight / aspectRatio)
// //     }
// //     const videoConstraints = {
// //         height: camHeight,
// //         width: camWidth,
// //         facingMode: "user"
// //     };

// //     // useEffect( () =>
// //     //     {
// //     //         console.log(videoConstraints.height)
// //     //         console.log(videoConstraints.width)
// //     //     }, [videoConstraints.height, videoConstraints.width]
// //     // )
// //     const webcamRef = useRef(null);
// //     const capture = useCallback(
// //         () => {
// //             const imageSrc = webcamRef.current.getScreenshot();
// //             console.log(imageSrc)
// //             setImageSrc(imageSrc)
// //         }, [webcamRef]
// //     );

// //     const [initialising, setInitialising] = useState(false)
// //     useEffect(() => {
// //         const loadModels = async () => {
// //             const MODEL_URI = process.env.PUBLIC_URL + '/models';
// //             setInitialising(true)
// //             Promise.all([
// //                 faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
// //                 // faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
// //                 // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
// //                 // faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URI),
// //             ]).then(() => { console.log("models imported") });
// //         }
// //         loadModels();
// //     }, [])



// //     const [faceOK, setFaceOK] = useState(null)
// //     const handleVideoOnPlay = () => {
// //         setInterval(async () => {
// //             if (initialising) {
// //                 setInitialising(false)
// //             }
// //             let detections = []
// //             if(webcamRef.current !== null)
// //                 detections = await faceapi.detectAllFaces(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions());
// //             if (detections.length > 1) {
// //                 // Multiple faces
// //                 setFaceOK("Multiple faces detected")
// //             }
// //             else if (detections[0] !== undefined) {
// //                 // One face
// //                 const boxArea = Math.round(detections[0].box.height) * Math.round(detections[0].box.width)
// //                 const ImageArea = detections[0].imageWidth * detections[0].imageHeight
// //                 const percentFace = boxArea / ImageArea

// //                 if (percentFace < thresholdPercentFace) {
// //                     // Not close enough
// //                     setFaceOK("Come closer")
// //                 } else if (detections[0].score < thresholdFaceScore) {
// //                     // detected face score is low
// //                     setFaceOK("Blurry or Not enough lighting")
// //                 } else {
// //                     // all conditions satisfied
// //                     setFaceOK("OK")
// //                 }
// //             }
// //             else {
// //                 // No face
// //                 setFaceOK("no face detected")
// //             }
// //         }, 500)
// //     }

// //     return (
// //         <>
// //             <Grid item sx={{marginTop:"2vh"}}>
// //                 <Typography variant="h5" component="div" textAlign="center" sx={{marginBottom:"2vh"}}>
// //                     {initialising ? "Initialising..." : faceOK}
// //                 </Typography>
// //                 <Webcam
// //                     id="webcam"
// //                     audio={false}
// //                     height={videoConstraints.height}
// //                     width={videoConstraints.width}
// //                     ref={webcamRef}
// //                     screenshotFormat="image/jpeg"
// //                     videoConstraints={videoConstraints}
// //                     onUserMedia={handleVideoOnPlay} />
// //             </Grid>
// //             <Grid item xs={12}>
// //                 <Button
// //                     onClick={capture}
// //                     variant="contained"
// //                     disabled={(initialising) || (faceOK !== "OK")}
// //                     fullWidth>
// //                     Capture photo
// //                 </Button>
// //             </Grid>
// //         </>
// //     );
// // };

// // export default WebcamCapture