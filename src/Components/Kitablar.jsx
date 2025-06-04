import React, { useEffect, useState } from 'react'
import "../CSS/kitablar.css"
import { getData } from '../service/service'

function Kitablar() {

    const [bookData, setBookData] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getData()
            setBookData(data)
        })();
    }, [])

    useEffect(()=>{
        console.log(bookData);
    },[bookData])

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
