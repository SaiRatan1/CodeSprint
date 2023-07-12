import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Homepage from './components/homepage'
import Question from './components/question'


function App() {


    return (
        <Router>
            {/* <Navbar/> */}
            <Routes>
                <Route exact path='/' element={<Homepage />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/problems/:id' element={<Question />}/>
            </Routes>
        </Router>
    )
}

export default App
