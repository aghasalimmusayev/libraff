import React from 'react'
import { useAllContext } from '../../../Context/MyContext'
import { Link } from 'react-router-dom'
import { AiOutlineClear } from "react-icons/ai";
import '../../../CSS/sebet.css'
import { FaRegTrashCan } from "react-icons/fa6";

function Sebet() {

    const { sebet, countArtir, countAzalt, setSebet } = useAllContext()
    const total = sebet?.reduce((cem, item) => {
        const qiymet = item.OriginalPrice > item.DiscountedPrice ? item.DiscountedPrice : item.OriginalPrice
        return cem + (qiymet * item.count)
    }, 0)
    function sebetClear() {
        setSebet([])
    }
    function removeBook(id) {
        setSebet(sebet.filter(item => item.id !== id))
    }

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
                                        <p className='mehsul_qiymeti'
                                            style={item.DiscountedPrice < item.OriginalPrice
                                                ? { textDecoration: 'line-through', color: 'gray' }
                                                : {}}>
                                            {item.OriginalPrice} ₼</p>
                                        {item.OriginalPrice > item.DiscountedPrice && <p className='mehsul_qiymeti'>{item.DiscountedPrice} ₼</p>}
                                        <p className='mehsul_say'>
                                            <button onClick={() => countAzalt(item.id)}>-</button>
                                            <span>{item.count}</span>
                                            <button onClick={() => countArtir(item.id)}>+</button>
                                        </p>
                                        <p className='cem_qiymet'>Cem:
                                            <span>
                                                {((item.OriginalPrice > item.DiscountedPrice ? item.DiscountedPrice : item.OriginalPrice) * item.count).toFixed(2)} ₼
                                            </span></p>
                                        <button className='remove_btn' onClick={() => removeBook(item.id)}>
                                            <FaRegTrashCan />
                                            <span>Sil</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        }))
                        : <p className='empty_info'>Hec bir mehsul elave edilmeyib!</p>}
                </div>
                <hr />
                {sebet.length > 0 && (<div className='total'>Cem mebleg: <span>{total.toFixed(2)} ₼</span></div>)}
                {sebet.length > 0 &&
                    <div className='sebet_btns'>
                        <button className="clear_btn" onClick={sebetClear}>
                            <AiOutlineClear />
                            <span>Siyahini sifirla</span>
                        </button>
                        <Link to={"/Checkout"} className='checkout'>Sifarisi tesdiqle</Link>
                    </div>}
            </div>
        </div>
    )
}

export default Sebet