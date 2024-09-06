import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'
import { FaArrowLeft, FaArrowRight, FaLessThanEqual } from "react-icons/fa";
import { BallTriangle } from 'react-loader-spinner'

const Chains = () => {

    const [vendorData, setVendorData] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [loading, setLoading] = useState(false)

    const vendorFirmHandler = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/vendor/all-vendors`)
            const newData = await response.json();
            setVendorData(newData)
            // console.log(newData)
        } catch (error) {
            alert("Failed to fetch Data..")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        vendorFirmHandler()
    }, [])

    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery")
        const scrollAmount = 500
        if (direction == "left") {
            gallery.scrollTo({
                left: gallery.scrollLeft - scrollAmount,
                behavior: "smooth"
            })
        } else if (direction == "right") {
            gallery.scrollTo({
                left: gallery.scrollLeft + scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className='mediaChainSection'>

            <div className="loaderSection">
                {loading && <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="orangeRed"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />}
            </div>
            <div className="btnSection">
                <button onClick={() => handleScroll("left")} className='btnIcons'>{<FaArrowLeft />}</button>
                <button onClick={() => handleScroll("right")} className='btnIcons'>{<FaArrowRight />}</button >
            </div>
            <h3>Top Restaurant Chains in Bhimavaram</h3>
            <section className="chainSection" id='chainGallery' onScroll={(e) => setScrollPosition(e.target.scrollLeft)}>
                {vendorData.vendors && vendorData.vendors.map((vendor) => {
                    return (
                        <>

                            <div className="vendorBox">
                                {vendor.firm.map((item) => {
                                    return (
                                        <>
                                            {/* {item.firmName} */}
                                            <div className="firmImage">
                                                <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    )
                })}
            </section>
        </div>

    )
}

export default Chains
