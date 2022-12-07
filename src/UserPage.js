import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Categories from './Categories';
import ChangePassword from './ChangePassword';
import CreateBlog from './CreateBlog';
import HomePage from './HomePage';
import ViewBlog from './ViewBlog';
import ViewMyBlog from './ViewMyBlog';
import axios from "axios";

export default function UserPage(props) {

  let [catlist, setCatList] = useState([]);
  let [blogid, setBlogid] = useState(0);
  let [flag, setFlag] = useState(false);
  let [user, setUser] = useState("");
  let [get,setGet] = useState([{ name: "", url: "" }]);
    const [file, setFile] = useState();

useEffect(()=>{
  fetch("http://localhost:8085/findUser/"+props.u)
                .then((response) => response.json())
                .then((data) => {
                    console.log("user")
                    console.log(data);
                    setUser(data);
                })
                const url = 'http://localhost:8085/files/';
                const formData = new FormData();
                formData.append('file', file);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                };
                axios.get(url, formData, config).then((response) => {
                    console.log("all file")
                    console.log(response.data);
    
                    setGet(response.data);            
    
                });
},[])

  let listCategory = async () => {
    await fetch("http://localhost:8085/showAllCategories/")
      .then((response) => response.json())
      .then((data) => setCatList(data));
  }

  let changePage = (id) => {
    console.log("userpage")
    console.log(id);
    setBlogid(id);
    console.log(blogid);
    setFlag(true);
   
  }

  let backPage=()=>{
    console.log("user back page")
    setFlag(false);
  }

  if (!flag) {
    return (
      <>
        <Router>
          <div className="navbar" style={{ backgroundColor: "#E5D3B7", color: "#8E806A" }}>
            <a href="/" className="d-flex align-items-center pb-0 mb-md-0 me-md-auto px-3" style={{ color: "#5D534A" }}>
              <span className=" d-sm-inline" style={{ fontFamily: "Fantasy-Copperplate", fontSize: 40 + "px" }} >BLOGGIFY</span>
            </a>
            <div className="dropdown pe-4 ">
              <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#5D534A" }}>
              {(() => {
                        if ((user.profilePic) == null) {
                            return (
                                <img width="30" height="30" className="rounded-circle"  src= "data:image/png;base64,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" alt="Card image cap" />
                            )
                        } else {
                            return (
                                get.filter(file => file.url.substring("http://localhost:8085/files/".length) == user.profilePic.id).map((a) => (
                                    <img width="40" height="40" className="rounded-circle"  src={a.url} alt="img" />
                                ))
                            )
                        }
                    })()}
                <span className="d-none d-sm-inline mx-1 ps-3" style={{ color: "#5D534A", fontFamily: "Fantasy,Copperplate", fontSize: 20 + "px" }}>{props.u}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow pe-0" style={{ minWidth: 60 + "px", backgroundColor: "#5D534A" }} aria-labelledby="dropdownUser1">
                <li><Link to="changepwd"><a className="dropdown-item">Change Password</a></Link></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button onClick={event=>props.logout1("any")} className='btn btn-danger w-100 mb-2 text-decoration-none text-light'>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 " style={{ backgroundColor: "#E5D3B7" }}>
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

                  <ul className="nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                    <li className="nav-item nav-link align-middle px-0" style={{ color: "#5D534A" }}>
                      <i className="fs-2 bi-house"></i> <span className="ms-1 d-none d-sm-inline" ><Link to="home" style={{ color: "#5D534A", fontFamily: "Fantasy,Copperplate", fontSize: 25 + "px" }}>HOME</Link></span>

                    </li>

                    <li style={{ color: "#5D534A" }}>
                      <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle" onClick={listCategory} style={{ color: "#5D534A" }}>
                        <i className="fs-2 bi-grid"></i> <span className="ms-1 d-none d-sm-inline" style={{ color: "#5D534A", fontFamily: "Fantasy,Copperplate", fontSize: 25 + "px" }}>CATEGORIES</span> </a>
                      <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">

                        {catlist.map(c => (
                          <li className="w-100">
                            <span className="d-none d-sm-inline "></span><Link to={`category/${c.cname}`} style={{ color: "#5D534A", fontFamily: "Verdana", fontSize: 20 + "px" }}>{c.cname}</Link>
                          </li>
                        ))}

                      </ul>
                    </li>
                    <li className="nav-item nav-link align-middle px-0" style={{ color: "#5D534A", fontFamily: "Fantasy,Copperplate", fontSize: 25 + "px" }}>
                      <i className="bi fs-2 bi-file-earmark-plus"></i> <span className="ms-1 d-none d-sm-inline" ><Link to="createBlog" style={{ color: "#5D534A" }}>CREATE BLOG</Link></span>
                    </li>
                    <li className="nav-item nav-link align-middle px-0" style={{ color: "#5D534A", fontFamily: "Fantasy,Copperplate", fontSize: 25 + "px" }}>
                    <i class="bi fs-2 bi-collection"></i> <span className="ms-1 d-none d-sm-inline" ><Link to="viewMyBlog" style={{ color: "#5D534A" }}>MY BLOGS</Link></span>
                    </li>

                  </ul>
                </div>
              </div>
              <div className="col-10 py-3 px-3 col-auto">
                <Routes>
                  <Route path="home" element={<HomePage showNext={changePage} />}></Route>
                  <Route path="category/:cname" element={<Categories showNext={changePage}/>}></Route>
                  <Route path="viewBlog" element={<ViewBlog bid={blogid} user1={props.u} goBack={backPage} />}></Route>
                  <Route path="createBlog" element={<CreateBlog user1={props.u} />}></Route>
                  <Route path="changepwd" element={<ChangePassword user1={props.u} />}></Route>
                  <Route path="viewMyBlog" element={<ViewMyBlog user1={props.u} showNext={changePage}/>}></Route>
                </Routes>
              </div>
            </div>

          </div>

          <div className="navbar position-fixed-bottom justify-content-center " style={{ backgroundColor: "#E5D3B7" }}>
            <p className='text-center fst-italic'><center>&copy; 2022 BLOGGIFY</center></p> 
          </div>
        </Router>
      </>
    )
  }

  else{
    return(
      <ViewBlog bid={blogid} user1={props.u}  goBack={backPage}/>
    )
  }
}