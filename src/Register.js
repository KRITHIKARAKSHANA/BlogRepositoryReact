import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import FileDb from './FileDb';


export default function Register(props) {

    let [user1, setUser1] = useState({ userId: "", password: "", password1: "", name: "", email: "" })
    const [file1, setFile1] = useState({ id: "" })
    const [file, setFile] = useState(new FileDb("", ""))

    const [passerror, setPassErr] = useState("");

    let [fileerror, setFileErr] = useState("Image Is Mandatory File Size Should be less than 5mb");

    let change = (event) => {
        let n = event.target.name;
        setUser1({ ...user1, [n]: event.target.value })

    }

    let backFn = () => {
        props.goBack();
    }

    const changeFile = (event) => {

        setFile(event.target.files[0]);
        setFileErr("");

        const MAX_FILE_SIZE = 5120 
        let fileSizeKiloBytes = event.target.files[0].size / 1024 
        console.log(fileSizeKiloBytes);

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setFileErr("File size is greater than maximum limit");
        }
        if (!event.target.files[0]) {
            setFile("", "");
        }
    
        console.log(event.target.files[0]);
        if (!event.target.files[0]) {
            setFile("", "");
        }
    }

    let click1 = async (event) => {
        event.preventDefault();

        if (user1.password === user1.password1) {

            setPassErr(" ");


            const url = 'http://localhost:8085/uploads';
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            axios.post(url, formData, config)
                .then(function (response) {
                    console.log(response.data);
                    setFile1({ id: response.data.id })
                    getContacts(response.data.id)
                })
            function getContacts(id1) {
                let user = {
                    "userId": user1.userId,
                    "password": user1.password,
                    "role": "user",
                    "name": user1.name,
                    "blogs": [],
                    "email": user1.email,
                    "profilePic": {
                        "id": file1.id,
                        "name": null,
                        "type": null,
                        "data": null
                    },
                    "following": []
                }
                console.log("user");
                console.log(file1);
                console.log(user);
                fetch("http://localhost:8085/reguser", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user1.userId,
                        password: user1.password,
                        role: 'user',
                        name: user1.name,
                        blogs: [],
                        email: user1.email,
                        profilePic: {
                            id: id1,
                            name: null,
                            type: null,
                            data: null
                        },
                        following: []
                    })
                })
                    .then(res => {
                        res.json();
                        console.log(res.status);
                        if (res.status == 200) {
                            console.log("Form Submitted")
                            alert("Registered Successfully");
                            setFile({...file,name:""});
                            event.target.reset();
                        } else {
                            console.log("cancelled");
                            alert("Username already Exist");
                            event.target.reset();
                        }

                    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err));

            }
        }

        else {
            setPassErr("Both Password Has to be Same")
        }

    }

    console.log(file1);

    return (
        <div className='container-fluid min-vh-100 overflow-hidden bg-image mil-vh-100 px-0 d-flex justify-content-center py-2' style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/registerpg.png'})`,
            backgroundSize: "cover"
        }}>
            <div class="card bg-none shadow-lg rounded border border-1 rounded-3 py-2" style={{ width: "60%" }}>
                <div className='row'>
                    <div className='col-3 px-2 py-1 rounded-3'>
                        <div className='card border border-1 rounded-3 mt-4 col-sm-0' style={{ height: "90%", marginLeft: "-50%" }}>
                            <img src='https://images.unsplash.com/photo-1605436247078-f0ef43ee8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' className='h-100 rounded' alt='logo' />
                        </div>
                    </div>

                    <div className='col-9 p-2'>
                        <div className="p-4">
                            <div className="mb-4">
                                <h1>Register</h1>
                            </div>
                            <form onSubmit={click1} >
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-text " style={{ backgroundColor: "rgb(232, 207, 166)" }}>
                                                    <i class="bi bi-person-fill"></i>
                                                </span>

                                                <div className="form-floating">
                                                    <input name="userId" id="userId" type="text" placeholder="User Id" className="form-control input-md" onChange={change} required minLength={3} />
                                                    <label for="userId">User name</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <div className="input-group ">
                                                <span className="input-group-text " style={{ backgroundColor: "rgb(232, 207, 166)" }}>
                                                    <i class="bi bi-envelope-at"></i>
                                                </span>

                                                <div className="form-floating">
                                                    <input name="email" id="email" type="text" placeholder="Email" className="form-control input-md" onChange={change} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                                                    <label for="email">Email</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 py-3">

                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-text " style={{ backgroundColor: "rgb(232, 207, 166)" }}>
                                                    <i class="bi bi-person-vcard"></i>
                                                </span>

                                                <div className="form-floating">
                                                    <input name="name" type="text" id="name" placeholder="Name" className="form-control input-md" onChange={change} required minLength={3} />
                                                    <label for="name">Name</label>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="col-md-12 pb-4">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-text " style={{ backgroundColor: "rgb(232, 207, 166)" }}>
                                                    <i class="bi bi-lock-fill"></i>
                                                </span>

                                                <div className="form-floating">
                                                    <input name="password" id="password" type="password" placeholder="Password" className="form-control input-md" onChange={change} required minLength={3} />
                                                    <label for="password">Password</label>
                                                </div>
                                                <p className='text text-danger'>{passerror}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-12 pb-4">

                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-text " style={{ backgroundColor: "rgb(232, 207, 166)" }}>
                                                    <i class="bi bi-lock-fill"></i>
                                                </span>

                                                <div className="form-floating">
                                                    <input name="password1" id="password1" type="password" placeholder="Confirm Password" className="form-control input-md" onChange={change} required minLength={3} />
                                                    <label for="password1 ">Confirm Password</label>
                                                </div>
                                                <p className='text text-danger'>{passerror}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 ">

                                        <div className="input-group py-2 custom-file-button">

                                            <label style={{ backgroundColor: "rgb(232, 207, 166)" }} className="input-group-text" for="file">

                                                <i class="bi bi-paperclip"></i>
                                                Upload file
                                            </label>
                                            <p className="my-3 ms-3">{file.name}</p>
                                            <input className="form-control my-2" type='file' style={{ visibility: "hidden" }} id="file" name="uploadimage" onChange={changeFile} required />
                                            <p className='text text-danger'>{fileerror}</p>
                                        </div>

                                    </div>

                                    <div className="col-md-12 py-4">
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-lg m-2 btn-outline-success">Sign Up</button>
                                            <button className='btn btn-lg btn-outline-danger m-2' onClick={backFn}>Back</button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
