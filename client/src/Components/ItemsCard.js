import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Store/ProductSlice';
import { add } from '../Store/CartSlice'

import { Container, Row, Button, Card, Col, Image, InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import '../Styles/ItemCard.css'
import "../Styles/NavbarPanel.css"



const ItemsCard = () => {

    const dispatch = useDispatch()
    useEffect(() => { dispatch(getProducts()) }, [dispatch])
    const { data: products } = useSelector(state => state.Products)
    const addToCart = (product) => { dispatch(add(product)) }


    const [selCat, setSelCat] = useState("")
    //Show DTG
    // const [date, setDate] = useState()
    // const [time, setTime] = useState()
    // let options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    // let dateNow = new Date().toLocaleDateString()
    // let timeNow = new Date().toLocaleTimeString()
    // const updateDTG = () => {
    //   dateNow = new Date().toLocaleDateString("en-US", options)
    //   timeNow = new Date().toLocaleTimeString()
    //   setDate(dateNow)
    //   setTime(timeNow)
    // }
    // setInterval(updateDTG, 1000);
    const categories = [
        {
            name: 'Drinks',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/Drinks-icon.jpg?updatedAt=1689241536374'
        },
        {
            name: 'Rice',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/rice-icon.png?updatedAt=1689241536311'
        },
        {
            name: 'Noodles',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/Noodles-icon.png?updatedAt=1689241536450'
        },
        {
            name: 'Electronics',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/home_appliances.png?updatedAt=1689434431399'
        },
        {
            name: 'Computer',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/computer.png?updatedAt=1689434432195'
        },
        {
            name: 'Mobile',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/cellphones.png?updatedAt=1689434432025'
        },
        {
            name: 'Clothing',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/othing.jpg?updatedAt=1689434432899'
        },
        {
            name: 'Toys',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/toys.png?updatedAt=1689434431679'
        },
        {
            name: 'Games',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/download11.png?updatedAt=1689444829418'
        },
        {
            name: 'Decor',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/decor.png?updatedAt=1689434431097'
        },
        {
            name: 'Cosmetics',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/cosmetic.png?updatedAt=1689434431805'
        },
        {
            name: 'Drinks',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/Drinks-icon.jpg?updatedAt=1689241536374'
        },
        {
            name: 'Rice',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/rice-icon.png?updatedAt=1689241536311'
        },
        {
            name: 'Noodles',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/Noodles-icon.png?updatedAt=1689241536450'
        },
        {
            name: 'Electronics',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/home_appliances.png?updatedAt=1689434431399'
        },
        {
            name: 'Computer',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/computer.png?updatedAt=1689434432195'
        },
        {
            name: 'Mobile',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/cellphones.png?updatedAt=1689434432025'
        },
        {
            name: 'Clothing',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/othing.jpg?updatedAt=1689434432899'
        },
        {
            name: 'Toys',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/toys.png?updatedAt=1689434431679'
        },
        {
            name: 'Games',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/download11.png?updatedAt=1689444829418'
        },
        {
            name: 'Decor',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/decor.png?updatedAt=1689434431097'
        },
        {
            name: 'Cosmetics',
            imageUrl: 'https://ik.imagekit.io/amazon9944/POS_React/Categories_logo/cosmetic.png?updatedAt=1689434431805'
        },
    ]
    const [user, setUser] = useState("");
    useEffect(() => {
        const { fname } = JSON.parse(localStorage.getItem('auth'));
        if (fname) { setUser(fname); }
    }, [dispatch]);

    let index = 0;
    // console.log(selCat);
    // console.log(selCat.length);

    const cards = products
        .filter((i) => { if (selCat.length > 0) { return i.category === selCat } else { return i } })
        .map(product => (
            <Col key={product._id}>
                <Card style={{ backgroundColor: "rgb(0 0 0 / 68%)", color: "wheat", width: "10rem" }}>
                    <div className="text-center">
                        <Card.Img variant="top" src={product.image} style={{ width: "250px", height: "120px" }} />
                    </div>
                    <Card.Body>
                        <div className='card-body'>
                            <div className="title">
                                <Card.Title className='card-title'>{product.name}</Card.Title>
                                <Card.Title>$ {product.price}</Card.Title>
                            </div>
                            <div className="cta">
                                <Button className='card-btn' variant="dark" onClick={() => addToCart(product)}>
                                    <FontAwesomeIcon icon={faCartPlus} style={{ color: "#ea7c69", }} />
                                </Button>
                            </div>
                        </div>
                    </Card.Body>

                    <Card.Footer className='card-footer'></Card.Footer>
                </Card>
            </Col>
        ))





    return (
        <>
            <div className='top-nav'>

                {/* User Data with Current Date */}
                <div className="user-data  ">
                    <Image src='../assets/UserImage.jpg' alt='UserImg' roundedCircle width={"50px"} className='mt-2' />
                    <span className='text-white'>{user || "Guest"}</span>
                    {/* <div style={{ color: "white", transitionDuration: "0.5s" }}>{date} </div> */}
                    {/* <span> / </span>{time} */}
                </div>

                <div>
                    <h1 className='text-white'>POS - ECom Store</h1>
                </div>

                {/* Search Products */}
                <InputGroup className="text-white" style={{ alignSelf: "center", width: "300px" }}>
                    <Form.Control
                        className='formControl'
                        placeholder="Search Product"
                        style={{ backgroundColor: "#252836", color: "white" }}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <FontAwesomeIcon icon={faSearch} style={{ color: "#ea7c69", }} />
                    </Button>
                </InputGroup>


            </div>

            <hr className='text-light mx-4 my-1 divider' />

            <div className="slider text-light mx-auto">
                <div className="slide-track">
                    {categories.map(category => (
                        <div className={`slide ${selCat === category.name && "category-active"}`}
                            onClick={() => setSelCat(category.name)} key={index += 1}>
                            <Image src={category.imageUrl} alt={`Category = ${category.name}`} height={'50px'} width={'50px'} roundedCircle />
                            <span style={{ fontSize: "smaller" }}>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <hr className='text-light mx-4 my-1 divider' />




            <Container>
                <Row className='row'>
                    {cards}
                </Row>
            </Container>

        </>
    )
}

export default ItemsCard