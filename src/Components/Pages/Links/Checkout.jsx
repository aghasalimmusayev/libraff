import React, { useState } from 'react'
import { useAllContext } from '../../../Context/MyContext'
import '../../../CSS/checkout.css'
import { Link } from 'react-router-dom'
import { FaRegTrashCan } from "react-icons/fa6";
import { sellBooks } from '../../../service/service';

function Checkout() {

    const { sebet, setSebet } = useAllContext()
    const ordersPrice = sebet.reduce((acc, book) => (book.OriginalPrice * book.count) + acc, 0).toFixed(2)
    const endirim = sebet.reduce((acc, book) => ((book.OriginalPrice - book.DiscountedPrice) * book.count) + acc, 0).toFixed(2)
    const cemMebleg = (ordersPrice - endirim).toFixed(2)
    const mehsulSayi = sebet.reduce((acc, book) => book.count + acc, 0)
    const [ugurlu, setUgurlu] = useState(false)
    function removeBook(id) {
        setSebet(sebet.filter(item => item.id !== id))
    }
    async function makeOrder() {
        try {
            for (const book of sebet) {
                const satisSayi = book.satildi || 0;
                const stok = book.stokSayi || 0;
                const updateData = {
                    satildi: satisSayi + book.count,
                    stokSayi: Math.max(0, stok - book.count) // Stok mənfi olmasın
                };
                await sellBooks(book.id, updateData);
            }
            setSebet([]);
            setUgurlu(true)
            setTimeout(() => {
                setUgurlu(false)
            }, 5000);
        } catch (error) {
            console.error("Sifariş zamanı xəta:", error);
            alert("Sifarişdə xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
        }
    }
    return (
        <div className='container'>
            <div className='checkout_box'>
                <h2 className='section_head'>Sifarişi təsdiqləmək</h2>
                {ugurlu && <div className='payment_info'>Sifarisiniz ugurla qeyde alindi</div>}
                <div className='checkout_content'>
                    {sebet?.length > 0 && <div className='shipping_info'>
                        <div className='personal_info'>
                            <label htmlFor="">Şəxsi məlumat</label>
                            <div className='personal_info_inp'>
                                <input type="text" placeholder='Ad, Soyad' />
                                <input type="number" placeholder='Telefon' />
                                <input type="email" placeholder='E-poct' />
                            </div>
                        </div>
                        <div className="delivery_info">
                            <label htmlFor="">Çatdırılma detalları</label>
                            <div className="delivery_info_inp">
                                <select name="" id="">
                                    <option hidden value="Secim">Seher secin</option>
                                    <option value="Baki">Baki</option>
                                    <option value="Sumqayit">Sumqayit</option>
                                    <option value="Rayonlar">Rayonlar</option>
                                </select>
                                <input type="text" placeholder='Poct indeksi' />
                                <input type="text" placeholder='Unvan' />
                            </div>
                        </div>
                    </div>}
                    <div className='order_info'>
                        <div className="order_cost">
                            <h3>Sifarişiniz</h3>
                            <div className="const">
                                <div><span>Məhsul sayı:	</span>{mehsulSayi} eded</div>
                                <div><span>Məbləğ: </span>{ordersPrice} ₼</div>
                                <div><span>Endirim </span>{endirim} ₼</div>
                                <div><span>Sifarişin Cəmi</span>{cemMebleg} ₼</div>
                                <button onClick={makeOrder}>Sifarişi təsdiq et <span>{cemMebleg} ₼</span></button>
                            </div>
                        </div>
                        {sebet?.length > 0 && <div className="selected_orders">
                            <h5>Məhsullar</h5>
                            {sebet?.map(item => {
                                return (
                                    <div className='order' key={item.id}>
                                        <div className='order_img'>
                                            <Link to={`/details/${item.id}`} target='_blank'>
                                                <img src={item.sekil} alt={item.Title} />
                                            </Link>
                                        </div>
                                        <div className="order_info">
                                            <h2 className='order_adi'>{item.Title}</h2>
                                            <p className='order_qiymeti'
                                                style={item.DiscountedPrice < item.OriginalPrice
                                                    ? { textDecoration: 'line-through', color: 'gray' }
                                                    : {}}>
                                                {item.OriginalPrice} ₼</p>
                                            {item.DiscountedPrice < item.OriginalPrice && <p className='order_qiymeti'>{item.DiscountedPrice} ₼</p>}
                                            <p className='order_say'>{item.count} <span>eded</span></p>
                                            <p className='cem_qiymet'>Cem:
                                                <span>
                                                    {((item.OriginalPrice > item.DiscountedPrice ? item.DiscountedPrice : item.OriginalPrice) * item.count).toFixed(1)} ₼
                                                </span></p>
                                            <button className='remove_btn' onClick={() => removeBook(item.id)}>
                                                <FaRegTrashCan />
                                                <span>Sil</span>
                                            </button>
                                        </div>
                                    </div>)
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
