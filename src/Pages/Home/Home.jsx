import { Grid } from '@material-ui/core';
import React, { useState } from 'react'

import './Home.css'
import '../../Components/Fileupload/FileUpload.css'
import img from './vector.jpeg'
import SpringModal from '../../Components/Modal';

import Graph from '../../Components/Graph';



const App = () => {

  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [results, setResults] = useState([]);


  const onChange = e => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("MOdal working")
    const formData = new FormData(e.target);

    const Upload = async () => {
      await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {
          const { fileName, filePath, ls } = data;
          setUploadedFile({ fileName, filePath });
          setResults(ls);
          console.log('res:\t' + results);
        })
      })
    }
    Upload();
  }

  return (
    <div className="container" >
      <Grid container
        spacing={5}
        alignItems="center"
        justifyContent="center">
        <Grid item xs={12}>
          <div className="vector">
            <img src={img} alt="app" className="img vert-move" />
          </div>
        </Grid>


        <Grid item xs={12}>
          <div className="main-main" >
            <form onSubmit={handleSubmit} className="form-container" enctype="multipart/form-data" id="form-container">
              {uploadedFile ? <div  >
                <div className="image-container" >
                  <img src={uploadedFile.filePath} className="UploadedImage" alt="Uploaded" style={{ margin: "20px" }} />
                </div>
              </div> : null
              }
              <input type="file" id="image" name="file"
                accept="image/*" className="input" onChange={onChange} />
              <button type="submit">Upload</button>
              {/* <Button type="button" variant="contained" color="primary" className="button" onClick={handleOpen}>
              <p>Upload</p>
            </Button> */}
            </form>
            {/* <SpringModal onClick={e => handleSubmit(e)} result={results} /> */}
            {/* <button className="button" onSubmit={e => handleSubmit(e)} >Upload</button>*/}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>


          {results.length > 0 && <div>
            <h1 style={{textAlign:"center" , marginBottom:"25px"}}>Predictions (In %)</h1>
            <Graph predictions={results} />
          </div>}
        </Grid>
      </Grid>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" integrity="sha256-qM7QTJSlvtPSxVRjVWNM2OfTAz/3k5ovHOKmKXuYMO4=" crossorigin="anonymous"></script>
    </div>
  )
}

export default App;

