import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './About.css'
import one from "./download.jpg"


function About() {
    return (
    <div className="dev-container"  >
      
        <div className="card-container">
            <Grid container>
            <div style={{width:700, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", marginBottom:50}}>
            <h3>One of the critical factors behind the rapid spread of COVID-19 pandemic is a lengthy clinical testing time. 
            The imaging tool, such as Chest X-ray (CXR), can speed up the identification process. </h3>
            <img src={one} alt="covid" style={{width:400, margin: 10}} />
            </div>
            
            </Grid>
        </div>  
             
    </div>
    )
}

export default About


