import React, { useEffect, useState } from 'react'
import "./kitablar.css"
import { Link } from "react-router-dom"
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { Pagination } from 'antd';
import { useAllContext } from '../../Context/MyContext';
import { SlBasket } from "react-icons/sl";

function Kitablar({ selectedCategory }) {

    const { bookData, catFilteredBook, wishLits, handleWish, sebet, setSebet } = useAllContext()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(12)
    const startIndex = (currentPage - 1) * pageSize  // başlanğıc index
    const endIndex = startIndex + pageSize           // son index  
    const currentBooks = catFilteredBook.slice(startIndex, endIndex)
    const handlePageChange = (page) => {
        setCurrentPage(page) // yeni səhifə nömrəsini state-ə yazir
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory])

    useEffect(() => {
        document.title = selectedCategory
            ? `${selectedCategory} Kitabları | Libraff`
            : 'Kitablar | Libraff'
    }, [selectedCategory])

    function addToCart(id) {
        const alKitab = bookData?.find(item => item.id === id)
        const sebetdeVar = sebet.find(item => alKitab.id == item.id)
        { !sebetdeVar && alKitab.stokSayi > 0 && setSebet(prev => [...prev, { ...alKitab, "count": 1 }]) }
    }

    return (
        <>
            <div className="container">
                <div className='kitablar'>
                    {currentBooks.map(item => {
                        const wishVar = wishLits.some(ktb => item.id === ktb.id)
                        const sebetdeVar = sebet.some(ktb => ktb.id == item.id)
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
                                    <p className='kitab_stoku'>Stok: {item.stokSayi} eded</p>
                                    <button disabled={item.stokSayi <= 0} onClick={() => addToCart(item.id)} className='add_to_cart'>
                                        <SlBasket className='cart_icon' />
                                        <span>{sebetdeVar ? "Elave edildi" : "Sebete elave et"}</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="pag_btns">
                    <Pagination
                        current={currentPage}
                        total={catFilteredBook.length}
                        pageSize={pageSize}               // səhifə ölçüsü (8)
                        onChange={handlePageChange}       // klik edəndə çağırılan funksiya
                        showSizeChanger={false}           // səhifə ölçüsü dəyişmə düyməsi gizli
                        showQuickJumper={true}            // "Go to page X" input-u göstər
                        showTotal={(total, range) =>      // "1-8 / 150 kitab" məlumatı
                            `${range[0]}-${range[1]} / ${total} kitab`
                        }
                        responsive={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Kitablar
