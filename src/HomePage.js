import React, { useEffect, useState } from 'react';
import { redirect, Link, useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import ViewBlog from './ViewBlog';
import { format } from 'date-fns';
import axios from 'axios';

export default function HomePage(props) {
  
  let [blist, setBList] = useState([]);
  const [date, setDate] = useState("");
  const [get,setGet]=useState([{name:"",url:""}])
  const [file,setFile]=useState();

  useEffect(() => {
    fetch("http://localhost:8085/displayverified/")
      .then((response) => response.json())
      .then((datablog) => {
        setBList(datablog);

      });
      const url = 'http://localhost:8085/files';
                const formData = new FormData();
                formData.append('file', file);
                const config = {
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                };
                axios.get(url, formData, config).then((response) => {
                  console.log(response.data);
                  setGet(response.data);
                });
  }, []);
  
  let nextPage = (id) => {
    props.showNext(id);
  }
  return (
    <>

      <div className="row">
        <br></br>
        {blist.map(b => (
          <div className="col-md-5 col-lg-6 col-auto d-flex align-items-stretch px-2" >
            <div className="card " >
              <div className="card-header row">
                <img src="data:image/png;base64,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" className="col-sm-2  col-auto card-img-top rounded-circle w-25" alt="User Image" />
                <div className="col p-4">
                  <li className="list-group-item"><h5 className="card-title">{b.createdBy.name}</h5></li>

                  {(() => {
                    if (b.date) {
                      return (
                        <li className="list-group-item"><h6 className="card-title">{b.date.substring(0, 10)}</h6></li>

                      )
                    }
                  })()}
                </div>
              </div>
              {(() => {
                if ((b.file)==null){
                  return (
                    <img className="card-img-top" style={{height:200+"px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlKRD7mIbkf3r9mdQktp2bfqW1GQztuBcILQ&usqp=CAU" alt="Card image cap"/>
                  )
                  }else{
                    return (
                        get.filter(file=>file.url.substring("http://localhost:8085/files/".length)== b.file.id).map((e)=>(
                        <img src={e.url} style={{height:200+"px"}} alt="img"/>
                        )) 
                    )
                }
                                  
              })()}
              <div className="card-body">
                <h5 className="card-title fw-bold">{b.title}</h5>
                <p className="card-text text-truncate">{b.content}</p>

                <a onClick={() => {
                  console.log(b.id);
                  nextPage(b.id);
                }} className="btn btn-primary" style={{ backgroundColor: "#AD8B73" }} >
                  View Blog
                </a>
              </div>
            </div>
            <br></br>

          </div>

        ))}
      </div>
    </>
  )
}