import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersReduce } from '../features/favorites/favoriteSlice.js';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CollectionsIcon from '@mui/icons-material/Collections';
import styles from '../styles/header.module.css';

const Filters = () => {

    const[filters, setFilter] = useState('');

    const status = useSelector((state) => state.favorites.data.status);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    const handleChange = (e) => {
        const value = e.target.value;
        setFilter(value);
    }

    useEffect(() => {
        if (status === 'pending') {
            console.log('Cargando... (cambiar por icono de carga)');
        } else {
            dispatch(filtersReduce(filters, 'favorites/filters'));
        }
    }, [dispatch, status, filters]);

    return (
        <div className={styles.filters}>
            {path === '/MyFavs' ? <FormControl className={styles.form}>
                <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                <Select
                    style={{borderRadius: '10px'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Filters"
                    onChange={handleChange}
                    value={filters}
                >
                    <MenuItem value="date">By date</MenuItem>
                    <MenuItem value="width">By width</MenuItem>
                    <MenuItem value="height">By height</MenuItem>
                    <MenuItem value="likes">By likes</MenuItem>
                </Select>
            </FormControl> : <></> }
            <Link to={'MyFavs'}>
                {/* <CollectionsIcon className={styles.favs} color="error" fontSize="medium" /> */}
                <p className={styles.favs} style={{textDecoration: 'none'}}>My Collection</p>
            </Link>       
        </div>
    )
}

export default Filters;