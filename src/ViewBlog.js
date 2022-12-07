import { useEffect, useState } from "react"
import Blog from "./Blog";
import axios from "axios";
import html2pdf from 'html2pdf.js';

export default function SingleBlog(props) {

    const [blog, setBlog] = useState(new Blog());
    const [catName, setCatName] = useState("");
    const [flag, setFlag] = useState(false);
    const [get, setGet] = useState([{ name: "", url: "" }])
    const [file, setFile] = useState();
    const [userName, setUserName] = useState("");
    const [d, setDate] = useState("");

    const [comments, setComments] = useState([]);
    const [msg, setMsg] = useState("");
    const [comment, setComment] = useState();
    const [u, setUser] = useState();

    const [liked, setLiked] = useState(true);
    const [comON, setComON] = useState();

    useEffect(() => {
        if (!flag) {
            fetch("http://localhost:8085/blog/"+props.bid)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setBlog(data);
                    setFlag(true);
                    setCatName(data.category.cname);
                    setUserName(data.createdBy.name);
                    setDate(data.date.substring(0, 10));
                    setComments(data.comments);
                })

            fetch("http://localhost:8085/findUser/"+props.user1)
                .then((response) => response.json())
                .then((data) => {
                    console.log("user")
                    console.log(data);
                    setUser(data);
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

            fetch("http://localhost:8085/comments/"+props.bid)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
        }
    })

    const options1 = {
        margin: 0.5,
        filename: 'Blog.pdf',
        image: {
            type: 'jpeg',
            quality: 500
        },
        html2canvas: {
            scale: 1
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    }
    
    let changeMsg = (event) => {
        setMsg(event.target.value);
    }
    let addComment = () => {

        console.log(msg);
        console.log("userid");
        console.log(props.user1);



        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: null,
                    message: msg,
                    blog: {
                        id: props.bid,
                        title: null,
                        category: {},
                        status: null,
                        content: null,
                        date: null,
                        noOfLikes: 0
                    },
                    user: {
                        userId: props.user1,
                        password: null,
                        role: null,
                        name: null,
                        email: null,
                        profilePic: {
                            id: null,
                            name: null,
                            type: null
                        },
                        following: []
                    },
                    noOfLikes: 0,
                    date: null
                }

            )
        }

        fetch("http://localhost:8085/addComment", options)
            .then((response) => response = response.json())
            .then((data) => {
                console.log(data);
                setFlag(false);
            })
    }

    let toggle = () => {
        fetch("http://localhost:8085/like/" + props.bid + "/" + liked)
            .then((response) => {
                response = response.json()
            })
            .then((data) => {
                console.log(data);
                console.log(liked);
                setFlag(false);
            })
        let localLiked = liked;
        localLiked = !localLiked;
        setLiked(!liked);
    };

    let commentON = (event) => {
        console.log(event.target.value);
    }

    let click = (e) => {
        e.preventDefault();
       const element = document.getElementById('blog');
        html2pdf().from(element).set(options1).save();
    }

    let backFn = () => {
        props.goBack();
    }


    return (
        <div>
            <div class="card"  >
                <div class="card-header" style={{ backgroundColor: "rgb(232, 207, 166)" }} >
                    <h1>{catName}</h1>
                </div>
                <div class="card-body" >
                <div id="blog">
                    <blockquote class="blockquote mb-0" >
                        <h1>{blog.title}</h1>

                        <footer class="blockquote-footer mb=0">Written by
                            <cite className="ms-2" title="Source Title">
                                {userName}
                            </cite>
                        </footer>

                        <div className="container">


                            <div
                                className="container"
                                onClick={() => toggle()}
                            >

                                {liked == true ? (
                                    <i class="bi bi-heart "></i>

                                ) : (
                                    <i class="bi bi-heart-fill text-danger"></i>
                                   
                                )}

                                <span>{blog.noOfLikes} likes</span>
                            </div>

                        </div>

                    </blockquote>
                    <p className="card-text">{d}</p>

                    {(() => {
                        if ((blog.file) == null) {
                            return (
                                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlKRD7mIbkf3r9mdQktp2bfqW1GQztuBcILQ&usqp=CAU" alt="Card image cap" />
                            )
                        } else {
                            return (
                                get.filter(file => file.url.substring("http://localhost:8085/files/".length) == blog.file.id).map((e) => (
                                    <img className="card-img-top" src={e.url} alt="img" />
                                ))
                            )
                        }
                    })()}

                    <div class="card-text mt-5">
                        <p >{blog.content}</p>
                    </div>
                </div>

                    <div className="text-center">
                        <button className='btn btn-lg btn-outline-primary m-2' onClick={click}>DOWNLOAD</button>
                        <button className='btn btn-lg btn-outline-danger m-2' onClick={backFn}>Back</button>
                    </div>

                    <div className="container mt-5">
                        <div class="row  d-flex justify-content-center">

                            <div class="col-md-8">
                                <div class="headings d-flex justify-content-between align-items-center mb-3">
                                    <h5>Comments</h5>

                                    <div class="buttons">

                                        <span class="badge bg-white d-flex flex-row align-items-center">
                                            
                                        </span>

                                    </div>

                                </div>

                                <div >
                                    {
                                        comments.map((comment) => (
                                            <div class="card p-3 my-2">

                                                <div class="d-flex justify-content-between align-items-center">

                                                    <div class="user d-flex flex-row align-items-center">
                                                        {(() => {
                                                            if ((comment.user) == null) {
                                                                return (
                                                                    <div>
                                                                        <img src="data:image/png;base64,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" width="30" class="user-img rounded-circle mr-2" />
                                                                        <span>
                                                                            <small className="fw-bold text-primary">
                                                                                Deleted user </small>

                                                                            <small className="fw-bold">
                                                                                {comment.message}
                                                                            </small>
                                                                        </span>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div>
                                                                        {(() => {
                                                                            if ((comment.user.profilePic) == null) {
                                                                                return (
                                                                                    <img src="data:image/png;base64,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" width="30" class="user-img rounded-circle mr-2" />

                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    get.filter(file => file.url.substring("http://localhost:8085/files/".length) == comment.user.profilePic.id).map((e) => (
                                                                                        <img src={e.url} alt="img" width="30" class="user-img rounded-circle mr-2" />
                                                                                    ))
                                                                                )
                                                                            }
                                                                        })()}
                                                                        <span>
                                                                            <small className="fw-bold text-primary">
                                                                                {comment.user.name} </small>

                                                                            <small className="fw-bold">
                                                                                {comment.message}
                                                                            </small>
                                                                        </span>

                                                                    </div>
                                                                )
                                                            }
                                                        })()}

                                                    </div>

                                                    {(() => {
                                                        if (comment.date) {
                                                            return (
                                                                <small>{comment.date.substring(0, 10)}</small>
                                                            )
                                                        }
                                                    })()}




                                                </div>


                                                <div class="action d-flex justify-content-between mt-2 align-items-center">

                                                    <div class="reply px-4">
                                                        <span class="dots"></span>

                                                    </div>

                                                </div>

                                            </div>



                                        ))
                                    }
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="message" onChange={changeMsg} placeholder="Post a comment" />
                                        <label for="message">Post a comment</label>
                                    </div>
                                    <br />
                                    <button className="btn btn-primary" onClick={addComment}>Add comment</button>

                                </div>

                            </div>
                        </div>

                    </div>


                </div>



            </div>

        </div>
    )
}