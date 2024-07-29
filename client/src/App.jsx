import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import About from './Components/About';
import Projects from './Components/Projects';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import FooterComp from './Components/FooterComp'
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import CreatePost from './Components/CreatePost';
import UpdatePosts from './Components/Dashboard/UpdatePosts';
import PostPage from './Components/PostPage';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/update-post/:post-id" element={<UpdatePosts/>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/post/:postSlug" element = {<PostPage/>}/>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}