import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import Login from './components/Login';
import EditProfile from './components/ProfileEdit/EditProfile'
import Signup from './components/Signup';


function App() {
  return (
    <Router>
        <Routes>
           <Route exact path='/' element={<Login/>}/>

           <Route exact path='/signup' element={<Signup/>}/>

           <Route exact path='/home' element={<HomePage/>}/>

           <Route  path='/edit-post' element={<EditProfile/>}/>

           <Route  path='/document/:id' />
           

        </Routes>
    </Router>
  );
}

export default App;
