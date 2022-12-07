import { useEffect, useState } from "react";
import Blog from './Blog';
import Category from './Category';
import axios from 'axios';
import FileDb from './FileDb';
export default function CreateBlog(props) {
    const [blog, setBlog] = useState(new Blog());
    const [categories, setCat] = useState([]);
    const [flag, setFlag] = useState(false);
    const [file, setFile] = useState(new FileDb("", ""));
    const [category, setCategory] = useState(new Category());
    const [filename, setFilename] = useState("");
    useEffect(() => {
        if (!flag) {
            fetch("http://localhost:8085/showAllCategories")
                .then((response) => response = response.json())
                .then((data) => {
                    console.log(data);
                    console.log(props.user1);
                    setCat(data);
                    setFlag(true);
                    console.log(categories);
                    setFilename(file.name);
                })
        }
    }, [])
    let changeBlog = (event) => {
        let id = event.target.id;
        let v = event.target.value;
        setBlog({ ...blog, [id]: v });
        console.log(blog);
    }
    const changeFile = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
        if (!event.target.files[0]) {
            setFile("", "");
        }
        console.log(filename);
    }
    let changeCategory = (event) => {
        console.log("category value");
        console.log(event.target.value);
        setCategory({ ...category, cId: event.target.value });
        console.log(category);
    }
    let create = async (event) => {
        event.preventDefault();
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
                const url = "http://localhost:8085/createBlog";
                const options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: null,
                        title: blog.title,
                        category: {
                            cname: category.cname,
                            cid: category.cId
                        },
                        status: "pending",
                        content: blog.content,
                        createdBy: {
                            userId: props.user1,
                            password: null,
                            role: null,
                            name: null,
                            email: null,
                            profilePic: null,
                            following: []
                        },
                        date: null,
                        comments: [],
                        noOfLikes: null,
                        file: {
                            id: response.data.id,
                            name: null,
                            type: null,
                            data: null
                        }
                    })
                }
                fetch(url, options)
                    .then((response) => {
                        if(response.status == 201 ){
                            alert("Blog Created Successfully");
                            event.target.reset();
                            setFile({...file,name:""});
                            console.log("created ");
                        }
                        else {
                            alert("No Blog Created ");
                        }
                        response = response.json();
                    })
                    .then((data) => {
                        console.log("result of fetch")
                        console.log(data);
                    })
            })
    }
    return (
        <>
        <div className="container py-5 px-5 d-flex justify-content-center" style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/top-view-arrangement-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.2.1574319130.1669342211")`,
            backgroundSize: "cover"
        }}>
            <div className="card py-5 px-3" >
        <h3 className="card-title rounded-pill mt-3 px-5 d-flex justify-content-center" style={{backgroundColor:"#E5D3B7"}}>Create your own blog!</h3>
        <div className="d-flex row g-3 responsive">
        <form onSubmit={create} >
            <div className="col-md-12 col-auto">
                <label for="inputEmail4" className="form-label"></label>
                <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{backgroundColor:"#E5D3B7"}}><i className="bi bi-tags"></i></div>
                    </div>
                    <div className="form-floating">
                <select id="category" className="form-select py-0" onChange={changeCategory} placeholder="Category">
                <option selected>Choose a Category...</option>
                {categories.map((b) => (
              <option className="my-2 mx-3" name={b.cname} value={b.cid}>{b.cname}</option>
                ))}
                </select>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-12 col-auto">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text" style={{backgroundColor:"#E5D3B7"}}><i className="bi bi-fonts"></i></div>
                    </div>
                    <div className="form-floating">
                        <input type="text" required className="form-control" id="title" name="title" onChange={changeBlog} placeholder="Title"/>
                        <label for="title">Title</label>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{backgroundColor:"#E5D3B7"}}><i className="bi bi-file-text"></i></div>
                    </div>
                    <div className="form-floating">
                        <textarea type="text" required className="form-control" style={{height:300+"px"}} id="content" placeholder="Content" onChange={changeBlog}/>
                        <label for="title">Content</label>
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-auto ">
                <label for="formFile" className="form-label"></label>
                <div className="input-group custom-file-button">
                <div className="input-group-text" style={{backgroundColor:"#E5D3B7"}}><i className="bi bi-paperclip"></i></div>
                    <label className="input-group-text" for="file">Upload file
                    </label>{file.name}    
                <input className="form-control" type="file" style={{ visibility: "hidden" }} id="file" name="uploadimage" onChange={changeFile} placeholder="File"/>
            </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-lg btn-outline-white m-1"  style={{backgroundColor:"#E5D3B7",color:"#5D534A",fontFamily:"Fantasy,Copperplate",fontSize:20+"px"}}>CREATE</button>
                <button type="reset" onClick={()=>{
                                                setFile({...file,name:""});
                }}className="btn btn-lg btn-outline-white m-1"  style={{backgroundColor:"#E5D3B7",color:"#5D534A",fontFamily:"Fantasy,Copperplate",fontSize:20+"px"}}>CLEAR</button>
            </div>
            </form>
            </div>
            </div>
         </div>
        </>
    );
}




