import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from '../service/service'

const AllContext = createContext()

export function MyContext({ children }) {

    const [katalog, setKatalog] = useState(false)
    const [bookData, setBookData] = useState([])
    const [catFilteredBook, setCatFilteredBook] = useState([])
    const [searchText, setSearchText] = useState('')
    const [axtaris, setAxtaris] = useState(false)
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
        const fetchData = async () => {
            try {
                const data = await getData()
                if (data && data.length > 0) {
                    return data
                }
                return null
            } catch (err) {
                console.log("Xəta var: " + err)
                return null
            }
        }

        (async () => {
            let data = await fetchData() // İlk cəhd
            if (data) {
                const unicData = data.filter(
                    (kitab, index, selfData) =>
                        index === selfData.findIndex(ktb => ktb.Title === kitab.Title)
                )
                setBookData(unicData)
                setCatFilteredBook(unicData)
                return
            }
            let count = 0
            const myInterval = setInterval(async () => { // Hər 2 saniyə yoxla (maksimum 10 dəfə)
                count++
                data = await fetchData()
                if (data) {
                    clearInterval(myInterval)
                    const unicData = data.filter(
                        (kitab, index, selfData) =>
                            index === selfData.findIndex(ktb => ktb.Title === kitab.Title)
                    )
                    setBookData(unicData)
                    setCatFilteredBook(unicData)
                } else if (count >= 10) {
                    clearInterval(myInterval)
                    console.log('10 cəhddən sonra data gəlmədi')
                }
            }, 2000)
        })()
    }, [])

    function kitabTap() {
        if (searchText.trim()) {
            const foundBook = bookData
                .filter(kitab => kitab.Title.toLowerCase().replace(/\s+/g, '')
                    .includes(searchText.toLowerCase().replace(/\s+/g, '')))
            setCatFilteredBook(foundBook)
            setSearchText('')
            setAxtaris(true)
        }
        else {
            setCatFilteredBook(bookData)
            setAxtaris(true)
        }
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

    return (
        <AllContext.Provider value={{
            searchText,
            setSearchText,
            bookData,
            setBookData,
            wishLits,
            setWishList,
            handleWish,
            katalog,
            closeKat,
            openKat,
            sebet,
            setSebet,
            catFilteredBook,
            setCatFilteredBook,
            kitabTap,
            axtaris
        }}>
            {children}
        </AllContext.Provider>
    )
}

export function useAllContext() {
    return useContext(AllContext)
}
