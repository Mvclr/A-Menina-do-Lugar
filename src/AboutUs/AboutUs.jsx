import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './about.module.css';
import books from '../books/booksArray';

export default function AboutUs() {
  return (

      <div className={styles.aboutContainer} id='sobreNós'>
        <div className={styles.aboutText}>
          <h4 className={styles.aboutSubheading}>A Menina do Lugar</h4>
          <h2 className={styles.aboutHeading}>Cultura e Educação</h2>
          <p className={styles.aboutParagraph}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo consectetur
            odio quisquam impedit, repudiandae sed unde, explicabo aliquid est, minima
            dicta autem recusandae earum voluptatum magni cum expedita voluptatem dolor.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt doloribus molestias, modi necessitatibus ipsum dolorum corrupti temporibus veritatis quis voluptatum molestiae, debitis laudantium? Ea officia eum minima error temporibus in.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit excepturi facere explicabo eius, itaque doloribus minus dolor optio voluptate architecto blanditiis odio mollitia culpa eveniet autem. Facilis quia dolores ad. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ipsa vero nihil et sit qui mollitia. Quod ad ipsam iusto qui earum, dolores optio, voluptas laudantium ut officia impedit rerum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti quo eos minus delectus cum consequatur reprehenderit ullam numquam, eveniet repellat est. Minus neque error earum illum dignissimos iste saepe corrupti?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consectetur exercitationem illo doloremque, omnis, animi iure, officia suscipit rerum harum aliquid quod? Corporis aperiam nihil aliquid laborum soluta voluptatibus cupiditate.
          </p>
        </div>

        <Swiper
          className={styles.swiperContainer}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {books.slice(0, 4).map((book, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={book.imgUrl}
                alt={book.title ?? `Imagem ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

  );
}
