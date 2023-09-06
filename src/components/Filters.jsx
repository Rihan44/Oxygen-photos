import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CollectionsIcon from '@mui/icons-material/Collections';
import styles from '../styles/header.module.css';

const Filters = () => {
    return (
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
    )
}

export default Filters;