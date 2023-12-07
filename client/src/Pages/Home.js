import React from 'react'
import '../Styles/Home.css'
import LtNavPanel from '../Components/LtNavPanel'
import RtCartPanel from '../Components/RtCartPanel'
import ItemsCard from '../Components/ItemsCard';

const Home = () => {


    return (
        <>
            <div className="home-layout">
                <LtNavPanel />
                <div className="home-product-cards">
                    <div className='items-panel-scroll px-2'>
                        <ItemsCard />
                    </div>
                </div>
                <RtCartPanel />
            </div>
        </>
    )
}

export default Home