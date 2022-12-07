import React, { useState } from 'react'
import AdminPage from './AdminPage';
import UserPage from './UserPage';
export default function Login({logout}) {
  let [user, setUser] = useState({ username: "", password: "" })
  let [error,setError]=useState("")
  let [page,setpage]=useState();
  let [u,setU]=useState();

  let changeTo=(a)=>{
	setpage(a);
	console.log(a);
  }
  
	
  let change = (event) => {
    let n = event.target.name;
    setUser({ ...user, [n]: event.target.value })
  }
  let userid = user.username;
  let pass = user.password;

  let click = () => {
    
    fetch("http://localhost:8086/authenticate", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId:userid,
        password:pass
      })
    })
      .then(res =>{
        console.log(res.status);
		
   if(res.status==403){
     console.log("Inavlid Credentials");
     setError("Inavlid Credentials")
   }else if(res.status==404){
     console.log("User Not Found");
     setError("User Not Found")
   }else{
	 
     setError("Success")
	 console.log(user.username);
	 fetch("http://localhost:8085/findUser/"+user.username)
        .then((response) => response.json())
        .then((data) =>{
			setpage(data.role);
      setU(data.userId);
			console.log("page"+page);
		});

   }
   res=res.json();

   
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  
  if(page=="user"){
	return(
		 <UserPage u={u} logout1={logout}/>
	)
	}else if(page=="admin"){
	return (
    <AdminPage u={u} logout1={logout}/>
	)
	}else{  
		return (
      <>
      <div className="d-flex  justify-content-center align-items-center  "
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/top-view-arrangement-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.2.1574319130.1669342211") `,
          height: "100vh",
          backgroundSize: "cover",
        }}>
        <div className="position-absolute">
          <div className="card opacity-75  bg-dark rounded-3 ">
            <div className="card-body fw-bold">
              <h5 className="card-title text-white text-center">Login</h5>
                <div className="form-floating ">
                  <input type="text" name="username" placeholder='username' onChange={change} className="form-control my-3 " required />
                  <label for="floatingInput">User ID</label>
                </div>
                <div className="form-floating">
                  <input type="password" name="password" placeholder='password' onChange={change} className="form-control my-3 " required />
                  <label for="floatingPassword">Password</label>
                </div>
                <div>
                  <h4 className='text-danger'>{error}</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <button onClick={click} className="btn btn-outline-success rounded-pill px-4 "  >Login</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      </>
		)
	}
  }