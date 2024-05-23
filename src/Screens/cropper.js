
import 'bootstrap/dist/css/bootstrap.css';
import msg_icon from '../icons8-mail-24.png';
import { useState,useEffect, React,useMemo,useCallback } from 'react';
import logo from '../undraw_secure_login_pdn4.svg';
import { Container,Navbar,Nav } from 'react-bootstrap';
import Annotation from './Annotation';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {l} from './Annotation'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Fab from '@material-ui/core/Fab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import applogo from '../tiktok-app.svg';
import LoadingScreen from 'react-loading-screen';
import TableBody from '@material-ui/core/TableBody';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { func } from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import S3 from 'react-aws-s3';
import {Buffer} from "buffer"
import { toast } from 'react-toastify';
window.Buffer = window.Buffer || require("buffer").Buffer;




const config = {
    bucketName: 'sift-bucket-1',
    dirName: 'Reference images', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIAWEVT3WY3P6OZOA54',
    secretAccessKey: 'O+zZEys8sZZYSPufjtB5a4w+pf3FrEl9VsB57EkV',
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}


            const useStyles = makeStyles((theme) => (
                {
                    root: {
                    '& > *': {
                        margin: theme.spacing(1),
                    },
                    },
                    input: {
                    display: 'none',
                    },
                    margin: {
                        margin: theme.spacing(1),
                    },
                    extendedIcon: {
                        marginRight: theme.spacing(1),
                    },
                    table: {
                        minWidth: 400,
                    },
              }));



        const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            fontSize: 20,
        },
        body: {
            fontSize: 18,
        },
        }))(TableCell);
              
        const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
        },
        }))(TableRow);

