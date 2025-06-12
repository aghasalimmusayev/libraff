import React from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from 'react-router-dom'

function Sebet() {

    const { sebet } = useAllContext()
    console.log(sebet);

    return (
        <div className='container'>
            <div className="sebet_box">
                <div className='sebetdekiler'>
                    {sebet?.map(item => {
                        return (
                            <div className='kitab' key={item.id}>
                                <div className='kitab_img'>
                                    <Link to={`/details/${item.id}`} target='_blank'>
                                        <img src={item.sekil} alt={item.Title} />
                                    </Link>
                                </div>
                                <div className="kitab_info">
                                    <h2 className='kitab_adi'>{item.Title}</h2>
                                    <p className='kitab_qiymeti'>{item.OriginalPrice} ₼</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sebet