import React from "react"
 import './filter.module.css'
import { useDispatch, useSelector } from "react-redux"
import { onSearch } from "../../redux/store/searchSlicer";
import { getSearch } from "../../redux/store/selector";

export const Filter = () => {
        
        const dispatch = useDispatch();
        const search = useSelector(getSearch)

        const onChange = (e) => {
                const inputData = e.target.value.trim()

                dispatch(onSearch(inputData))
        }

return (<input
         type="search"
         name="search"
        id="search"
        value={search}
        onChange={onChange}
         />)
 }