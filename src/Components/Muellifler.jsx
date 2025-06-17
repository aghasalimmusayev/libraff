import React, { useEffect } from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from "react-router-dom"
import '../CSS/muellifler.css'

function Muellifler() {

    const { bookData } = useAllContext()
    const muellifler = [...new Set(bookData?.map(item => item.Müəllif).filter(ad => ad && ad.trim() !== ""))]
    const siyahi = [...new Set(muellifler.map(ad => ad?.[0]))].sort()
    
    useEffect(() => {
        document.title = 'Muellifler | Libraff'
    }, [])

    return (
        <div className='container'>
            <h1 className='section_head'>Muellifler</h1>
            <div className='mudericat'>
                {siyahi.map(basHerf => {
                    return (
                        <div>
                            <h2 className='bas_herf'>{basHerf.toUpperCase()}</h2>
                            <div className='muellifler'>
                                {muellifler
                                    .filter(muellif => muellif?.[0] === basHerf)
                                    .map((muellif, index) => (
                                        <Link key={index} to={`/muellifler/muellifKitablari/${muellif.trim()}`}>{muellif}</Link>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Muellifler
