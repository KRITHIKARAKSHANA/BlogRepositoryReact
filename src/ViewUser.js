import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function ViewUser() {
    let [userlist, setUserlist] = useState([]);
    let [bloglist, setBloglist] = useState([]);
    const [get, setGet] = useState([{ name: "", url: "" }]);
    let [num, setNum] = useState(0);
    if (num == 0) {
        ViewUser()
        setNum(2)
        console.log(num);
    }
    function ViewUser() {
        while (bloglist.length > 0) {
            bloglist.pop();
        }
        fetch("http://localhost:8085/viewUserDetails")
            .then((response) => response.json())
            .then((data) => {
                setUserlist(data);
                data.map((e) => {
                    fetch("http://localhost:8085/blogs/"+e.userId)
                        .then((response) => response.json())
                        .then((data) => {
                            bloglist.push(data);
                            console.log(data);
                        })
                })
                console.log(data);
            })
        const url = 'http://localhost:8085/files';
        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.get(url, formData, config).then((response) => {
            console.log(response.data);
            setGet(response.data);
        });
    }
    function Delete(id) {
        const options={
            method:"DELETE",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            }
        }
        fetch("http://localhost:8085/deleteUser/"+id,options)
            .then((response) => response.json())
            .then((data) => {
                fetch("http://localhost:8085/viewUserDetails")
                    .then((response) => response.json())
                    .then((data) => {
                        setUserlist(data);
                        console.log(data);
                        console.log(data);
                    })
            })
    }
    return (
        <>

            <div className="row row-cols-1 row-cols-md-2 g-4">
                {
                    userlist.map((e) => {
                        return <div className="col">
                            <div className="card text-center">
                                <center>
                                {(() => {
                        if ((e.profilePic) == null) {
                            return (
                                <img className="col-sm-2 col-auto card-img-top rounded-circle w-25" src= "data:image/png;base64,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" alt="Card image cap" />
                            )
                        } else {
                            return (
                                get.filter(file => file.url.substring("http://localhost:8085/files/".length) == e.profilePic.id).map((a) => (
                                    <img className="col-sm-2 col-auto card-img-top rounded-circle w-25" src={a.url} alt="img" />
                                ))
                            )
                        }
                    })()}
                       
                                </center>
                                <div className="card-body">
                                    <h5 className="card-title"> {e.name}</h5>
                                    <p className='text-dark'>{e.userId} <br></br>{e.email}</p>

                                    <button className="btn btn-danger " onClick={() => { Delete(e.userId) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    })}

            </div>


        </>
    )
}









