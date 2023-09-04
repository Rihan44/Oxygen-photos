import { Link } from "react-router-dom"
import CollectionsIcon from '@mui/icons-material/Collections';
import TuneIcon from '@mui/icons-material/Tune';
import styles from '../styles/header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';

const Header = () => {
    const[filter, setFilter] = useState();


    return (
        <header className={styles.head}>
            <Link to={'/'}><img className={styles.logo} src="/logo.png" alt="logo"/></Link>
            <div className={styles.headerInputs}>
                <div className={styles.searchs}>
                    <SearchIcon style={{marginRight: '10px'}} color="error" fontSize="medium"></SearchIcon>
                    <TextField className={styles.textField} placeholder="Search description" />
                </div>
                <div className={styles.filters}>
                    <FormControl className={styles.form}>
                        <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                        <Select
                            style={{borderRadius: '10px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Filters"
                        >
                            <MenuItem value={0}>By date</MenuItem>
                            <MenuItem value={0}>By width</MenuItem>
                            <MenuItem value={0}>By height</MenuItem>
                            <MenuItem value={0}>By likes</MenuItem>
                        </Select>
                    </FormControl>  
                    <Link to={'MyFavs'}>
                        <CollectionsIcon className={styles.favs} color="error" fontSize="medium" />
                    </Link>       
                </div>
            </div>
        </header>
    )
}

export default Header;