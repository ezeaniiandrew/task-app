import styles from "./footer.module.css";

function Footer() {
  return (
    <div data-testid="drag-n-drop">
      <p className={styles.footer}>Drag and drop to reorder list</p>
    </div>
  );
}

export default Footer;
