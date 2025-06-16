import styles from './page.module.css';
import books from '../books/booksArray';

function BookPage() {
  return (
    <section id='AboutUs'>
      <div className={styles.aboutContainer}>
        {books.slice(0, 4).map((book, idx) => (
          <div key={idx} className={styles.bookItem}>
            <img
              src={book.imgUrl}
              alt={book.title ?? `Imagem ${idx + 1}`}
              className={styles.bookImage}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.bookButton}>Baixar PDF</button>
              <a href={"/teste"}><button className={styles.bookButton}>Jogo de tabuleiro</button></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookPage;