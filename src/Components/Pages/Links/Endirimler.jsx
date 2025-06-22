import React, { useEffect, useState } from 'react'
import { useAllContext } from '../../../Context/MyContext'
import { Link } from 'react-router-dom'
import { GoHeart } from "react-icons/go";

function Endirimler() {

    const { bookData } = useAllContext()
    const endirimli = bookData?.filter(kitab => kitab.OriginalPrice > kitab.DiscountedPrice)
    let [count, setCount] = useState(8)
    function showMore() {
        setCount(count + 8)
    }

    useEffect(() => {
        document.title = 'Endirimli kitablar | Libraff'
    }, [])

    return (
        <div className='container'>
            <h1 className='section_head'>Endirimli kitablar</h1>
            <div className='kitablar'>
                {endirimli && endirimli
                    .slice(0, count)
                    .map(kitab => {
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
                                    <p className='kitab_qiymeti' style={{ textDecoration: 'line-through', color: 'gray' }}>{kitab.OriginalPrice} ₼</p>
                                    <p className='endirimli_qiymeti'>{kitab.DiscountedPrice} ₼</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className="more_btn" style={{ textAlign: "center" }}>
                <button onClick={showMore}>Load More</button>
            </div>
        </div>
    )
}

export default Endirimler
