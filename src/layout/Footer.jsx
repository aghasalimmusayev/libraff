import React from 'react'
import '../CSS/footer.css'

function Footer() {
    function goTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div className="footer_bg">
            <div className='container'>
                <div className="footer_content">
                    <p>© 2025 Aga-Libraff.</p>
                    <span onClick={goTop}>Yuxari qalx</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
