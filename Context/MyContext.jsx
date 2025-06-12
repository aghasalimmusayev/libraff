import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from '../src/service/service'

const AllContext = createContext()

export function MyContext({ children }) {

    const [katalog, setKatalog] = useState(false)
    const [bookData, setBookData] = useState([])
    const [filteredKitab, setFilteredKitab] = useState([])
    const [searchText, setSearchText] = useState('')
    const [sebet, setSebet] = useState([])
    const [wishLits, setWishList] = useState(() => {
        try {
            const savedWishList = localStorage.getItem('wishList')
            return savedWishList ? JSON.parse(savedWishList) : []
        } catch (error) {
            console.error('localStorage oxunarkən xəta:', error)
            return []
        }
    })

    useEffect(() => {
        (async () => {
            const data = await getData()
            const unicData = data.filter(
                (kitab, index, selfData) =>
                    index === selfData.findIndex(ktb => ktb.Title === kitab.Title)
            )
            setBookData(unicData)
        })();
    }, [])

    useEffect(() => {
        if (searchText) {
            const foundBook = bookData.filter(kitab => kitab.Title.toLowerCase().includes(searchText.toLowerCase()))
            setFilteredKitab(foundBook)
        }
        else {
            setFilteredKitab(bookData)
        }
    }, [searchText, bookData])

    function handleWish(kitab) {
        const wishVar = wishLits.some(item => item.id === kitab.id)
        if (wishVar) setWishList(prev => prev.filter(item => item.id !== kitab.id))
        else setWishList([...wishLits, kitab])
    }

    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishLits))
    }, [wishLits])

    function closeKat() {
        setKatalog(false)
    }
    function openKat() {
        setKatalog(true)
    }
    function addToCart(id) {
        const alKitab = bookData.find(item => item.id === id)
        setSebet(prev => [...prev, alKitab])
    }

    return (
        <AllContext.Provider value={{
            filteredKitab,
            searchText,
            setSearchText,
            bookData,
            wishLits,
            setWishList,
            handleWish,
            katalog,
            closeKat,
            openKat,
            addToCart,
            sebet
        }}>
            {children}
        </AllContext.Provider>
    )
}

export function useAllContext() {
    return useContext(AllContext)
}
