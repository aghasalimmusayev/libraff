import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../service/service'
import "../CSS/details.css"

function Details() {

    const { id } = useParams()
    const [bookData, setBookData] = useState([])
    const [kitab, setKitab] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getData()
            setBookData(data)
        })()
    }, [])

    useEffect(() => {
        const book = bookData?.find(item => item.id.toString() === id)
        setKitab(book)
    }, [bookData, id])

    return (
        <div className='details_box'>
            {kitab && (
                <div className='kitab_details'>
                    <img src={kitab.sekil} alt={kitab.ad} />
                    <div className="kitab_info">
                        <h2 className='kitab_ad'>{kitab.ad}</h2>
                        <h4 className='muellif'>{kitab.muellif}</h4>
                        <p className='kitab_qiymet'>{kitab.qiymet} azn</p>
                        <p className='kitab_kateqoriya'><span>Kateqoriya: </span>{kitab.kateqoriya}</p>
                        <p className='staok_sayi'><span>Stokda var: </span> {kitab.stokSayi}</p>
                        <p className='satildi'><span>Satildi:</span> {kitab.satildi}</p>
                        <p className='baxildi'><span>Baxildi:</span> {kitab.baxildi}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Details