const rl = []
function FileUploadPage(){
    const classes = useStyles();
    // const [Input, setInput] = useState("");
    // const [keys, setKey] = useState([]);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [hw, sethw] = useState({h: null, w: null});
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState(null);
    const [cropButton, setCropButton] = useState(false);
    const [keyList, setKeyList] = useState([]);
    // const [SubmitButton,setSubmitButton]=useState(false);
    const [load, setLoad] = useState(false);
    const [reg, setRegex] = useState("");


    const {state} = useLocation();
    const navigate = useNavigate();


  console.log(cropData)


    useEffect(()=>{

      async function nav(){
        try{
          console.log(state.tempname)
        }catch{
          navigate('/form' ,{state : {
            status:false
        }});
        }
      }
      nav();
    }, []
      )




    async function postTemplateImage(tempName, img){
      setLoad(true);
        await axios.post('http://backend.docscanner.teambros.co.in/cropper/add-template-image', {
            templateName: tempName,
            templateImage: img,
        }).then(response => { 
          setLoad(false)
	        console.log(response)
        })
        .catch(error => {
          setLoad(false);
          console.log(error.response)
          alert("Server Error")
        });
      }


            async function postData(tempname, key, coord, totalH, totalW, regexx) {
              setLoad(true)
            await axios.post('http://backend.docscanner.teambros.co.in/cropper/add-details', {
                templateName: tempname,
                key: key,
                x: Number(coord[0])/Number(totalW),
                y: Number(coord[1])/Number(totalH),
                w: Number(coord[2])/Number(totalW),
                h: Number(coord[3])/Number(totalH),
                regex: regexx
            }).then(function (response){ console.log(response);setLoad(false) ;navigate('/form')
          }).catch(function (response){ setLoad(false);
          console.log(response);
          alert("Server Error");});
  }





    const resizeFile = (file) =>
    new Promise((resolve) => {
    Resizer.imageFileResizer(
            file,
            2000,2000,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                    },
                    "base64"
                );
                });

                
  useEffect(() => {
      setKeyList(l);
    console.log(" KeyList: ", keyList)
  }, [l]);

    var img = new Image();
    img.src=cropData;
    img.onload = function(){
        var height = img.height;
        var width = img.width;
        sethw({h: height, w: width})
    } 




    const TakeInputImage = (event) => {
        if (event.target.files[0]) {
        setPicture(event.target.files[0]);
        };
        console.log('taken picture');
    }






    const Preview = async () =>{
      try{
        const image = await resizeFile(picture);
        setImgData(image);
        console.log('preview');
        setCropData("");
        setCropButton(true);
        return image;
      }catch{
        alert("Image not found! Please upload it")
      }
    }






    const getCropData = () => {
    if (typeof cropper !== "undefined") {
       // setCropData(cropper.getCroppedCanvas().toDataURL());
          setLoad(true);
          const ReactS3Client = new S3(config);
          ReactS3Client.uploadFile(cropper.getCroppedCanvas().toDataURL(),state.tempname+'.jpeg' ).then(data => {console.log(data); setLoad(false); setCropData(cropper.getCroppedCanvas().toDataURL());}).catch(err => {console.error(err); setLoad(false);toast.error("Network error")})
      // postTemplateImage(state.tempname, cropper.getCroppedCanvas().toDataURL());
        }
      }
      


    return(

        <LoadingScreen
          loading={load}
          bgColor='rgba(100, 100, 100, 0.9)'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          // logoSrc='/logo.png'
          text='Loading'
        > 



    <div>

            <br></br>
            
        <div className='container'>
            <div className='row'>
                <div className='col-sm'>
                    <div>
        <br></br>            
        <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={TakeInputImage}
      />
      <label htmlFor="contained-button-file">
     
        <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera/>}>
          Upload
        </Button>
        
      </label>
     
      <Button variant="contained" size="medium" color="secondary" className={classes.margin} onClick={Preview}>
          Preview
        </Button>
        </div>
        { (cropData === "" || cropData===null) ?

                        <div>
                            
                        <Cropper
                            style={{ height: 600, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={0}
                            src={imgData}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                        />
                        <div className="text-center">{(cropButton === true)?<Button variant="contained" size="medium" color="primary" className={classes.margin}
                        onClick={getCropData} >
                            Crop Image
                        </Button>: <div></div> } <br></br></div>
                    
                        </div> : 
                        <Annotation emptyList={state.isEmpty} Image={cropData} Name={state.tempname} w={hw.w} h={hw.h} /> 
                        }
                        
                </div>
                </div>


                <div className='col-sm'>
                    <br></br>
<TableContainer component={Paper} >
<Table className={classes.table} aria-label="customized table">
<TableHead>
  <TableRow>
    <StyledTableCell align="center">Template Name</StyledTableCell>
    <StyledTableCell align="center">Key</StyledTableCell>
    <StyledTableCell align="center">Regex</StyledTableCell>
    {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
  </TableRow>
</TableHead>
{/* {console.log("inside tableHead : ", keyList)} */}
<TableBody>{
  (cropData === "" || cropData===null ) ?<div></div>:
      keyList.map((i)=>
      <StyledTableRow key={i.Key}>
          <StyledTableCell component="th" scope="row" align="center">
            {i.TempName}
          </StyledTableCell>
                  <StyledTableCell align="center">{i.Key}</StyledTableCell>
        <StyledTableCell align="center">
    <Form.Select aria-label="Default select example" onChange={(event)=>{var f = l.find(j => j.Key===i.Key);
        var index = l.indexOf(f);rl[index] = event.target.value;}}>
      <option value="String">String</option>
      <option value="Number">Number</option>
    </Form.Select>
        </StyledTableCell>
        </StyledTableRow>
      
    )
}

  </TableBody>

</Table>

<div class="text-center">

{((cropData !== "") && l.length!==0)?
<Button 
          variant="contained"
          size="medium"
          color="primary"
          //aria-label="add"
          className={classes.margin}
          onClick={()=>
            {rl.map((reg, ind)=>{if(reg!==null){l[ind].Regex=reg}});l.map((e)=>{postData(state.tempname, e.Key, e.Coordinates, hw.h, hw.w, e.Regex)})}}
        >
          Submit
        </Button>:<div></div>}
</div>
</TableContainer>

</div>
            </div>

        </div>
        
		</div>

          </LoadingScreen>

	)

}
export default FileUploadPage;
