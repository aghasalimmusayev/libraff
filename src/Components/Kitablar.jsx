import React, { useEffect, useState } from 'react'
import "../CSS/kitablar.css"
import { getData } from '../service/service'
import { Link } from "react-router-dom"
import { GoHeart } from "react-icons/go";
import { Pagination } from 'antd';

function Kitablar() {

    const [bookData, setBookData] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getData()
            setBookData(data)
        })();
    }, [])

    const [currentPage, setCurrentPage] = useState(1)  // indiki səhifə nömrəsi
    const [pageSize] = useState(8)                     // hər səhifədə neçə item
    const startIndex = (currentPage - 1) * pageSize  // başlanğıc index
    const endIndex = startIndex + pageSize           // son index  
    const currentBooks = bookData.slice(startIndex, endIndex) // indiki səhifənin kitabları
    const handlePageChange = (page) => {
        setCurrentPage(page) // yeni səhifə nömrəsini state-ə yaz
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <div className="container">
                <div className='kitablar'>
                    {currentBooks.map(item => {
                        return (
                            <div className='kitab'>
                                <div className='kitab_img'>
                                    <Link to={`/details/${item.id}`} key={item.id} target='_blank'>
                                        <img src={item.sekil} alt="" />
                                    </Link>
                                    <GoHeart style={{ color: 'red', fontSize: "35px" }} className='fav_icon' />
                                </div>
                                <div className="kitab_info">
                                    <h2 className='kitab_adi'>{item.Title}</h2>
                                    <p className='kitab_qiymeti'>{item.OriginalPrice} ₼</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="pag_btns">
                    <Pagination
                        current={currentPage}              // indiki səhifə (1, 2, 3...)
                        total={bookData.length}           // ümumi item sayı (məs: 150 kitab)
                        pageSize={pageSize}               // səhifə ölçüsü (8)
                        onChange={handlePageChange}       // klik edəndə çağırılan funksiya
                        showSizeChanger={false}           // səhifə ölçüsü dəyişmə düyməsi gizli
                        showQuickJumper={true}            // "Go to page X" input-u göstər
                        showTotal={(total, range) =>      // "1-8 / 150 kitab" məlumatı
                            `${range[0]}-${range[1]} / ${total} kitab`
                        }
                        responsive={true}                 // mobil uyğunluq
                    />
                </div>
            </div>
        </>
    )
}

export default Kitablar
