import React, { useEffect } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { AiOutlineClear } from "react-icons/ai";

function WishList() {

    const { wishLits, setWishList, handleWish } = useAllContext()
    function wishClear() {
        setWishList([])
    }

    useEffect(() => {
        document.title = 'Secilmisler | Libraff'
    }, [])

    return (
        <div className='container'>
            <h2 style={{ margin: "30px 0" }}>Beyenilmis kitablar</h2>
            <div className='wishlist_box'>
                <div className='kitablar'>
                    {wishLits?.map(item => {
                        const wishVar = wishLits.some(ktb => item.id === ktb.id)
                        return (
                            <div className='kitab' key={item.id}>
                                <div className='kitab_img'>
                                    <Link to={`/details/${item.id}`} target='_blank'>
                                        <img src={item.sekil} alt={item.Title} />
                                    </Link>
                                    {wishVar
                                        ? <GoHeartFill className='fav_icon' onClick={() => handleWish(item)} />
                                        : <GoHeart className='fav_icon' onClick={() => handleWish(item)} />
                                    }
                                </div>
                                <div className="kitab_info">
                                    <h2 className='kitab_adi'>{item.Title}</h2>
                                    <p className='kitab_qiymeti'>{item.OriginalPrice} ₼</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {wishLits.length > 0 &&
                    <button className="clear_btn" onClick={wishClear}>
                        <AiOutlineClear />
                        <span>Siyahini sifirla</span>
                    </button>
                }
            </div>
        </div>
    )
}

export default WishList
