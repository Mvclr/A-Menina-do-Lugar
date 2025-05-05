import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} A Menina do Lugar</p>
        </footer>

    );
}

export default Footer