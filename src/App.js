
import { useState } from 'react';
import './App.css';
import BlogHome from './BlogHome';
import Login from './Login';
import Register from './Register';

function App() {
let [page,setpage]=useState();
let log=(value)=>{
  setpage(value);
}

let changeTo=(a)=>{
  setpage(a);
  console.log(a);
}


  if(page=="register"){
    return(
      <Register goBack={changeTo}/>
    )
  }else if(page=="login"){
    return (
    <Login logout={log}/>
  )
  }else{
    return(
      <BlogHome changePage={changeTo}/>
    )
  }
}

export default (App);
