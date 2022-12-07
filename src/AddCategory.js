//import
import { useState } from "react";

export default function AddCategory() {
    
    const [cname, setCname] = useState("")
    const change = (event) => {
        setCname(event.target.value);
    }

    const submit = (event) => {
        event.preventDefault();
        const options={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    "cname": cname,
                    "cid": null
            })
        }
        fetch("http://localhost:8085/addCategory",options)
        .then((response)=>
        {
            if (response.status == 200) {
                alert("created")
                console.log("created ");
                event.target.reset();
            }
            else {
                alert("Not Created")
            }
            response=response.json();
        })
        .then((data)=>{
            console.log(data);
        })
    }
   
    return (
        <>
            <div className=" d-flex justify-content-center m-5 " >
                <div className="card text-center" style={{backgroundColor :"#E5D3B7",color:"#8E806A"}}>
                    <div className="card-header fw-bold">
                        Add Category
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="category" id="category" placeholder="Enter Category" onChange={change} required minLength={3} />
                                <label for="floatingInput">Enter Category</label>
                            </div>
                            <div className="">
                                <button className="btn btn-outline-success m-1" type="submit" >Add Category </button>
                                <button type="reset" className="btn btn-outline-danger m-1" > Clear </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}