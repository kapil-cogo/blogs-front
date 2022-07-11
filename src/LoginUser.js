
import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {useParams, Link, BrowserRouter} from "react-router-dom"

const LoginUser = () => {
    const [userEmail,setUseremail] = useState("");
    const [userPassword, setUserpassword] = useState('');
    const [error,setError] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState("");


    const check = async(userEmail,userPassword) => {
        const response = await fetch("http://127.0.0.1:3000/users/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
           // const result = await response.json();
          body: JSON.stringify({
            userEmail: userEmail,
            userPassword: userPassword
          })

        
        })


        const result = await response.json()
        console.log(result)

        if(result.text){
            setError(result.text)
        }else{
            localStorage.setItem("userInfo", JSON.stringify(result));
            navigate(`/users/blogs/${result.id}`);
        }
        
        


    }

    let login=(e)=>{
        e.preventDefault()
        if(userEmail !== "" && userPassword !== '' ){
            check(userEmail,userPassword);
        }else {
            alert("all fields are required")
        }
        
    }


    return(
        <>
        
        <div className='container'>
        
        <h1 className='my-5 text-center'>Login Blog</h1>
        {<div className='container d-flex justify-content-center'>

<form  className='form__container shadow-lg p-3 mb-5 bg-body rounded' onSubmit={login}>

    <div className="row mb-2 mt-2">
        <div className="col-md-6">
        <label className="form-label">User email ID</label> 
        </div>

        <div className='col-md-6'>
        <input type="email" onChange={(e) => setUseremail(e.target.value)} className="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

    </div>

    <div className="row mb-2">
        <div className="col-md-6">
        <label className="form-label">Password</label> 
        </div>

        <div className='col-md-6'>
        <input type="password" onChange={(e) => setUserpassword(e.target.value)} className="form-control" 
        id="exampleInputPassword1" placeholder="Password" />
        </div>
    </div>

    {/* <div className="row mb-2">
        

        <div className="col-md-6">
        <label className="form-label">Description of Blog</label> 
        </div>

        <div className='col-md-6'>
        <textarea id="" name="" className='form-control' rows="4" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
    </div> */}

    {/* <div className="row mb-3">
        <div className="col-md-6">
        <label className="form-label">Upload Image</label> 
        </div>

        <div className='col-md-6'>
        <input type="text" class="form-control" required value={img_link} onChange={(e) => setImg_link(e.target.value)}/> 
        </div>
    </div> */}

    <div className='text-center'>
        {/* <Link to={`/${blog.id}`}> */}
            <Button variant='dark' className="rounded" type="submit">Login</Button>
       {/* </Link> */}
       
       
    
    </div>
    
</form>
</div>}
        
    </div>
        
        </>
    );
}

export default LoginUser;