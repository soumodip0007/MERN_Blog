import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogList from '../components/BlogList';
import CreateBlog from '../components/CreateBlog';
import Navbar from '../components/Navbar';
import EditBlog from '../components/EditBlog';
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
