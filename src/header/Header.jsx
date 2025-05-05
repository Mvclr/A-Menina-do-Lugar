import styles from './Header.module.css'
function Header(){
    
    return(
        <header className={styles.header}>
    <div className={styles.logo}>A Menina do Lugar</div>
    
    <nav className={styles.navLinks}>
      <a href="#Home" >Livros</a>
      <a href="#AboutUs" >Sobre Nós</a>
      <a href="#ContactUs" >Contato</a>
    </nav>
  </header>
    );

}

export default Header