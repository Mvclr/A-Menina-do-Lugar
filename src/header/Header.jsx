import styles from './Header.module.css'
function Header(){
    
    return(
        <header className={styles.header}>
    <div className={styles.logo}>A Menina do Lugar</div>
    
    <nav className={styles.navLinks}>
      <a href="#Livros" >Livros</a>
      <a href="#sobreNós" >Sobre Nós</a>
      <a href="#contato" >Contato</a>
    </nav>
  </header>
    );

}

export default Header