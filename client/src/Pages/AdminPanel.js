import React, { useState, useEffect, useRef } from 'react'
import LtNavPanel from './../Components/LtNavPanel';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Store/ProductSlice';
import axios from 'axios'
import { Button, Table, Image, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faSquarePlus, faPrint, faDownload, faQrcode } from '@fortawesome/free-solid-svg-icons'
import '../Styles/AdminPanel.css'
import QRCode from 'qrcode'
import { useReactToPrint } from "react-to-print"


const AdminPanel = () => {

    const componentRef = useRef()

    //get all products from db for inventory display
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getProducts()) }, [dispatch])
    const { data: products } = useSelector(state => state.Products)

    //popup Add Item modal states toggle
    const [showPopUp, setShowPopUp] = useState(false);
    const [editItem, setEditItem] = useState(null)


    //Generate QR Code
    const [showQRPopUp, setQRShowPopUp] = useState(false);
    const [QRItemData, setQRItemData] = useState(null)
    const [QRImgUrl, setQRImgUrl] = useState("")
    const genQRCode = async (id) => {
        try {
            const res = await QRCode.toDataURL(id)
            setQRImgUrl(res);
        } catch (error) {
            console.log(error);
        }
    }


    // map inventory items in table body from db data
    let index = 0;
    const tableBody = products.map(product => (
        <tbody key={product._id}>
            <tr>
                <td>
                    {index = index + 1}
                </td>
                <td>{product._id}</td>
                <td><Image src={product.image} thumbnail width={"40px"} /></td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>
                    <Button className='card-btn' variant="dark">
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2'
                            onClick={() => { setShowPopUp(true); setEditItem(product); }} />
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2'
                            onClick={() => handleDelete(product._id)} />
                    </Button>
                </td>
                <td>
                    <Button className='card-btn' variant="dark">
                        <FontAwesomeIcon icon={faQrcode} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2'
                            onClick={() => { setQRShowPopUp(true); setQRItemData(product); genQRCode(product._id) }} />
                    </Button>
                </td>
            </tr>
        </tbody>
    ))


    //Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://pos-server-gules.vercel.app/api/v1/items/delete-item/${id}`).then((res) => { console.log(res.data); })
            dispatch(getProducts())
        } catch (error) {
            console.log(error);
        }
    }

    // Add/Edit product
    const handleFormAction = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        // console.log(formDataObj)

        if (editItem === null) {
            //Add new product
            try {
                await axios.post('https://pos-server-gules.vercel.app/api/v1/items/add-item', formDataObj).then((res) => { console.log(res.data); })
                setShowPopUp(false)
                dispatch(getProducts())
            } catch (error) {
                console.log(error);
            }
        } else {
            //Edit product
            try {
                await axios.put(`https://pos-server-gules.vercel.app/api/v1/items/edit-item/${editItem._id}`, { data: formDataObj }).then((res) => { console.log(res.data); })
                setShowPopUp(false)
                setEditItem(null)
                dispatch(getProducts())
            } catch (error) {
                console.log(error);
            }
        }
    }

    //Handle Print
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    return (
        <>
            <div className="home-layout">
                <LtNavPanel />
                <div className="home-product-cards">
                    <div className="admin-panel" style={{ overflow: "scroll" }}>

                        {/* Admin Panel header */}
                        <div className="admin-func-btns" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h1 className='text-light'>Admin Panel</h1>
                            <Button className='card-btn' variant="light" style={{ position: "absolute", right: "12px" }} onClick={() => setShowPopUp(true)}>
                                <FontAwesomeIcon icon={faSquarePlus} style={{ color: "#ea7c69", cursor: "pointer", marginRight: "5px" }} />
                                Add New Item
                            </Button>
                        </div>

                        {/* Inventory All Products Table */}
                        <div className="admin-table mx-4">
                            <Table striped="rows" size='sm' variant="dark">
                                <thead>
                                    <tr style={{ verticalAlign: "middle" }}>
                                        <th>#</th>
                                        <th>Db Id</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                        <th>QR  </th>
                                    </tr>
                                </thead>
                                {tableBody}
                            </Table>
                        </div>

                        {/* Add/Edit PopUp */}
                        {showPopUp && (
                            <Modal show={showPopUp} onHide={() => { setShowPopUp(false); setEditItem(null) }} backdrop="static" keyboard={false} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>{`${editItem !== null ? 'Edit Item' : 'Add Item'}`}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleFormAction} id="myAddEditForm">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control name='name' type="text" placeholder="Product & Company name" autoFocus
                                                defaultValue={`${editItem !== null ? editItem.name : ''}`} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control name='price' type="text" placeholder="Price === $"
                                                defaultValue={`${editItem !== null ? editItem.price : ''}`} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control name='quantity' type="text" placeholder="Always enter quantity = 1"
                                                defaultValue={`${editItem !== null ? editItem.quantity : ''}`} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select name='category' type="text"
                                                defaultValue={`${editItem !== null ? editItem.category : ''}`}>
                                                <option>Select Category</option>
                                                <option>Drinks</option>
                                                <option>Rice</option>
                                                <option>Noodles</option>
                                                <option>Electronics</option>
                                                <option>Computer</option>
                                                <option>Mobile</option>
                                                <option>Clothing</option>
                                                <option>Toys</option>
                                                <option>Games</option>
                                                <option>Decor</option>
                                                <option>Cosmetics</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Image Url</Form.Label>
                                            <Form.Control name='image' type="text" placeholder="enter valid url copyright free / cdn link"
                                                defaultValue={`${editItem !== null ? editItem.image : ''}`} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" type="submit" form="myAddEditForm">Save to Db</Button>
                                </Modal.Footer>
                            </Modal>
                        )}

                        {/* QRCode PopUp */}
                        {showQRPopUp && (
                            <Modal show={showQRPopUp} onHide={() => { setQRShowPopUp(false); }} backdrop="static" keyboard={false} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>QR Code Manager</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h3><span style={{ color: "#ea7c69" }}>Product name -</span> {QRItemData.name}</h3>
                                    <h5><span style={{ color: "#ea7c69" }}>Product id -</span> {QRItemData._id}</h5>
                                    <h5><span style={{ color: "#ea7c69" }}>Product category -</span> {QRItemData.category}</h5>
                                    <br />
                                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%", display: "flex", alignItems: "center" }}>
                                        {QRImgUrl ? (<a href={QRImgUrl} download><img src={QRImgUrl} alt="QR" ref={componentRef} /></a>) : null}
                                        <FontAwesomeIcon icon={faDownload} style={{ color: "#ea7c69" }} className='mx-2' />
                                    </div>
                                    <br />
                                    <p style={{ textAlignLast: "justify" }}>---- Click on QR to download. ----</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <FontAwesomeIcon icon={faPrint} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2' onClick={handlePrint} />

                                </Modal.Footer>
                            </Modal>
                        )}

                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminPanel