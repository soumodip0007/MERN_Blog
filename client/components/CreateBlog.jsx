import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadGif from "../src/assets/uploadVid.mp4"; // Adjust the path accordingly

const CreateBlog = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("details", details);

    axios
      .post("http://localhost:4000/upload", formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-blog-container">
      <h1>Create a New Blog</h1>
      <form>
        <div className="form-group">
          <div className="input-field">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-area"
              required
            />
            <label htmlFor="title" className="label-area">
              Write Blog Title:{" "}
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-field">
            <textarea
              rows={10}
              id="details"
              value={details}
              className="input-area"
              onChange={(e) => setDetails(e.target.value)}
              required
            ></textarea>
            <label htmlFor="details" className="label-area">
              Write Blog Details:
            </label>
          </div>
        </div>

        <div className="file-form-group">
  <div className="file-input-field">
    <p>Upload Blog Image</p>
    <label htmlFor="image" className="file-label-area">
      <video width="200" height="200" className="upload-video" autoPlay loop muted>
        <source src={uploadGif} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </label>
    <input
      type="file"
      id="image"
      className="file-input-area"
      onChange={(e) => setFile(e.target.files[0])}
      required
    />
  </div>
</div>


        <div className="btn">
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
