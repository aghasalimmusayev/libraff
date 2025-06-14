import React, { useEffect } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link, NavLink, useParams } from 'react-router-dom'
import '../CSS/kateqoriyalar.css'
import Kitablar from './Child Components/Kitablar'

function Category() {

    const { kateqoriya } = useParams()
    const { bookData, setCatFilteredBook } = useAllContext()
    const categories = ([...new Set(bookData.map(item => item.CategoryName).filter(cat => cat !== ""))])
    const languages = [...new Set(bookData
        .map(item => item.Dil)
        .filter(dil => dil !== "")
        .flatMap(dil => dil.split('/'))
        .map(dil => dil.trim()))]
console.log(languages);

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
                <div className='filter_box'>
                    <h3>Kategoriyalar</h3>
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
                    <h3>Diller</h3>
                    <ul className='diller'>
                        {languages?.map(item => {
                            return <li key={item}><Link to="/">{item}</Link></li>
                        })}
                    </ul>
                </div>
                <Kitablar selectedCategory={kateqoriya} />
            </div>
        </div>
    )
}

export default Category