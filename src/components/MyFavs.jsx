import Title from "./Title";
import styles from '../styles/general.module.css';

import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDescription, removePhoto } from "../features/favorites/favoriteSlice";
import { AlertModal } from "./AlertModal";

export const MyFavs = () => {

    const[data, setData] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const[description, setNewDescription] = useState('');
    const[myFavs, setMyFavs] = useState([]);

    const dispatch = useDispatch();
    const status = useSelector((state) => state.favorites.status);
    const dataFav = useSelector((state) => state.favorites.data);
    let contador = 0;

    useEffect(() => {

        if(status === 'pending'){
            setData(false);
        } else {
            let dataPhotos = [];
            dataFav.forEach(photo => {
                dataPhotos.push(photo);
            });
            setData(true);
    
            setMyFavs(dataPhotos);
        }

    }, [status, dataFav])

    const handleOnChange = (e, info) => {
        const newDescription = { ...info, alt_description: e.target.value };
        setNewDescription(e.target.value);
        setModalInfo(newDescription);

        dispatch(changeDescription(newDescription));
    }   

    const handleFav = (photo) => {
        setOpenAlert(true);
        const info = {id: photo.id};

        dispatch(removePhoto(info));
    };

    const handleOpen = (info) => {
        setOpen(true);
        setModalInfo(info);
        setNewDescription(info.alt_description)
    };

    const handleClose = () => setOpen(false);

    return(
        <main className={styles.main}>
            { status === 'pending' ? <div className={styles.loader}></div> : <></> }
            {data ? <Title styles={styles.title} title="My Collection"/> : <Title styles={styles.title} title="You haven't added anything to favorites yet"/>}
            <div className={styles.photosMain}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.styleModalBox}>
                        <div className={styles.modalMain}>
                                <img className={styles.imgModal} src={modalInfo.url} alt='image_data'/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <div className={styles.modalInfo}>
                                        <div className={styles.modalInfoInput}>
                                            <EditIcon/>
                                            <TextField 
                                                value={description} 
                                                onChange={(e) => handleOnChange(e, modalInfo)}
                                                className={styles.modalInput} 
                                                placeholder="Search description" 
                                            />
                                        </div>  
                                    </div>
                                </Typography>
                                <div className={styles.modalInfo}>
                                    <div className={styles.modalInfoBox}>
                                        <HeightIcon fontSize="medium"/>
                                        <p>{modalInfo.height}px</p>
                                    </div>
                                    <div className={styles.modalInfoBox}>
                                        <SyncAltIcon fontSize="medium"/>
                                        <p>{modalInfo.width}px</p>
                                    </div>
                                    <div style={{marginRight: '20px'}} className={styles.modalInfoBox}>
                                        <FavoriteIcon fontSize="medium"/>
                                        <p>{modalInfo.likes}</p>
                                    </div>
                                    <div className={styles.modalInfoBox}>
                                        <DateRangeIcon style={{marginLeft: '15px'}} fontSize="medium"/>
                                        <p>{modalInfo.dateAdded}</p>
                                    </div>
                                </div>
                            </div>
                    </Box>
                </Modal>
                <AlertModal 
                    alertContent='Removed from favs!' 
                    openAlert={openAlert}
                    onClose={handleClose}
                    setOpenAlert={() => setOpenAlert(false)}
                /> 
            {data
                ? myFavs?.map((dataPhoto) => {
                        return (
                            <div key={dataPhoto.id + contador++} className={styles.photoBox}>
                                <img src={dataPhoto.url} alt='image_fav' />
                                <div className={styles.buttons}>
                                    <button>
                                        <DownloadIcon color="error" fontSize="medium" />
                                    </button>
                                    <div>
                                        <button onClick={() => handleFav(dataPhoto)}>
                                            <BookmarkIcon color='error' fontSize="medium" /> 
                                        </button>
                                        <button onClick={() => handleOpen(dataPhoto)}>
                                            <ZoomOutMapIcon color='error' fontSize="medium" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                })
                : <img src="/no-image.png" alt="no_imageFav"/> 

                }
            </div>     
        </main>
    )
}
