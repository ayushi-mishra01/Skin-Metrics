import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent } from '@mui/material';
import { putForm } from '../controllers/actions';
 
const skinToneColors = ["rgb(249, 245, 236)", "rgb(250, 245, 234)", "rgb(240, 227, 171)", "rgb(206, 172, 104)", "rgb(105, 59, 41)", "rgb(33, 28, 40)"];
 
const initialData = {
  tone: 1,
  type: "Normal",
  acne: "Low",
  wrinkle_grade: 0,
  redness_grade: 0,
  darkCircle_grade: 0,
  eyebag_grade: 0,
  pore_grade: 0,
  age: 0
};
 
const skinTypes = ["Oily", "Normal", "Dry"];
const acnes = ['Low', 'Moderate', 'Severe'];
const otherConcerns = ['sensitive', 'fine lines', 'wrinkles', 'redness', 'pore', 'pigmentation', 'blackheads', 'whiteheads', 'blemishes', 'dark circles', 'eye bags', 'dark spots'];
 
const Form = () => {
  const { state } = useLocation();
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (state !== null && state.data) {
      setData(state.data);
    }
  }, [state]);
  const { type, tone, acne, wrinkle_grade, redness_grade, darkCircle_grade, eyebag_grade, pore_grade, age } = data;
 
  const [currType, setCurrType] = useState(type);
  const [currTone, setCurrTone] = useState(parseInt(tone));
  const [currAcne, setAcne] = useState(acne);
  const [features, setFeatures] = useState({
    "normal": false, "dry": false, "oily": false, "combination": false,
    "acne": false, "sensitive": false, "fine lines": false, "wrinkles": false,
    "redness": false, "dull": false, "pore": false, "pigmentation": false,
    "blackheads": false, "whiteheads": false, "blemishes": false, "dark circles": false,
    "eye bags": false, "dark spots": false
  });
 
  useEffect(() => {
    setCurrType(type);
    setCurrTone(parseInt(tone));
    setAcne(acne);
  }, [type, tone, acne]);
 
  const handleChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };
 
  const handleTone = (e) => {
    setCurrTone(e.target.value);
  };
 
  const handleTypeChange = (e) => {
    setCurrType(e.target.value);
  };
 
  const handleAcne = (e) => {
    setAcne(e.target.value);
  };
 
  const navigate = useNavigate();
 
  const handleSubmit = () => {
    features[currType.toLowerCase()] = true;
 
    if (currAcne !== "Low") {
      features['acne'] = 1;
    }        
    if (wrinkle_grade <= 85) {
      features['wrinkles'] = 1;
    }
    if (redness_grade <= 85) {
      features['redness'] = 1;
    }
    if (darkCircle_grade <= 85) {
      features['dark circles'] = 1;
    }
    if (eyebag_grade <= 85) {
      features['eye bags'] = 1;
    }
    if (pore_grade <= 85) {
      features['pore'] = 1;
    }
 
    putForm(features, currType, currTone, navigate);
  };
 

    return (
        <Container maxWidth="sm" sx={{ marginTop: "2rem", }}>
            <Typography variant="h4" component="div" textAlign="center" sx={{ mb: 3 }}>
                Your Skin Score
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Wrinkle Grade"
                        variant="outlined"
                        value={wrinkle_grade}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Redness Grade"
                        variant="outlined"
                        value={redness_grade}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Dark Circle Grade"
                        variant="outlined"
                        value={darkCircle_grade}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Eye Bag Grade"
                        variant="outlined"
                        value={eyebag_grade}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Pore Grade"
                        variant="outlined"
                        value={pore_grade}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Skin Type"
                        variant="outlined"
                        value={currType}
                        onChange={handleTypeChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Skin Tone"
                        variant="outlined"
                        value={currTone}
                        onChange={handleTone}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <div
                        style={{
                            height: "3rem",
                            width: "3rem",
                            backgroundColor: skinToneColors[currTone - 1],
                            borderRadius: "50%",
                            margin: "0 auto"
                        }}
                    ></div>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Acne Severity</FormLabel>
                        <RadioGroup row value={currAcne} onChange={handleAcne}>
                            {acnes.map((acne) => (
                                <FormControlLabel
                                    key={acne}
                                    value={acne}
                                    control={<Radio />}
                                    label={acne}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        Get Recommendations
                    </Button>
                </Grid>
            </Grid>
            {/* </CardContent>
            </Card> */}
        </Container>
    );
};

export default Form;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import FormLabel from '@mui/material/FormLabel';
// import { Card, CardContent } from '@mui/material';
// import { putForm } from '../controllers/actions';

// const skinToneColors = ["rgb(249, 245, 236)",
//     "rgb(250, 245, 234)",
//     "rgb(240, 227, 171)",
//     "rgb(206, 172, 104)",
//     "rgb(105, 59, 41)",
//     "rgb(33, 28, 40)",
// ]
// let data = {
//     tone: 1,
//     type: "Normal",
//     acne: "Low",
//     wrinkle_grade: 0, 
//     redness_grade: 0,
//     darkCircle_grade: 0,
//     eyebag_grade: 0,
//     pore_grade: 0,
//     age: 0
// }
// const skinTypes = ["Oily", "Normal", "Dry"]
// const acnes = ['Low', 'Moderate', 'Severe']
// const otherConcerns = ['sensitive', 'fine lines', 'wrinkles', 'redness', 'pore', 'pigmentation', 'blackheads', 'whiteheads', 'blemishes', 'dark circles', 'eye bags', 'dark spots']

// const Form = () => {
    
//     const {state} = useLocation();
//     if(state !== null) {
//         data = state.data; 
//         console.log(data)
//     }
//     console.log("After the condtional : ", data)
//     const {type, tone, acne, wrinkle_grade, redness_grade, darkCircle_grade, eyebag_grade, pore_grade, age} = data;
//     console.log("Prefill : ", type, tone, acne, wrinkle_grade, redness_grade, darkCircle_grade, eyebag_grade, pore_grade, age);

//     const [currType, setCurrType] = useState(type)
//     const [currTone, setCurrTone] = useState(parseInt(tone))
//     const [currAcne, setAcne] = useState(acne)
//     const [features, setFeatures] = useState({
//         "normal": false, "dry": false, "oily": false, "combination": false,
//         "acne": false, "sensitive": false, "fine lines": false, "wrinkles": false,
//         "redness": false, "dull": false, "pore": false, "pigmentation": false,
//         "blackheads": false, "whiteheads": false, "blemishes": false, "dark circles": false,
//         "eye bags": false, "dark spots": false
//     });
//     const handleChange = (event) => {
//         setFeatures({
//             ...features,
//             [event.target.name]: event.target.checked,
//         });
//         console.log(features)
//     };
//     const handleTone = (e) => {
//         setCurrTone(e.target.value)
//     }

//     const handleTypeChange = (e) => {
//         setCurrType(e.target.value)
//     }

//     const handleAcne = (e) => {
//         setAcne(e.target.value)
//     }

//     const navigate = useNavigate();

//     const handleSubmit = () => {
//         features[currType.toLowerCase()] = true;
       
//         if (currAcne != "Low") {
//             console.log(currAcne);
//             features['acne'] = 1;
//         }        
//         if (wrinkle_grade < 85 || wrinkle_grade === 85) {
//             features['wrinkles'] = 1;
//         }
//         if (redness_grade < 85 || redness_grade === 85) {
//             features['redness'] = 1;
//         }
//         if (darkCircle_grade < 85 || darkCircle_grade === 85) {
//             features['dark circles'] = 1;
//         }
//         if (eyebag_grade < 85 || eyebag_grade === 85) {
//             features['eye bags'] = 1;
//         }
//         if (pore_grade < 85 || pore_grade === 85) {
//             features['pore'] = 1;
//         }
 
//         console.log(features, currType, currTone);
//         putForm(features, currType, currTone, navigate);
//     };

//     return (
//         <Container maxWidth="sm" sx={{ marginTop: "2rem", }}>
//             <Typography variant="h4" component="div" textAlign="center" sx={{ mb: 3 }}>
//                 Your Skin Score
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Wrinkle Grade"
//                         variant="outlined"
//                         value={wrinkle_grade}
//                         InputProps={{ readOnly: true }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Redness Grade"
//                         variant="outlined"
//                         value={redness_grade}
//                         InputProps={{ readOnly: true }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Dark Circle Grade"
//                         variant="outlined"
//                         value={darkCircle_grade}
//                         InputProps={{ readOnly: true }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Eye Bag Grade"
//                         variant="outlined"
//                         value={eyebag_grade}
//                         InputProps={{ readOnly: true }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Pore Grade"
//                         variant="outlined"
//                         value={pore_grade}
//                         InputProps={{ readOnly: true }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <TextField
//                         fullWidth
//                         label="Skin Type"
//                         variant="outlined"
//                         value={currType}
//                         onChange={handleTypeChange}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>

//                 <Grid item xs={8}>
//                     <TextField
//                         fullWidth
//                         label="Skin Tone"
//                         variant="outlined"
//                         value={currTone}
//                         onChange={handleTone}
//                         InputProps={{ readOnly: true }}
//                     />
//                 </Grid>
//                 <Grid item xs={2}>
//                     <div
//                         style={{
//                             height: "3rem",
//                             width: "3rem",
//                             backgroundColor: skinToneColors[currTone - 1],
//                             borderRadius: "50%",
//                             margin: "0 auto"
//                         }}
//                     ></div>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControl component="fieldset" fullWidth>
//                         <FormLabel component="legend">Acne Severity</FormLabel>
//                         <RadioGroup row value={currAcne} onChange={handleAcne}>
//                             {acnes.map((acne) => (
//                                 <FormControlLabel
//                                     key={acne}
//                                     value={acne}
//                                     control={<Radio />}
//                                     label={acne}
//                                 />
//                             ))}
//                         </RadioGroup>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         onClick={handleSubmit}
//                         sx={{ mt: 3 }}
//                     >
//                         Get Recommendations
//                     </Button>
//                 </Grid>
//             </Grid>
//             {/* </CardContent>
//             </Card> */}
//         </Container>
//     );
// };

// export default Form;