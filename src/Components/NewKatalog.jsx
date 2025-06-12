import React, { useState } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from 'react-router-dom'
import { FaXmark } from "react-icons/fa6";
import '../CSS/newKatalog.css'

function NewKatalog() {

    const { bookData, closeKat } = useAllContext()
    const [books, setBooks] = useState([])
    const [muellif, setMuellif] = useState([])
    const [discountBook, setDiscountBook] = useState([])
    const [kategory, setKategory] = useState([])
    const [mellifBooks, setMuellifBooks] = useState([])
    const [katBooks, setKatBooks] = useState([])


    function showBooks() {
        setBooks(bookData);
        setMuellif([])
        setDiscountBook([])
        setKatBooks([])
        setMuellifBooks([])
    }
    function showDiscount() {
        setDiscountBook(bookData.filter(item => item.DiscountedPrice < item.OriginalPrice))
        setBooks([])
        setMuellif([])
        setKategory([])
        setKatBooks([])
        setMuellifBooks([])
    }
    function showAuthor() {
        setMuellif([...new Set(bookData.map(item => item.Müəllif).filter(mlf => mlf !== ""))])
        setBooks([])
        setDiscountBook([])
        setKategory([])
        setKatBooks([])
        setMuellifBooks([])
    }
    function showKategory() {
        setKategory([...new Set(bookData.map(item => item.CategoryName).filter(cat => cat !== ""))])
        setBooks([])
        setMuellif([])
        setDiscountBook([])
        setKatBooks([])
        setMuellifBooks([])
    }
    function mllfBookShow(muellif) {
        setMuellifBooks(bookData.filter(item => item.Müəllif == muellif))
        setKatBooks([])
    }
    function katBookShow(kateg) {
        setKatBooks(bookData.filter(item => item.CategoryName === kateg))
        setMuellifBooks([])
    }

    return (
        <>
            <div className='katalog_menu' onClick={closeKat}>
                <div className="katalog_box" onClick={(e) => e.stopPropagation()}>
                    <div className="close_kat">
                        <FaXmark style={{ fontSize: "28px", cursor: "pointer" }} onClick={closeKat} />
                    </div>
                    <ul className='first_list'>
                        <li onMouseOver={() => { showBooks() }}>Kitablar</li>
                        <li onMouseOver={() => { showDiscount() }}>Endirimli kitablar</li>
                        <li onMouseOver={() => { showAuthor() }}>Muellifler</li>
                        <li onMouseOver={() => { showKategory() }}>Kateqoiyalar</li>
                    </ul>
                    <ul className='second_list' style={{ display: books.length > 0 ? 'flex' : 'none' }}>
                        {books?.map(kitab => {
                            return <li key={kitab.id}><Link to={`/details/${kitab.id}`} target='_blank'>{kitab.Title}</Link></li>
                        })}
                    </ul>
                    <ul className='second_list' style={{ display: discountBook.length > 0 ? 'flex' : 'none' }}>
                        {discountBook?.map(book => {
                            return <li key={book.id}><Link to={`/details/${book.id}`} target='_blank'>{book.Title}</Link></li>
                        })}
                    </ul>
                    <ul className='second_list' style={{ display: muellif.length > 0 ? 'flex' : 'none' }}>
                        {muellif?.map((mllf, index) => {
                            return <li key={index}><Link
                                to={`/muellifler/muellifKitablari/${mllf}`}
                                onMouseOver={() => { mllfBookShow(mllf) }}
                                onClick={closeKat}>{mllf}</Link></li>
                        })}
                    </ul>
                    <ul className='second_list' style={{ display: kategory.length > 0 ? 'flex' : 'none' }}>
                        {kategory?.map((cat, index) => {
                            return <li key={index}><Link
                                to='/kateqoriyalar'
                                onMouseOver={() => { katBookShow(cat) }}
                                onClick={closeKat}>{cat}</Link></li>
                        })}
                    </ul>
                    <ul className='third_list' style={{ display: mellifBooks.length > 0 ? 'flex' : 'none' }}>
                        {mellifBooks?.map(ktb => {
                            return <li key={ktb.id}><Link to={`/details/${ktb.id}`} target='_blank'>{ktb.Title}</Link></li>
                        })}
                    </ul>
                    <ul className='third_list' style={{ display: katBooks.length > 0 ? 'flex' : 'none' }}>
                        {katBooks?.map(ktb => {
                            return <li key={ktb.id}><Link to={`/details/${ktb.id}`} target='_blank'>{ktb.Title}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NewKatalog
