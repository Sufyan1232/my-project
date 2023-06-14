import React from 'react'
import "./App.css"
import Search from './pages/Search'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import { BrowserRouter, Routes, Route, Link, useParams} from "react-router-dom"
import {Navbar, Container, Nav} from "react-bootstrap"
import Test from './Test';

export default function Page() {
    return (
        <BrowserRouter>
        <div className='main__page'>   
<div >
        <Navbar>
            <Container className='div1'>
            <Nav.Link as={Link} to="/"> <img className='im1' src='https://cdn-icons-png.flaticon.com/512/25/25694.png' width="30"/></Nav.Link>
            <Nav.Link as={Link} to="Search"><img className='im2' src='https://cdn-icons-png.flaticon.com/512/3917/3917754.png' width="30"/></Nav.Link>
            <Nav.Link as={Link} to="Profile"><img className='im3' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' width="30"/></Nav.Link>
            <Nav.Link as={Link} to="Setting"><img className='im4' src='https://cdn-icons-png.flaticon.com/512/3524/3524659.png' width="30"/></Nav.Link>
            </Container>
        </Navbar>
</div>

     <div>
<Routes>
    <Route path="/" element={<Test  />}/>
    <Route path="/search" element={<Search />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/setting" element={<Setting />}/>
</Routes>
</div> 
</div>
    
    </BrowserRouter>
    )
  }


  