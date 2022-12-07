import { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
export default function ViewRequest() {
    const [blogs, setBlogs] = useState([]);
    const [flag, setFlag] = useState(false);
    const [get,setGet]=useState([{name:"",url:""}])
    const [file,setFile]=useState();
    const [error,setError]=useState("");
    useEffect(() => {
        if (!flag) {
            fetch("http://localhost:8085/viewRequest")
                .then((response) => response = response.json())
                .then((data) => {
                    console.log("usefeect")
                    console.log(data);
                    setBlogs(data);
                    console.log("Data len");
                    console.log(data.length);
                    if(data.length==0){
                        setError("No more pending blogs")
                    }
                })
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
                  setFlag(true);
                });
        }
    })
    const verify=(status,id)=>{
        fetch("http://localhost:8085/verifyBlog/"+id+"/"+status,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response=response.json())
        .then((data)=>{
            console.log(data);
            fetch("http://localhost:8085/viewRequest")
                .then((response) => response = response.json())
                .then((data) => {
                    console.log("verify method")
                    console.log(data);
                    setBlogs(data);
                    console.log(blogs);
                    if(data.length==0){
                        setError("No pending blogs to verify!")
                    }
                })
        })
    }
    return (
        <div className="col-md-11 px-0">
            <center>
            <h1 className="my-2">Pending blogs for verification</h1>
            <h3 className="text text-success">{error}</h3>
            </center>
            {
                blogs.map((blog) => (
                    <div className="card m-5 col-md-10" >
                        <center><div className="card-header">
                            {blog.category.cname}
                        </div></center>
                                {(() => {
                                  if ((blog.file)==null){
                                      return (
                                        <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlKRD7mIbkf3r9mdQktp2bfqW1GQztuBcILQ&usqp=CAU" alt="Card image cap"/>
                                      )
                                  }else{
                                      return (
                                        get.filter(file=>file.url.substring("http://localhost:8085/files/".length)== blog.file.id).map((e)=>(
                                    <img src={e.url} alt="img"/>
                                    ))
                                      )
                                  }
                                })()}
                        <div className="card-body">
                            <center>
                            <h5 className="card-title">{blog.title}</h5>
                            </center>
                            <p className="card-text">{blog.content}</p>
                            <center>
                            <button className="btn btn-success" onClick={()=>{
                                verify("verified",blog.id);
                            }}>Accept</button>
                            <button className="btn btn-danger ms-2" onClick={()=>{
                                verify("rejected",blog.id);
                            }}>Reject</button>
                            </center>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}