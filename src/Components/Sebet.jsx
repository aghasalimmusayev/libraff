import React from 'react'
import { useAllContext } from '../../Context/MyContext'
import { Link } from 'react-router-dom'
import '../CSS/sebet.css'
function Sebet() {

    const { sebet, countArtir, countAzalt } = useAllContext()
    const total = sebet?.reduce((cem, item) => cem + (item.OriginalPrice * item.count), 0)

    return (
        <div className='container'>
            <h2 style={{ margin: "30px 0" }}>Sebetdeki mehsullar</h2>
            <div className="sebet_box">
                <div className='sebetdekiler'>
                    {sebet.length > 0 ?
                        (sebet.map(item => {
                            return (
                                <div className='mehsul' key={item.id}>
                                    <div className='mehsul_img'>
                                        <Link to={`/details/${item.id}`} target='_blank'>
                                            <img src={item.sekil} alt={item.Title} />
                                        </Link>
                                    </div>
                                    <div className="mehsul_info">
                                        <h2 className='mehsul_adi'>{item.Title}</h2>
                                        <p className='mehsul_qiymeti'>{item.OriginalPrice} ₼</p>
                                        <p className='mehsul_say'>
                                            <button onClick={() => countArtir(item.id)}>+</button>
                                            <span>{item.count}</span>
                                            <button onClick={() => countAzalt(item.id)}>-</button>
                                        </p>
                                        <p className='cem_qiymet'>Cem: <span>{(item.OriginalPrice * item.count).toFixed(1)} ₼</span></p>
                                    </div>
                                </div>
                            )
                        }))
                        : <p>Hec bir mehsul elave edilmeyib!</p>}
                </div>
                {sebet.length > 0 && (<div className='total'>Total: <span>{total.toFixed(1)} ₼</span></div>)}
            </div>
        </div>
    )
}

export default Sebet