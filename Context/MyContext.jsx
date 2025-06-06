import React, { createContext, useContext, useEffect, useState } from 'react'
import { getData } from '../src/service/service'

const AllContext = createContext()

export function MyContext({ children }) {

    const [bookData, setBookData] = useState([])
    const [filteredKitab, setFilteredKitab] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getData()
            setBookData(data)
        })();
    }, [])

    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (searchText){
            const foundBook = bookData.filter(kitab => kitab.Title.toLowerCase().includes(searchText.toLowerCase()))
            setFilteredKitab(foundBook)
        }
        else{
            setFilteredKitab(bookData)
        }
}, [searchText, bookData])

return (
    <AllContext.Provider value={{ filteredKitab, searchText, setSearchText }}>
        {children}
    </AllContext.Provider>
)
}

export function useAllContext() {
    return useContext(AllContext)
}
