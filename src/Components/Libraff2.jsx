import React, { useEffect, useState } from 'react'
import "../CSS/libraff3.css"

function Libraff2() {
    // Data state remains the same
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/kategory.json")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.error("Xeta var: " + error)
            })
    }, [])


    // Navigation state - this is the key addition for responsive behavior
    const [currentView, setCurrentView] = useState('main') // 'main', 'sub', 'elements'
    const [navigationStack, setNavigationStack] = useState([]) // For breadcrumb navigation

    // Existing states with enhanced functionality
    const [altCatalog, setAltCatalog] = useState([])
    const [element, setElement] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubCategory, setSelectedSubCategory] = useState('')

    // Enhanced functions with responsive navigation logic
    function makeAlt(catName) {
        let altData = data.find(item => item.name === catName)
        setAltCatalog(altData)
        setElement([])
        setSelectedCategory(catName)
        setSelectedSubCategory('')

        // Responsive navigation logic
        if (window.innerWidth <= 768) {
            setCurrentView('sub')
            setNavigationStack([{ name: catName, view: 'main' }])
        }
    }

    function makeElement(elementName) {
        if (altCatalog.altCategory) {
            let elementData = altCatalog.altCategory.find(item => item.name === elementName)
            setElement(elementData)
            setSelectedSubCategory(elementName)

            // Responsive navigation logic
            if (window.innerWidth <= 768) {
                setCurrentView('elements')
                setNavigationStack(prev => [...prev, { name: elementName, view: 'sub' }])
            }
        }
    }

    // Navigation functions for mobile
    function goBack() {
        if (navigationStack.length > 0) {
            const previous = navigationStack[navigationStack.length - 1]
            setNavigationStack(prev => prev.slice(0, -1))

            if (previous.view === 'main') {
                setCurrentView('main')
            } else if (previous.view === 'sub') {
                setCurrentView('sub')
            }
        }
    }

    function goToMain() {
        setCurrentView('main')
        setNavigationStack([])
        setSelectedCategory('')
        setSelectedSubCategory('')
    }

    // Responsive layout detection
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)

            // Reset to desktop layout when switching to larger screen
            if (!mobile) {
                setCurrentView('main')
                setNavigationStack([])
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Render functions for different views
    const renderMainCategories = () => (
        <ul className='main_katalog'>
            {data.map(item => (
                <li className='kat_name' key={item.id} onMouseOver={() => !isMobile && makeAlt(item.name)} onClick={() => makeAlt(item.name)}>
                    <a href="#">
                        {item.name}
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </li>
            ))}
        </ul>
    )

    const renderSubCategories = () => (
        <ul className='alt_katalog'>
            {altCatalog.altCategory ? (
                altCatalog.altCategory.map(altItem => {
                    const icon = altItem.elementler
                    const arrowIcon = icon ? <i className="fa-solid fa-angle-right"></i> : ""
                    return (
                        <li className='alt_kat_name' key={altItem.id}
                            onMouseOver={() => !isMobile && makeElement(altItem.name)}
                            onClick={() => makeElement(altItem.name)}>
                            <a href="#">{altItem.name}{arrowIcon}</a>
                        </li>
                    )
                })
            ) : (
                altCatalog.elementler?.map(altItem => (
                    <li className='alt_kat_name' key={altItem.id}>
                        <a href="#">{altItem.name}</a>
                    </li>
                ))
            )}
        </ul>
    )

    const renderElements = () => (
        <ul className='elements'>
            {altCatalog.altCategory && element.elementler?.map(elementItem => (
                <li className='element_name' key={elementItem.id}>
                    <a href="">{elementItem.name}</a>
                </li>
            ))}
        </ul>
    )

    const renderBreadcrumb = () => (
        <div className="breadcrumb">
            <button onClick={goToMain} className="breadcrumb-home">
                <i className="fa-solid fa-home"></i>
            </button>
            {navigationStack.length > 0 && (
                <button onClick={goBack} className="breadcrumb-back">
                    <i className="fa-solid fa-arrow-left"></i>
                    Back
                </button>
            )}
            <span className="breadcrumb-current">
                {selectedSubCategory || selectedCategory || 'Categories'}
            </span>
        </div>
    )

    return (
        <div className='katalog_menu'>
            <div className="katalog_box">
                {/* Mobile navigation header */}
                {isMobile && (
                    <div className="mobile-header">
                        {renderBreadcrumb()}
                    </div>
                )}

                <div className="catalog-content">
                    {isMobile ? (
                        // Mobile: Single column view with navigation
                        <div className="mobile-view">
                            {currentView === 'main' && renderMainCategories()}
                            {currentView === 'sub' && renderSubCategories()}
                            {currentView === 'elements' && renderElements()}
                        </div>
                    ) : (
                        // Desktop: Traditional three-column layout
                        <>
                            {renderMainCategories()}
                            {renderSubCategories()}
                            {renderElements()}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Libraff2