import React, { useEffect, useState } from 'react'
import "../CSS/libraff.css"
// import "../CSS/libraff2.css"
// import kategory from "../kategory.json"

function Libraff() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("/kategory.json")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.error("Xeta var: " + error)
            })
    }, [])
    useEffect(() => {
        // console.log(data)
    }, [data])

    return (
        <>
            <div className='katalog_menu'>
                <div className="katalog_box">
                    <ul className='main_kat_box'>
                        {data.map((item, index) => {
                            return <li key={index} className='kat_list'><a href="">{item.name}</a>
                                {item.altCategory && (
                                    <ul className='kat_list_inner_box'>
                                        {item.altCategory.map((katName, subIndex) => {
                                            return (
                                                <li key={subIndex} className='kat_list_inner'>
                                                    <a href="#">{katName.name}</a>
                                                    {katName.elementler && (
                                                        <ul className='element_box'>
                                                            {katName.elementler.map((element, elementIndex) => {
                                                                return (
                                                                    <li key={elementIndex} className='elementler'>
                                                                        <a href="#">{element}</a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                                {!item.altCategory && item.elementler && (
                                    <ul className='kat_list_inner_box'>
                                        {item.elementler.map((element, elementIndex) => {
                                            return (
                                                <li key={elementIndex} className='kat_list_inner'>
                                                    <a href="#">{element}</a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Libraff
