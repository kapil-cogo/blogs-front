import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'
import {useNavigate, useParams} from "react-router-dom"

// {"id":1,
// "title":"Pirates",
// "short_desc":"Johny Depp, Barbossa",
// "description":"qwertyuiopoihgfdsdfgh",
// "img_link":"sdfg","created_at":null,"updated_at":null}

const CreateBlogScreen = () => {
    const [blog,setBlog] = useState({});
    const [errorMessage,setErrorMessage] = useState("");
    const params = useParams();
    const [id ,setId] = useState(params.id);
    const [title,setTitle] = useState("");
    const [short_desc,setShort_desc] = useState("");
    const [description,setDescription] = useState("");
    const [img_link,setImg_link] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        const  getBlog= async(id) => {
            const response = await fetch(
                `http://127.0.0.1:3000/blogs`
              );
          
              const result = await response.json();
          
              if (response.ok) {
                console.log("database is there")
                // setBlog(result);
                // setTitle(result.title)
                // setShort_desc(result.content)
                // setImg_link(result.image)
                // setDescription(result.description)
                
              } else {
                setErrorMessage(result.message);
              }
        }

        // getBlog(id);
    }, [])
    
    const handleClick = () => {
        fetch(`http://127.0.0.1:3000/blogs`,{
            // method: "POST"
        }).then( () => {
            navigate('/');
        })
    }
    const createBlog =  async() => {
        const response  = await fetch(`http://127.0.0.1:3000/blogs`,{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                title : title,
                description : description,
                img_link : img_link,
                short_desc : short_desc,
                //users_id : users_id
              })
            
        })
    
        return console.log(response);
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        createBlog();
    }
    




    return (
        <>

    <div className='container'>
        
        <h1 className='my-5 text-center'>Create Blog</h1>
        {blog && <div className='container d-flex justify-content-center'>

    <form onSubmit={submitHandler} className='form__container shadow-lg p-3 mb-5 bg-body rounded'>
    <div className="row mb-2 mt-2">
        <div className="col-md-6">
        <label className="form-label">Title of Blog</label> 
        </div>

        <div className='col-md-6'>
        <input type="text" class="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} /> 
        </div>

    </div>

    <div className="row mb-2">
        <div className="col-md-6">
        <label className="form-label">Short Description of Blog</label> 
        </div>

        <div className='col-md-6'>
        <textarea id="from-label" name="" className='form-control' rows="4" cols="50" value={short_desc} onChange={(e) => setShort_desc(e.target.value)}></textarea>
        </div>

        <div className="col-md-6">
        <label className="form-label">Description of Blog</label> 
        </div>

        <div className='col-md-6'>
        <textarea id="" name="" className='form-control' rows="4" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
        <label className="form-label">Upload Image</label> 
        </div>

        <div className='col-md-6'>
        <input type="text" class="form-control" value={img_link} onChange={(e) => setImg_link(e.target.value)}/> 
        {/* <input type="file" id="img" name="img" accept="image/*" required/> */}
        </div>
    </div>

    <div className='text-center'>
    <Button variant='dark' className="rounded" type="submit" onClick={handleClick}>Create</Button>
    </div>
    
</form>
</div>}
        
    </div>
        </>
    );
}


export default CreateBlogScreen;