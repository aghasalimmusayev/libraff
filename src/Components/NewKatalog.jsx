import React, { useEffect, useState } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from 'react-router-dom'
import '../CSS/katalog.css'

function NewKatalog() {

    const { bookData } = useAllContext()
    function showBooks(Kitablar) {
        console.log(bookData);
    }

    return (
        <>
            <div className='katalog_menu'>
                <div className="katalog_box">
                    <ul className='first_list'>
                        <li onMouseOver={() => { showBooks(Kitablar) }}>Kitablar</li>
                        <li>Muellifler</li>
                        <li>Endirimli kitablar</li>
                    </ul>
                    <ul className='second_list'>
                        {
                            bookData?.map(kitab => {
                                return <li key={kitab.id}><Link to='/'>{kitab.Title}</Link></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NewKatalog
