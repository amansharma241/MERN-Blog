import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import About from './Components/About';
import Projects from './Components/Projects';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}