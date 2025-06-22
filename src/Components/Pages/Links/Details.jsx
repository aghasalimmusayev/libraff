import React, { useEffect, useState } from 'react'
import { useAllContext } from '../../../Context/MyContext';
import { useParams } from 'react-router-dom'
import { getKitabByID } from '../../../service/service'
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { SlBasket } from "react-icons/sl";
import "./Links CSS/details.css"

function Details() {

    const { id } = useParams()
    const [kitab, setKitab] = useState(null)
    const { bookData, wishLits, handleWish, sebet, setSebet } = useAllContext()
    const wishVar = kitab && wishLits.some(ktb => kitab.id === ktb.id)
    const sebetdeVar = sebet.some(ktb => kitab.id == ktb.id)

    useEffect(() => {
        (async () => {
            const data = await getKitabByID(id)
            setKitab(data)
        })()
    }, [id])

    function addToCart(id) {
        const alKitab = bookData?.find(item => item.id === id)
        { !sebetdeVar && alKitab.stokSayi > 0 && setSebet(prev => [...prev, { ...alKitab, "count": 1 }]) }
    }

    useEffect(() => {
        document.title = 'Kitab haqqinda | Libraff'
    }, [])

    return (
        <div className="container">
            <div className='details_box'>
                {kitab && (
                    <div className='kitab_details'>
                        <div className="kitab_detail_img">
                            <img src={kitab.sekil} alt={kitab.Title} />
                            {wishVar
                                ? <GoHeartFill className='fav_icon' onClick={() => handleWish(kitab)} />
                                : <GoHeart className='fav_icon' onClick={() => handleWish(kitab)} />
                            }
                        </div>
                        <div className="kitab_info">
                            <h2 className='kitab_ad'>{kitab.Title}</h2>
                            <h4 className='muellif'><span>Muellif: </span> {kitab.Müəllif}</h4>
                            <p className="kitab_qiymet"
                                style={kitab.DiscountedPrice < kitab.OriginalPrice ? { textDecoration: 'line-through', color: 'gray' } : {}}>
                                {kitab.OriginalPrice} azn</p>
                            {kitab.DiscountedPrice < kitab.OriginalPrice && <p className='kitab_qiymet'>{kitab.DiscountedPrice} azn</p>}
                            <p className='kitab_kateqoriya'><span>Kateqoriya: </span>{kitab.CategoryName}</p>
                            <p className='kiatb_dil'><span>Dil: </span> {kitab.Dil}</p>
                            <p className='staok_sayi'><span>Stokda var: </span> {kitab.stokSayi} eded</p>
                            <p className='satildi'><span>Satildi:</span> {kitab.satildi}</p>
                            <p className='baxildi'><span>Baxildi:</span> {kitab.baxildi}</p>
                            <div className="add_btn">
                                <button onClick={() => addToCart(kitab.id)} className='add_to_cart'>
                                    <SlBasket className='cart_icon' />
                                    <span>{sebetdeVar ? "Elave edildi" : "Sebete elave et"}</span>
                                </button>
                            </div>
                            <p className='tesvir'><span>Tesvir:</span> {kitab.Description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details
