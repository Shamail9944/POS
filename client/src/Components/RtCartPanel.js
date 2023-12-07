import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faCartArrowDown, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Badge, Table, Button, Container, Row, Col, Stack, Form, Offcanvas, Modal } from 'react-bootstrap';
import '../Styles/Home.css'


import { useSelector, useDispatch } from 'react-redux'
import { remove, getCartTotal, clearAllCart, increaseCartQuantity, decreaseCartQuantity } from '../Store/CartSlice';

import { QrReader } from 'react-qr-reader'
import QrScanner from 'qr-scanner'




const RtCartPanel = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItemsCheckOut, totalQty, totalPrice, tax, gtotal } = useSelector(state => state.Cart)
  const [open, setOpen] = useState(false)

  //Offcanvas Payment
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleClose = () => setShowOffcanvas(false);
  const toggleShow = () => setShowOffcanvas((s) => !s);

  //Offcanvas QR
  const [showOffcanvasQR, setShowOffcanvasQR] = useState(false);
  const handleCloseQR = () => setShowOffcanvasQR(false);
  const toggleShowQR = () => setShowOffcanvasQR((s) => !s);

  //get Items in cart a/w all added products details
  useEffect(() => {
    return () => { dispatch(getCartTotal()) }
    //eslint-disable-next-line
  }, [cartItemsCheckOut])

  // Add/Edit product
  const handleOffCanvasAction = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target), formDataObj = Object.fromEntries(formData.entries())
    const newObject = { ...formDataObj, totalQty, totalPrice, tax, gtotal, usid: JSON.parse(localStorage.getItem("auth"))._id, cartItemsCheckOut }
    console.log(newObject)
    //Add new product
    try {
      await axios.post('https://pos-server-gules.vercel.app/api/v1/bills/add-bill', newObject).then((res) => { console.log(res.data); })
      setShowOffcanvas(false)
      navigate('/sales-dashboard')
    } catch (error) {
      console.log(error);
    }
  }

  //Cart Items table
  const tableBody = cartItemsCheckOut.map(item => (
    <tbody key={item._id}>
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>$ {item.price}</td>
        <td style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
          <FontAwesomeIcon icon={faMinus} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2' onClick={() => dispatch(decreaseCartQuantity(item))} />
          {item.quantity}
          <FontAwesomeIcon icon={faPlus} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2' onClick={() => dispatch(increaseCartQuantity(item))} />
        </td>
        <td>$ {item.quantity * item.price}</td>
        <td>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2' onClick={() => dispatch(remove(item))} />
        </td>
      </tr>
    </tbody>
  ))




  // QRSCAN
  const [productById, setProductById] = useState(null)
  const [scanResult, setScanResult] = useState(null)
  const [scanData, setScanData] = useState(null)
  const [webCamResult, setWebCamResult] = useState('')
  const qrRef = useRef()
  //File Scan
  const handleChange = async (e) => {
    setScanData(e.target)
    qrRef?.current?.click();
    const file = e.target.files[0]
    // console.log(file)
    const result = await QrScanner.scanImage(file)
    // console.log(result);
    setScanResult(result)
    getProductById(result)
  }
  //Get product by Id
  const getProductById = async (scanResult) => {
    try {
      await axios.get(`https://pos-server-gules.vercel.app/api/v1/items/get-item/${scanResult}`).then((res) => { console.log(res.data); setProductById(res.data) })

      console.log(productById);
    } catch (error) {
      console.log(error);
    }
  }
  //WebCam Detection
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setWebCamResult(result)
      console.log(result)
    }
  }

  return (
    <>
      <div className={` ${open ? "w-rtopen" : "w-rtclose"} rt-cart-panel bg-black text-light`}>

        {/* open/close btn */}
        <div className="openClose">
          <img src='/assets/icons/ArrowBRt.png' onClick={() => setOpen(!open)} alt='Logo' className={` ${!open && "rotate-180 slow-mo"}  ${open && "slow-mo rotate-180"} imgLogoRt`} />
        </div>

        {/* Cart Icon + QR */}
        <div className="cart-header">
          <div >
            <Badge bg="warning" className='badge'>{cartItemsCheckOut.length} </Badge>
            <FontAwesomeIcon icon={faCartArrowDown} style={{ color: "#ea7c69", cursor: "pointer" }} size='2xl' className='mt-3' onClick={() => setOpen(!open)} />
            <h1 className={`${!open && "scale-0 hidden"} fs-400 my-1`}>Cart</h1>
          </div>
          <Button variant="dark" onClick={toggleShowQR} className={`${!open && "scale-0 hidden"} mx-3 mt-2`} style={{ backgroundColor: "transparent", border: "none" }}>
            <FontAwesomeIcon icon={faQrcode} style={{ color: "#ea7c69", }} size='2xl' /> <br />QR Scan
          </Button>{' '}
        </div>


        {/* Cart Table Header  */}
        <div className={`${!open && "scale-0 hidden"} cart-table`} style={{ overflowY: "scroll", width: "100%" }}>
          <Table variant="dark" responsive="sm" >
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            {tableBody}
          </Table>
        </div>


        {/* Cart added Products  */}
        <div className={`${!open && "scale-0 hidden"} payment-sec`}>
          <Container>
            <Row>
              <h4>Total</h4>
              <Col>
                <Stack>
                  <span>Items (Qty)</span>
                  <span>Cost ($)</span>
                  <span>Tax ($)</span>
                  <span>Grand Total ($)</span>
                </Stack>
              </Col>
              <Col>
                <Stack>
                  <span>{totalQty}</span>
                  <span>{totalPrice}</span>
                  <span>{tax}</span>
                  <span>{gtotal}</span>
                </Stack>
              </Col>

              <Col>
                <div className="Checkout">
                  <Button className='mx-1 my-1' variant="outline-warning" onClick={() => dispatch(clearAllCart())}>Clear Cart</Button>{' '}
                  <Button className='mx-1 my-1' variant="success" onClick={toggleShow} >Checkout</Button>{' '}
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </div>


      {/* Check Out Off Canvas - Go to Payment sec */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} scroll={true} backdrop={true} placement='end' style={{ backgroundColor: "black", color: "white" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ justifyContent: "center" }}>Check Out</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleOffCanvasAction} id="myAddBillForm">

            <div className="d-flex " >
              <Form.Group className="mb-2 mx-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control name='customerName' type="text" placeholder="Enter First & Last name" autoFocus />
              </Form.Group>
              <Form.Group className="mb-2 mx-3">
                <Form.Label>Customer Number</Form.Label>
                <Form.Control name='customerNumber' type="text" placeholder="Enter Contact for updates" />
              </Form.Group>
            </div>

            <Form.Group className="mb-3 mx-3">
              <Form.Label>Select Payment Mode</Form.Label>
              <Form.Select name='paymentMode' type="text">
                <option>Pay with ...</option>
                <option>Cash</option>
                <option>Card</option>
              </Form.Select>
            </Form.Group>
            <h6 className='mt-5'>Items (Qty) - {totalQty}</h6>
            <h6>Cost ($) - {totalPrice}</h6>
            <h6>Tax ($) - {tax}</h6>
            <h6>Grand Total ($) - {gtotal}</h6>
            <p className='mt-5'>Thanks for shopping with us.</p>
          </Form>
          <Button variant="success" type="submit" form="myAddBillForm">Payment done - Print Reciept</Button>
        </Offcanvas.Body>
      </Offcanvas>


      {/* QR Code Scan */}
      <Modal show={showOffcanvasQR} onHide={() => { handleCloseQR(); setScanResult(null) }}>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div>
              <h6>QR File Scan</h6>
              {scanResult && (
                <div>
                  <img src={URL.createObjectURL(scanData.files[0])} alt='Scanned QR Code' />
                  <h6>Scanned result: {scanResult}</h6>
                </div>
              )}
              {productById && (
                <div>
                  <h6>Name: <span className=''></span>{productById.name}</h6>
                  <h6>Category: {productById.category}</h6>
                  <h6>Price/ unit: {productById.price}</h6>
                  <h6>Qty In Store: {productById.quantity}</h6>
                  <img src={productById.image} height={150} width={150} alt='Scanned QR Code' />
                </div>
              )}
              <input type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} ref={qrRef} />
            </div>

            {/* <div>
              <h6>QR Cam Detector</h6>
              <QrReader delay={800} style={{ width: "100%" }} onError={handleErrorFile} onScan={handleScanFile} facingMode={"environment"} />
              {webCamResult && (
                <div>
                  <h6>Scanned result: {webCamResult}</h6>
                </div>
              )}
            </div> */}
          </div>
        </Modal.Body>
      </Modal>



      {/* CArt label glow */}
      <div className="fancy-text-Rt" >
        <h5 className={`${open && "scale-0 hidden"} slow-mo`} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>Cart</h5>
      </div >


    </>
  )
}

export default RtCartPanel