import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .get("http://localhost:4000/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:4000/blogs/${id}`)
      .then((res) => {
        fetchBlogs(); 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const navigateToEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.details}</p>
          <img src={`http://localhost:4000/images/${blog.image}`} alt={blog.title} />
          <div>
            <button onClick={() => navigateToEdit(blog._id)}>Edit</button>
            <button onClick={() => deleteBlog(blog._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
