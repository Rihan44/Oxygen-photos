import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPhotosQuery } from "../features/searchSlice";

import styles from '../styles/header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Filters from "./Filters";
import { searchFavorites } from "../features/favoriteSlice";


const Header = () => {
    const[search, setSearch] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

    useEffect(() => {
        if (path === '/') {
            dispatch(getPhotosQuery(search, path)); 
        } /* else {
            dispatch(searchFavorites(search, 'favorites/searchFavorites')); 
        } */
    }, [search, path, dispatch]);

    return (
        <header className={styles.head}>
            <Link to={'/'}><img className={styles.logo} src="/logo.png" alt="logo" /></Link>
            <div className={styles.headerInputs}>
                <div className={styles.searchs}>
                    <SearchIcon style={{ marginRight: '10px' }} color="error" fontSize="medium"></SearchIcon>
                    <TextField value={search} onChange={handleOnChange} className={styles.textField} placeholder="Search description" />
                </div>
                <Filters />
            </div>
        </header>
    )
}

export default Header;