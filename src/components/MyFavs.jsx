import Title from "./Title";
import styles from '../styles/general.module.css';

const MyFavs = () => {

    const data = false;

    const photos = [
        'Hola',
        'Que tal',
        'Muy bien'
    ]


    return(
        <main className={styles.main}>
            {data ? <Title styles={styles.title} title="My Collection"/> : <Title styles={styles.title} title="You haven't added anything to favorites yet"/>}
            {data 
                ?<ul>
                    {photos.map((photo) => {
                        return <li key={photo}>{photo}</li>
                    })}
                 </ul> 
                : <img src="/no-image.png" alt="no-image"/> 
            }
            
        </main>

    )

}

export default MyFavs;