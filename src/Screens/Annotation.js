
import { useEffect, useRef, useState } from 'react';
import React from "react";
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';




const axios = require('axios');

  var l = [];

function Annotation(props) {

  // Ref to the image DOM element
  const imgEl = useRef();

  // The current Annotorious instance
  const [ anno, setAnno ] = useState();

  const [keys, setKeys] = useState([]);


  useEffect(()=>{
    if(props.emptyList){
      console.log("empty list in Annotation")
      l = []
    }
  }, [])
  // Init Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state



  useEffect(() => {
    let annotorious = null;
    if (imgEl.current) {
      // Init
      annotorious = new Annotorious({
        image: imgEl.current,
            widgets: [ 
            'TAG'
          ]
      });

      // Attach event handlers here
      annotorious.on('createAnnotation', annotation => {
        console.log('created', annotation);
        console.log(props.h, props.w, props.Name);
        var obj= {TempName:props.Name, Key: annotation.body[0].value, Coordinates: annotation.target.selector.value.slice(11).split(","), Regex: 'String'}
        l.push(obj);
        
        // postData(props.Name, annotation.body[0].value, annotation.target.selector.value.slice(11).split(","), props.h, props.w);
      });


annotorious.on('updateAnnotation', (annotation, previous) => {
        console.log('updated', annotation, previous);
        var updateobj = l.find((obj)=> obj.Key === previous.body[0].value);
        var objIndex = l.indexOf(updateobj);
        l[objIndex].Key = annotation.body[0].value;
        l[objIndex].Coordinates = annotation.target.selector.value.slice(11).split(",");
      })

      annotorious.on('deleteAnnotation', annotation => {
        var f = l.find(ele => ele.Key===annotation.body[0].value);
        var index = l.indexOf(f);
        console.log(index);
        l.splice(index, 1);
        console.log(l);
        console.log('deleted', annotation);
      });
    }

    // Keep current Annotorious instance in state
    // setAnno(annotorious);

    // Cleanup: destroy current instance
    return () => annotorious.destroy();
  },[props.h, props.w, props.Name]);


  // Toggles current tool + button label


  return (
    <div>
        
        <div>
          <div>
            <img
              ref={imgEl} 
              src={props.Image} 
              alt="" 
              width="500px"/>
          </div>
      </div>
 
      <div>

      </div>
      </div>
  );
}

export default Annotation;

export {l}
//export{length}

