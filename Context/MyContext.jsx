import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from '../src/service/service'

const AllContext = createContext()

export function MyContext({ children }) {

    const [katalog, setKatalog] = useState(false)
    const [bookData, setBookData] = useState([])
    const [catFilteredBook, setCatFilteredBook] = useState([])
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
            try {
                const data = await getData()
                const unicData = data.filter(
                    (kitab, index, selfData) =>
                        index === selfData.findIndex(ktb => ktb.Title === kitab.Title)
                )
                setBookData(unicData)
                setCatFilteredBook(unicData)
            }
            catch (err) {
                console.log("Xeta var: " + err)
            }
        })();
    }, [])

    function kitabTap() {
        if (searchText.trim()) {
            const foundBook = bookData
                .filter(kitab => kitab.Title.toLowerCase().replace(/\s+/g, '')
                    .includes(searchText.toLowerCase().replace(/\s+/g, '')))
            setCatFilteredBook(foundBook)
            setSearchText('')
        }
        else setCatFilteredBook(bookData)
    }

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
        window.scroll({ top: 0, behavior: "smooth" })
    }
    function addToCart(id) {
        const alKitab = bookData.find(item => item.id === id)
        const sebetdeVar = sebet.find(item => alKitab.id == item.id)
        if (!sebetdeVar) setSebet(prev => [...prev, { ...alKitab, "count": 1 }])
        else {
            setSebet(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, count: item.count + 1 } : item
                )
            );
        }
    }
    function countArtir(id) {
        setSebet(prev =>
            prev.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    }
    function countAzalt(id) {
        setSebet(prev =>
            prev.map(item =>
                item.id === id && item.count > 1
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );
    }

    return (
        <AllContext.Provider value={{
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
            sebet,
            setSebet,
            countArtir,
            countAzalt,
            catFilteredBook,
            setCatFilteredBook,
            kitabTap
        }}>
            {children}
        </AllContext.Provider>
    )
}

export function useAllContext() {
    return useContext(AllContext)
}
