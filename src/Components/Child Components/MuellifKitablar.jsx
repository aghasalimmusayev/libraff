import React, { useEffect } from 'react'
import { useAllContext } from '../../../Context/MyContext'
import { Link, useParams } from 'react-router-dom'
import { GoHeart } from "react-icons/go";

function MuellifKitablar() {

    const { bookData } = useAllContext()
    const { muellif } = useParams()
    const kitablar = bookData?.filter(kitab => kitab.Müəllif == muellif)

    useEffect(() => {
        document.title = `${muellif} | Libraff`
    }, [])

    return (
        <div className='container'>
            <h1 className='muellif' style={{ marginTop: "20px" }}>Müəllif: <span>{muellif}</span></h1>
            <div className='kitablar'>
                {kitablar.map(kitab => {
                    return (
                        <div className='kitab' key={kitab.id}>
                            <div className='kitab_img'>
                                <Link to={`/details/${kitab.id}`} target='_blank'>
                                    <img src={kitab.sekil} alt={kitab.Title} />
                                </Link>
                                <GoHeart style={{ color: 'red', fontSize: "35px" }} className='fav_icon' />
                            </div>
                            <div className="kitab_info">
                                <h2 className='kitab_adi'>{kitab.Title}</h2>
                                <p className='kitab_qiymeti'>{kitab.OriginalPrice} ₼</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MuellifKitablar
