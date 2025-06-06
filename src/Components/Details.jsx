import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getKitabByID } from '../service/service'
// import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import "../CSS/details.css"

function Details() {

    const { id } = useParams()
    const [kitab, setKitab] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getKitabByID(id)
            setKitab(data)
        })()
    }, [id])

    return (
        <div className="container">
            <div className='details_box'>
                {kitab && (
                    <div className='kitab_details'>
                        <div className="kitab_detail_img">
                            <img src={kitab.sekil} alt={kitab.title} />
                            <GoHeart style={{ fontSize: "30px", color: "red" }} className='fav_icon' />
                            {/* <GoHeartFill /> */}
                        </div>
                        <div className="kitab_info">
                            <h2 className='kitab_ad'>{kitab.Title}</h2>
                            <h4 className='muellif'><span>Muellif: </span> {kitab.Müəllif}</h4>
                            <p className='kitab_qiymet'>{kitab.OriginalPrice} azn</p>
                            <p className='kitab_kateqoriya'><span>Kateqoriya: </span>{kitab.CategoryName}</p>
                            <p className='staok_sayi'><span>Stokda var: </span> {kitab.stokSayi} eded</p>
                            <p className='satildi'><span>Satildi:</span> {kitab.satildi}</p>
                            <p className='baxildi'><span>Baxildi:</span> {kitab.baxildi}</p>
                            <p className='tesvir'><span>Tesvir:</span> {kitab.Description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details
