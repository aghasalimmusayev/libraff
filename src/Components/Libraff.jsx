import React, { useEffect, useState } from 'react'
import "../CSS/libraff.css"

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

    const [altCatalog, setAltCatalog] = useState([])
    function makeAlt(catName) {
        let altData = data.find(item => item.name == catName)
        setAltCatalog(altData)
        setElement([])
    }

    const [element, setElement] = useState([])
    function makeElement(elementName) {
        let elementData = altCatalog.altCategory?.find(item => item.name == elementName)
        setElement(elementData)
    }

    return (
        <>
            <div className='katalog_menu'>
                <div className="katalog_box">
                    <ul className='main_katalog'>
                        {data.map(item => {
                            return <li className='kat_name' key={item.id} onMouseOver={() => makeAlt(item.name)}>
                                <a href="#">{item.name}<i className="fa-solid fa-angle-right"></i></a>
                            </li>
                        })}
                    </ul>
                    <ul className='alt_katalog'>
                        {altCatalog.altCategory ?
                            (altCatalog.altCategory?.map(altItem => {
                                const icon = altItem.elementler 
                                const arrowIcon = icon ? <i className="fa-solid fa-angle-right"></i> : ""
                                return <li className='alt_kat_name' key={altItem.id} onMouseOver={() => makeElement(altItem.name)}>
                                    <a href="#">{altItem.name}{arrowIcon}</a>
                                </li>
                            })) :
                            (altCatalog.elementler?.map(altItem => {
                                return <li className='alt_kat_name' key={altItem.id} onMouseOver={() => makeElement(altItem.name)}>
                                    <a href="#">{altItem.name}</a>
                                </li>
                            }))
                        }
                    </ul>
                    <ul className='elements'>
                        {altCatalog.altCategory && element.elementler?.map(elementItem => {
                            return <li className='element_name' key={elementItem.id}>
                                <a href="">{elementItem.name}</a></li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Libraff
