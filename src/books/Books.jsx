import styles from './Books.module.css'
import books from './booksArray.jsx'

function Book() {
  async function handleClick() {
    try {
      const response = await fetch(
        '/bookPage', 
        {method: 'GET'}
      );
      if (!response.ok) {
        throw new Error('Sem resposta do servidor');
      }
      console.log('Resposta do servidor:', response);
    } catch (error) {
      console.error('Erro chamando endpoint /bookPage:', error);
    }
  }

  return (
    
      <main className={styles.imageSection} id='Livros'>
        
        {books.map((book, index) => (
          <div key={index} className={styles.imgDiv}>
            <span className={styles.bookTitle}>{book.name}</span>
            <img 
              onClick={handleClick}
              src={book.imgUrl} 
              alt={book.name}
              className={styles.bookImage}
            />
            <button>Baixar PDF</button>
            <button>Jogo de Tabuleiro</button>
          </div>
        ))}
      </main>

  );
}

export default Book;
