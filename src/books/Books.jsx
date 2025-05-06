import styles from './Books.module.css'
import books from './booksArray.jsx'

function Book() {
  return (
    <section id='Home'>
      <h1>Livros</h1>
      <main className={styles.imageSection}>
        {books.map((book, index) => (
          <div key={index} className={styles.imgDiv}>
            <span className={styles.bookTitle}>{book.name}</span>
            <img 
              src={book.imgUrl} 
              alt={book.name}
              className={styles.bookImage}
            />
          </div>
        ))}
      </main>
    </section>
  );
}

export default Book;
