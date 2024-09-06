import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom'

const FirmCollections = () => {

    const [firmData, setFirmData] = useState([])
    const [selectedRegion, setSelectedRegion] = useState('All')
    const [activeCategory, setActiveCategory] = useState('all')
    const firmDataHanlder = async () => {
        try {
            const repsone = await fetch(`${API_URL}/vendor/all-vendors`)
            const newData = await repsone.json();
            setFirmData(newData.vendors)
            // console.log(newData)
        } catch (error) {
            console.error(error)
            alert("Failed to Retreive Collections Data..")
        }
    }

    useEffect(() => {
        firmDataHanlder();
    }, [])

    const selectedRegionHandler = (region, category) => {
        setSelectedRegion(region)
        setActiveCategory(category)
    }

    return (
        <>
            <h3>Restaurants with online food delivery in Bhimavaram</h3>
            <div className="filterButtons">
                <button onClick={() => selectedRegionHandler("All", 'all')} className={activeCategory === 'all' ? 'categoryButton' : 'categoryDisableButton'}>All</button>
                <button onClick={() => selectedRegionHandler("South-indian", 'south-indian')} className={activeCategory === 'south-indian' ? 'categoryButton' : 'categoryDisableButton'}>South-Indian</button>
                <button onClick={() => selectedRegionHandler("north-indian", 'north-indian')} className={activeCategory === 'north-indian' ? 'categoryButton' : 'categoryDisableButton'}>North-Indian</button>
                <button onClick={() => selectedRegionHandler("chinese", 'chinese')} className={activeCategory === 'chinese' ? 'categoryButton' : 'categoryDisableButton'}>Chinese</button>
                <button onClick={() => selectedRegionHandler("bakery", 'bakery')} className={activeCategory === 'bakery' ? 'categoryButton' : 'categoryDisableButton'}>Bakery</button>
            </div >
            <section className="firmSection">
                {firmData.map((apple) => {
                    return apple.firm.map((item) => {
                        if (selectedRegion == "All" || item.region.includes(selectedRegion.toLocaleLowerCase())) {
                            return (
                                <Link to={`products/${item._id}/${item.firmName}`} className='link'>

                                    <div className='firmGroupBox'>
                                        <div className='firmGroup'>
                                            <img src={`${API_URL}/uploads/${item.image}`} alt="" />
                                            <div className="firmOffer">
                                                {item.offer}
                                            </div>
                                        </div>
                                        <div className='firmDetails'>
                                            <strong>{item.firmName}</strong><br />
                                            <div className='firmArea'>{item.region.join(', ')}</div>
                                            <div className='firmArea'>{item.area}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        return null;
                    })
                })}
            </section>
        </>
    )
}

export default FirmCollections
