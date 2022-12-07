import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function ChangePassword({user1}) {
    let [cred,setCred]=useState({userId:"",password:"",confirmpass:""})
    let changeEvent=(event)=>{
    setCred({...cred,[event.target.name]:event.target.value});
    console.log(cred);
    }
    let ChangePassword=()=>{
        console.log(cred.password);
        if(cred.password==cred.confirmpass&& cred.password!="" && cred.confirmpass!=""){
            fetch("http://localhost:8085/updatePassword", {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        userId: user1,
                        password: cred.password
                })
              })
              .then(res => res.json())
              .then(data => console.log(data))
              .catch(err => console.log(err));
        }else{
            alert("password and Confirm password Mismatching")
        }
    }
    return (
    <div>
              <div className='container rounded-3 mt-5 p-5'style={{backgroundColor :"#E5D3B7",color:"#8E806A"}}>
                <center><h3>Update Password</h3></center>
              <div className="form-group  py-2">
                    <input name="userId" type="text" placeholder="User Id" className="form-control input-md" value={user1} disabled/>
               </div>
               <div className="form-floating form-group  py-2">
               <label for="password">New Password</label>

                    <input name="password" type="text" placeholder="New Password" className="form-control input-md"  onChange={changeEvent}/>
               </div>
               <div className="form-floating form-group  py-2">
               <label for="confirmpass">Confirm Password</label>

                    <input name="confirmpass" type="text" placeholder="Confirm Password" className="form-control input-md" onChange={changeEvent}/>
               </div>
               <div className="form-group ">
                   <center><button onClick={ChangePassword}  className="btn btn-lg btn-outline-white  mt-3" style={{backgroundColor :"#E5D3B7",color:"#8E806A"}}><Link className='text-white fw-bold' to="/">Update</Link></button></center>
                </div>
              </div>
    </div>
  )
}