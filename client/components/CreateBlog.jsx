import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('details', details);

    axios
      .post('http://localhost:4000/upload', formData)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <label htmlFor="title">Blog Title: </label>
      <input
        type="text"
        placeholder="Write Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="details">Blog Details:</label>
      <textarea
        placeholder="Write Blog Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      ></textarea>

      <label htmlFor="image">Add a Blog Image: </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default CreateBlog;
