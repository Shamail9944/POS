import LtNavPanel from './../Components/LtNavPanel';
import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useReactToPrint } from "react-to-print"
import '../Styles/SalesChart.css'

const SalesChart = () => {

    const componentRef = useRef()

    //popup Bill Print modal states toggle
    const [showPopUp, setShowPopUp] = useState(false);
    const [selbill, setSelBill] = useState(null)


    // const [printBill, setPrintBill] = useState(null)
    const [allBills, setallBills] = useState([])
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })


    useEffect(() => {
        axios.get('https://pos-server-gules.vercel.app/api/v1/bills/get-bill')
            .then((res) => {
                setallBills(res.data)
            })
    }, [])
    // console.log(allBills);


    // map Bills record in table body from db data
    let index = 0;
    const tableBody = allBills.map(bill => (
        <tbody key={bill._id}>
            <tr>
                <td>{index = index + 1}</td>
                <td>{bill._id}</td>
                <td>{bill.customerName}</td>
                <td>{bill.customerNumber}</td>
                <td>{bill.totalQty}</td>
                <td>{bill.totalPrice}</td>
                <td>{bill.tax}</td>
                <td>{bill.gtotal}</td>
                <td>{bill.paymentMode}</td>
                <td>{bill.usid}</td>
                <td>
                    <Button className='card-btn' variant="dark" onClick={() => { setShowPopUp(true); setSelBill(bill); }}>
                        <FontAwesomeIcon icon={faPrint} style={{ color: "#ea7c69", cursor: "pointer" }} className='mx-2' />
                    </Button>
                </td>
            </tr>
        </tbody >
    ))
    // console.log(selbill);



    return (
        <>
            <div className="sales-chart-layout" style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>
                <LtNavPanel />
                <div className="sales-chart" style={{ width: "100vw" }}>
                    <h1 className='text-light saleHeader'>Sales Chart</h1>
                    {/* All Bills Table */}
                    <div className="bills-table">
                        <Table striped="rows" variant="dark">
                            <thead>
                                <tr style={{ verticalAlign: "middle" }}>
                                    <th>#</th>
                                    <th>Bill Id</th>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Items Qty</th>
                                    <th>Total Price</th>
                                    <th>Tax</th>
                                    <th>Grand Total</th>
                                    <th>Payment Mode</th>
                                    <th>Cashier Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {tableBody}
                        </Table>
                    </div>


                    {showPopUp && (
                        <Modal show={showPopUp} onHide={() => { setShowPopUp(false); }} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Bill Print</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="billForPrint" ref={componentRef}>
                                    <div>
                                        <h4>POS HS Colab</h4>
                                        <h6>Store Loc - Islamabad</h6>
                                        <hr className="my-1" />
                                    </div>
                                    <div className="mt-2">
                                        <p className='bill-credientials'>
                                            Customer Name : <b>{selbill.customerName}</b>
                                            <br />
                                            Contact : <b>{selbill.customerNumber} | Islamabad</b>
                                            <br />
                                            Date : <b>{selbill.date.toString()}</b>
                                            <br />
                                        </p>

                                        <div className="slip-table">
                                            <Table striped="rows">
                                                <thead>
                                                    <tr style={{ verticalAlign: "middle" }}>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                    </tr>
                                                </thead>
                                                {selbill.cartItemsCheckOut.map((item) => (

                                                    <tbody key={item._id}>
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.quantity}</td>
                                                        </tr>
                                                    </tbody >

                                                ))
                                                }
                                            </Table>
                                        </div>
                                        <p className='bill-total'>
                                            Total Items Qty : <b>{selbill.totalQty}</b>
                                            <br />
                                            Total Items Price : <b>{selbill.totalPrice}</b>
                                            <br />
                                            GST Tax : <b>{selbill.tax}</b>
                                            <br />
                                            Grand Total : <b>{selbill.gtotal}</b>
                                            <br />
                                        </p>

                                    </div>
                                    <p className='bill-footer'>Thanks for Sopping at POS HS Colab! <br />10% GST applies on all transactions as per FBR policies. For Inquiries or complaints reach us out at xxxx@domain.com. Please Enroll in our Customer Loyalty program for additional discounts and benefits.</p>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={handlePrint}>Print Reciept</Button>
                            </Modal.Footer>
                        </Modal>
                    )}


                </div>
            </div>
        </>
    )
}

export default SalesChart






