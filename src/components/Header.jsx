import { Link } from "react-router-dom"
import CollectionsIcon from '@mui/icons-material/Collections';
import styles from '../styles/header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';

const Header = () => {
    const[search, setSearch] = useState('');

    const handleOnChange = (e) => {
        setSearch(e.target.value);
        console.log(search)
    }

    return (
        <header className={styles.head}>
            <Link to={'/'}><img className={styles.logo} src="/logo.png" alt="logo"/></Link>
            <div className={styles.headerInputs}>
                <div className={styles.searchs}>
                    <SearchIcon style={{marginRight: '10px'}} color="error" fontSize="medium"></SearchIcon>
                    <TextField value={search} onChange={handleOnChange} className={styles.textField} placeholder="Search description" />
                </div>
                {/* meterlo dentro de un componente distinto */}
                <div className={styles.filters}>
                    <FormControl className={styles.form}>
                        <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                        <Select
                            style={{borderRadius: '10px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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