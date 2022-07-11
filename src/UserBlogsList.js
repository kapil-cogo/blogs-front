import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserBlogsList(){
    const [userBlogs, setUserblogs] = useState([]);
    const [user, setUser] = useState([]); 
    const params = useParams();
    const [id, setId] = useState("");

    useEffect(() => {
        const localuserblogs = localStorage.getItem("userblogs");
        if (localuserblogs?.length > 2) {
            //console.log("not hello");
          setUserblogs(JSON.parse(localuserblogs));
        } else {
          //console.log("hello");
          fetch(
            `http://127.0.0.1:3000/users/blogs/${params.userID}`
          ).then((res) => res.json())
          .then((userBlogs) => {
              //set movie state
              setUserblogs(userBlogs);
            });
        }
      }, []);

      useEffect(() => {
        localStorage.setItem("userblogs", JSON.stringify(userBlogs));
      }, [userBlogs]);

    // const handClick = () => {
    //     fetch(`http://127.0.0.1:3000/blogs/search/${search}`).then((res) => res.json()).then((blogs) => {
    //         setUserblogs(userBlogs);
    //       });
    // };
    

    

    return(<>
            <div className="whole-page">

            {userBlogs && (
            <div className="blogs-section">
              {userBlogs.map((userblog) => (
                
                  <div className="single-blog">
                        <div className="blog-title"><h3>{userblog.title}</h3></div> 
                        <div className="img-short-open">

                            <div className="img"> <img src={userblog.img_link}/> </div>

                            <div className="short-open">
                                <div className="short-desc">
                                    <div className="desc">{userblog.short_desc}</div>
                                </div>
                                <div className="open-like">
                                    <div>
                                    <Link to={`/${userblog.id}`}>
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


export default UserBlogsList;