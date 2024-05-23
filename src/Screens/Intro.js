import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import photo from '../undraw_visionary_technology_re_jfp7.svg';
import play_store_icon from '../google-play-badge.png';
import './Intro.css';
import { fontSize } from '@mui/system';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { auth } from '../firebase/utils';


const Intro = (props) => {



return (
<div>
  
    <div className='container cont' >
        <div className="row" >
            
            <div className="col-sm" >
                {/* <p style={{ fontWeight:"bold", fontSize:"20px" }} >
                    Spreading Things up into an efficient way
                </p> */}
                <p style={{ fontWeight:"bold", fontSize:"35px" }} >Get Your DataAutomation Done With our Fantastic Tool!.......</p>
                <br></br>
                <p style={{ fontWeight:"bold", fontSize:"20px" }} >Get started by Uploading a Template</p>
                
                {(props.currentGuser|| props.currentUser)?
                <Link to='/form'>
                    <Button style={{backgroundColor:"#5d3fd3" ,color: "white", borderRadius: 
                  "10px", fontSize: "20px", fontWeight: "500"}}>Upload a Document</Button>
                  </Link>:
                  <Link to='/login'>
                    <Button style={{backgroundColor:"#5d3fd3" ,color: "white", borderRadius: 
                  "10px", fontSize: "20px", fontWeight: "500"}}>Upload a Document</Button>
                  </Link>
                }


                <br></br>
                <br></br>
                <br></br>
                <p style={{ fontWeight:"bold", fontSize:"20px" }} >
                    Download our Mobile app 
                </p>
                <a href="#">
                    <img width="200px" src={play_store_icon} ></img>
                </a>

            </div>

            <div class="col-sm">
                <img width="100%" src={photo} ></img>
            </div>

        </div>
</div>
</div>




);
}



export default Intro;