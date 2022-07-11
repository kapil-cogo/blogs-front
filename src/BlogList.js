import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogItem from "./BlogItem";
import LoginUser from "./LoginUser";

function BlogList(props){
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    // const params = useParams();

    useEffect(() => {
        const localblogs = localStorage.getItem("blogs");
        if (localblogs.length > 2) {
            //console.log("not hello");
          setBlogs(JSON.parse(localblogs));
        } else {
          //console.log("hello");
          fetch(
            "http://127.0.0.1:3000/blogs"
          )
            .then((res) => res.json())
            .then((blogs) => {
              //set movie state
              setBlogs(blogs);
            });
        }
      }, []);

      useEffect(() => {
        localStorage.setItem("blogs", JSON.stringify(blogs));
      }, [blogs]);

    const handClick = () => {
        fetch(`http://127.0.0.1:3000/blogs/search/${search}`).then((res) => res.json()).then((blogs) => {
            setBlogs(blogs);
          });
    };

    return(
    <>
        <div className="whole-page">
        <div className="top">
          <h1 id = 'title'>Knock Knock</h1>

        <div className="add-search">
        <div className="login">
            <Link to={`/login`}>
            <button>Login</button>
            </Link>
        </div>  
        <div className="add-blog">
                <Link to={`/create`}>
                    <button className="Button">Add new</button>
                </Link>
        </div>
        
        <div className="search-fav">
        <div>
              <input
                type="text"
                placeholder="Search Blogs here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="Button" onClick={handClick}>    
                Search
              </button>
            </div>
          </div>
        </div>
        
        
        </div>

        {/* <div className= "blog-section"> */}
          {blogs && (
            <div className="blogs-section">
              {blogs.map((blog) => (
                
                  <div className="single-blog">
                        <div className="blog-title"><h3>{blog.title}</h3></div> 
                        <div className="img-short-open">

                            <div className="img"> <img src={blog.img_link}/> </div>

                            <div className="short-open">
                                <div className="short-desc">
                                    <div className="desc">{blog.short_desc}</div>
                                </div>
                                <div className="open-like">
                                    <div>
                                    <Link to={`/${blog.id}`}>
                                    <button>Open</button>
                                    </Link>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                                

                  </div>

                
              ))}
            </div>
          )}
       
      </div>  
    </>);
}




export default BlogList;
