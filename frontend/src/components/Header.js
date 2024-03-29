import React from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { LinkContainer } from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant = 'dark' expand="lg" collapseOnSelect>
  <Container>
    <LinkContainer to ='/'>
    <Navbar.Brand>Magazin Online</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <SearchBox />
      <Nav className="ms-auto">
      <LinkContainer to ='/cart'>
        <Nav.Link >
          <i className='fas fa-shopping-cart'></i> Cos
          </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Deconectare
              </NavDropdown.Item>
            </NavDropdown>
          ) :  (<LinkContainer to ='/login'>
          <Nav.Link>
            <i className='fas fa-user'></i>Autentificare
            </Nav.Link>
            </LinkContainer>
            )}
         {userInfo && userInfo.isAdmin && (
           <NavDropdown title='Admin' id='adminmenu'>
           <LinkContainer to='/admin/userList'>
             <NavDropdown.Item>Utilizatori</NavDropdown.Item>
           </LinkContainer>
           <LinkContainer to='/admin/productList'>
             <NavDropdown.Item>Produse</NavDropdown.Item>
           </LinkContainer>
           <LinkContainer to='/admin/orderList'>
             <NavDropdown.Item>Comenzi</NavDropdown.Item>
           </LinkContainer>
          
         </NavDropdown>
         )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header