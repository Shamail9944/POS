import React, { useState } from 'react'
import '../Styles/Home.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMoneyBill, faFolderClosed, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const LtNavPanel = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={` ${open ? "w-ltopen" : "w-ltclose"} lt-nav-panel bg-black text-light`}>
        <div className="openClose">
          <img src='/assets/icons/ArrowBLt.png' onClick={() => setOpen(!open)} alt='open/close panel' className={` ${!open && "rotate-180 slow-mo"}  ${open && "slow-mo"} imgLogoLt`} />
        </div>

        <div className="fancy-text-Lt">
          <h5 className={`${open && "scale-0 hidden"} slow-mo`} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>Navigate</h5>
        </div>

        <div className='Logo-d mb-3'>
          <Nav.Link to="/" as={Link} style={{ display: "flex", alignItems: "center" }}>
            <img src="/assets/icons/Logo2.png" alt="Logo" className='Logo text-light' />
            <h1 className={`${!open && "scale-0 hidden"} fs-400 my-3`}>HS Colab POS</h1>
          </Nav.Link>
        </div>

        <Navbar style={{ justifyContent: "center" }}>
          <Nav className='navbar-dark'>
            <Nav.Link to="/" as={Link} style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faHome} style={{ color: "#ea7c69" }} size='xl' className='my-3 nav-fa home-logo' />
              <span className={`${!open && "scale-0 hidden"} mx-3`}>Home</span>
            </Nav.Link>
            <Nav.Link to="/sales-dashboard" as={Link} style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faMoneyBill} style={{ color: "#ea7c69", }} size='xl' className='my-3 sales-logo' />
              <span className={`${!open && "scale-0 hidden"} mx-3`}>Sales</span>
            </Nav.Link>
            <Nav.Link to="/admin-dashboard" as={Link} style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faFolderClosed} style={{ color: "#ea7c69", }} size='xl' className='my-3 admin-logo' />
              <span className={`${!open && "scale-0 hidden"} mx-3`}>Admin</span>
            </Nav.Link>
            <Nav.Link to="/login" as={Link} style={{ display: "flex", alignItems: "center" }}
              onClick={() => { localStorage.removeItem("auth") }}            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#ea7c69", }} size='xl' className='my-3 logout-logo' />
              <span className={`${!open && "scale-0 hidden"} mx-3`}>Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar>

      </div>
    </>)
}

export default LtNavPanel