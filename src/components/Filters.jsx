import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CollectionsIcon from '@mui/icons-material/Collections';
import styles from '../styles/header.module.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../features/favoriteSlice";

const Filters = () => {

    const[filters, setFilter] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        dispatch(filter(filters, 'favorites/filter'));
    }

  /*   if(filters !== ''){
        dispatch(filter(filters, 'favorites/filter'));
    } */
/* 
    useEffect(() => {
        if(filters !== ''){
            dispatch(filter(filters, 'favorites/filter'));
        }
    },[dispatch]) */


    return (
        <div className={styles.filters}>
            <FormControl className={styles.form}>
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
            </FormControl>  
            <Link to={'MyFavs'}>
                <CollectionsIcon className={styles.favs} color="error" fontSize="medium" />
            </Link>       
        </div>
    )
}

export default Filters;