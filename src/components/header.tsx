import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🌟 1.000 repositórios com maior número de estrelas no GitHub 🌟</h1>
    </header>
  );
};

export default Header;
