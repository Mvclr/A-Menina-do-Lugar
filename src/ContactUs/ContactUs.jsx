import styles from './ContactUs.module.css';
import { useRef } from 'react';


function ContactUs(){
  const emailRef = useRef(null);
  const mensagemRef = useRef(null);
  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(emailRef.current.textContent);
      mensagemRef.current.textContent = "Email copiado com sucesso!";
      setTimeout(() => {
        mensagemRef.current.textContent = ""; // Limpa a mensagem após 2 segundos
      }, 6000);
    } catch (error) {
      alert("Erro ao copiar.");
      console.log(error);  
    }
  };
  
  return (
     
      
      <main className={styles.contato} id='contato'>
        
      <h2 className={styles.titulo}>Nos contate</h2>
      <p className={styles.subtitulo}>
        Fale conosco de diferentes formas!
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={`${styles.cardTitulo} ${styles.email}`}>Email</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam repellat commodi, at sapiente incidunt, voluptates minus eveniet ipsa ad cumque error laborum itaque aliquid ut facilis enim quisquam recusandae? Sit.</p>
          <p ref={emailRef}>contatoExemplo@email.com</p>
          <button onClick={copiarTexto}>Copiar email</button>
              <p className={`styles.mensagemCopy`} ref={mensagemRef}></p>
        </div>

        <div className={styles.card}>
          <h3 className={`${styles.cardTitulo} ${styles.support}`}>Instagram</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nam quod temporibus numquam quisquam. Aperiam quae repudiandae pariatur quod distinctio mollitia quis laborum ipsum illum? Officia culpa laudantium magnam qui.</p>
          <a href="https://www.instagram.com/ifal.maceio/" target='_blank'><button>Ir para nosso Instagram</button></a>
          <p>Ou nos procure com o @ifal.maceio</p>
        </div>

        <div className={styles.card}>
          <h3 className={`${styles.cardTitulo} ${styles.media}`}>Sede</h3>
          <p>Venha nos ver pessoalmente no Campus Máceio do IFAL</p>
          <p>Endereço: R. Mizael Domingues, 530 - Centro, Maceió - AL, 57020-600</p>
          <a href="https://www.google.com/maps/place/Instituto+Federal+de+Alagoas/@-9.6640396,-35.7329058,17z/data=!3m1!4b1!4m6!3m5!1s0x701457996307ad5:0x1d22c2c44f26f853!8m2!3d-9.6640396!4d-35.7303309!16s%2Fg%2F1229dxbv?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" target='_blank'><button>Ver no GoogleMaps</button></a>
        </div>

      </div>
      </main>
  );
};

export default ContactUs;
