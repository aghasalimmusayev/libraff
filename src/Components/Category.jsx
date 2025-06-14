import React, { useEffect, useState } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link, NavLink, useParams } from 'react-router-dom'
import '../CSS/kateqoriyalar.css'
import Kitablar from './Child Components/Kitablar'

function Category() {

    const { kateqoriya } = useParams()
    const { bookData, setCatFilteredBook, catFilteredBook } = useAllContext()
    const [dil, setDil] = useState([])
    const categories = ([...new Set(bookData.map(item => item.CategoryName).filter(cat => cat !== ""))])
    const languages = [...new Set(bookData
        .map(item => item.Dil)
        .filter(dil => dil !== "")
        .flatMap(dil => dil.split('/'))
        .map(dil => dil.trim()))]
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(130)
    const valueMin = 0
    const valueMax = 130

    const dilSecimi = (language) => {
        if (dil.includes(language)) {
            setDil(dil.filter(lang => lang !== language))
        } else {
            setDil([...dil, language])
        }
    }
    const handleMinV = (e) => {
        const value = parseInt(e.target.value)
        if (value <= maxPrice) setMinPrice(value)
    }
    const handleMaxV = (e) => {
        const value = parseInt(e.target.value)
        if (value >= minPrice) setMaxPrice(value)
    }
    useEffect(() => {
        let filteredBooks = bookData
        if (kateqoriya && kateqoriya !== 'butun') {
            filteredBooks = filteredBooks.filter(book => book.CategoryName === kateqoriya)
        }
        if (dil.length > 0) {
            filteredBooks = filteredBooks.filter(book => {
                const bookLanguages = book.Dil.split('/').map(lang => lang.trim())
                return dil.some(selectedLang => bookLanguages.includes(selectedLang))
            })
        }
        setCatFilteredBook(filteredBooks)
    }, [kateqoriya, dil, bookData, setCatFilteredBook])

    return (
        <div className='container'>
            <div className="category_context">
                <div className='filter_box'>
                    <h3 className='filter_heading'>Kategoriyalar</h3>
                    <ul className='kateqoriyalar'>
                        <li><NavLink
                            to={`/kateqoriyalar`}
                            end
                            className={({ isActive }) => isActive ? 'active' : ''}>Butun kateqoriyalar
                        </NavLink></li>
                        {categories?.map(item => {
                            return <li key={item}><NavLink
                                to={`/kateqoriyalar/${item}`}
                                className={({ isActive }) => isActive ? 'active' : ''}>{item}
                            </NavLink></li>
                        })}
                    </ul>
                    <h3 className='filter_heading'>Diller {dil.length > 0 && <span className='dil_kitab_sayi'>{catFilteredBook.length} kitab tapildi</span>}</h3>
                    <ul className='diller'>
                        {languages?.map(item => {
                            return (
                                <li key={item}>
                                    <label htmlFor={`lang-${item}`}>
                                        <input
                                            type="checkbox"
                                            id={`lang-${item}`}
                                            checked={dil.includes(item)}
                                            onChange={() => dilSecimi(item)} />{item}
                                    </label>
                                </li>)
                        })}
                    </ul>
                    <h3 className='filter_heading'>Qiymət Aralığı</h3>
                    <div className="price_range">
                        <div className="range_box">
                            <div className="range_values">
                                <span className="min_value">{minPrice} AZN</span>
                                <span className="max_value">{maxPrice} AZN</span>
                            </div>
                            <div className="dual_range">
                                <input
                                    type="range"
                                    min={valueMin}
                                    max={valueMax}
                                    value={minPrice}
                                    onChange={handleMinV}
                                    className="range_min"
                                />
                                <input
                                    type="range"
                                    min={valueMin}
                                    max={valueMax}
                                    value={maxPrice}
                                    onChange={handleMaxV}
                                    className="range_max"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Kitablar selectedCategory={kateqoriya} />
            </div>
        </div>
    )
}

export default Category