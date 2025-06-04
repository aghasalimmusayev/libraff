import React, { useEffect, useState } from 'react'
import "../CSS/kitablar.css"

function Kitablar() {

    const [bookData, setBookData] = useState([])
    useEffect(() => {
        fetch("/libData.json")
            .then(response => response.json())
            .then(data => setBookData(data))
            .catch(error => {
                console.error("API-da xeta: " + error)
            })
    }, [])

    return (
        <>
            <div className='kitablar'>
                {bookData?.Kitablar?.map(item => {
                    return (
                        <div className='kitab' key={item.id}>
                            <img src={item.sekil} alt="" />
                            <h2 className='kitab_adi'>{item.ad}</h2>
                            <p className='kitab_qiymeti'>{item.qiymet}</p>
                        </div>)
                })}
            </div>
        </>
    )
}

export default Kitablar
