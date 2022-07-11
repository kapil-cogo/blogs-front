import logo from './logo.svg';
import BlogList from './BlogList';
import './App.css';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import BlogItem from './BlogItem';
import EditBlogScreen from './EditBlogScreen';
import CreateBlogScreen from './CreateBlogScreen';
import LoginUser from './LoginUser';
import UserBlogsList from './UserBlogsList';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/:id' element={ <BlogItem /> } exact/>
      <Route path='/' element={ <BlogList /> } exact />
      <Route path='/edit/:id' element={ <EditBlogScreen /> } exact />
      <Route path='/create' element={ <CreateBlogScreen />} exact/>
      <Route path='/login' element={ <LoginUser />} exact/>
      <Route path = '/users/blogs/:userID' element={<UserBlogsList />} exact/>
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
