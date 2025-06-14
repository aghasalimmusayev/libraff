import React, { useEffect } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { NavLink, useParams } from 'react-router-dom'
import '../CSS/kateqoriyalar.css'
import Kitablar from './Kitablar'

function Category() {

    const { kateqoriya } = useParams()
    const { bookData, setCatFilteredBook, catFilteredBook } = useAllContext()
    const categories = ([...new Set(bookData.map(item => item.CategoryName).filter(cat => cat !== ""))])

    useEffect(() => {
        if (kateqoriya && kateqoriya !== 'butun') {
            const filtered = bookData.filter(book => book.CategoryName === kateqoriya)
            setCatFilteredBook(filtered)
        } else {
            setCatFilteredBook(bookData)
        }
    }, [kateqoriya, bookData, setCatFilteredBook])

    return (
        <div className='container'>
            <div className="category_context">
                <div className='cat_box'>
                    <h3>Kategoriyalar</h3>
                    <ul className='kateqoriyalar'>
                        <li><NavLink
                            to={`/kateqoriyalar`}
                            end
                            className={({ isActive }) => isActive ? 'active' : ''}>Butun kateqoriyalar
                        </NavLink></li>
                        {categories?.map(item => {
                            return <li><NavLink
                                to={`/kateqoriyalar/${item}`}
                                className={({ isActive }) => isActive ? 'active' : ''}>{item}
                            </NavLink></li>
                        })}
                    </ul>
                </div>
                <Kitablar selectedCategory={kateqoriya} />
            </div>
        </div>
    )
}

export default Category