import styles from './Hero.module.css';  // Importa el módulo de estilos

const Hero = () => {
  return (
    <div className={styles['sustainable-container']}>
      {/* <div className={styles['text-container']}>
        <h1>
          We are Building a <span className={styles['highlight']}>Sustainable Future</span>
        </h1>
        <p>Committed to innovative practices and eco-friendly solutions.</p>
      </div> */}
      <div className={styles['content-container']}>
        <img
          src='/logo.png'  // Imagen en la carpeta public
          alt="Sustainable Worker"
          className={styles['sustainable-image']}
        />
      </div>
    </div>
  );
};

export default Hero;
