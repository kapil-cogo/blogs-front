import React, { useState, useEffect } from "react";
//import { movies } from "./movies";
import { Link, useParams, useNavigate } from "react-router-dom";

function BlogItem(){

    const params = useParams();
    let [details, setDetails] = useState();
    const navigate = useNavigate();


    useEffect(()=>{
        // http://127.0.0.1:3000/blogs
        fetch(
`http://127.0.0.1:3000/blogs/${params.id}`).then((res) => res.json()).then((details) => {
                //set movie state
                setDetails(details);
            });
    }, [])

    const handleClick = () => {
        fetch(`http://127.0.0.1:3000/${params.id}`,{
            method: "DELETE"
        }).then( () => {
            navigate('/');
        })
    }

    return(<>
        <div className="whole-single">

            <div>
                <Link to={"/"}>
                        <button>Back</button>{" "}
                </Link>
            </div>
            
            {details && <div className="single-blog-container">

                    <div><h3>{details.title}</h3></div> 
                    <div className="img-desc">
                        <img src={details.img_link}/>
                        <div className="desc-ed">
                            <div className="description">{details.description}</div>
                               <div className="ed-dl">
                                  <div className="ed"><Link to={`/edit/${params.id}`}><button>Edit Blog</button>         
                                  </Link> </div>
                                  <div className="del"><button onClick={handleClick}>Delete</button></div>
                               </div>
                            </div>
                            
                        
                        
                    </div>
                    
                    

                    
                    
                

                

            </div>

        } 

        
    
    </div>
    </>

    );
}

export default BlogItem;