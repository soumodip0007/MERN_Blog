import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", details: "", image: "" });
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('details', blog.details);
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('image', blog.image); // append existing image name if no new file is selected
    }

    axios
      .put(`http://localhost:4000/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <label htmlFor="title">Edit Blog Title: </label>
      <input
        type="text"
        id="title"
        name="title"
        value={blog.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="details">Edit Blog Details:</label>
      <textarea
        id="details"
        name="details"
        value={blog.details}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="image">Re-Upload Blog Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleFileChange}
      />
      {blog.image && !file && (
        <div>
          <p>Current Image: {blog.image}</p>
          <img src={`http://localhost:4000/images/${blog.image}`} alt={blog.title} width="100" />
        </div>
      )}

      <button onClick={handleUpdate}>Update Blog</button>
    </div>
  );
};

export default EditBlog;
