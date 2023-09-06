import { Link } from "react-router-dom";
import { useState } from "react";
import styles from '../styles/header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Filters from "./Filters";

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
                <Filters/>
            </div>
        </header>
    )
}

export default Header;