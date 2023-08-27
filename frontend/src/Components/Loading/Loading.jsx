import styles from "./CSS/Loading.css?inline";
import loading from "../../assets/loading.svg";

const Loading = () => {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;
