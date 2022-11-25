import styles from './AddButton.module.scss';

function AddButton(props: { title: string; callCreate: () => void }) {
  return (
    <button className={styles.button} onClick={props.callCreate} data-title={props.title}>
      + Add {props.title}
    </button>
  );
}

export default AddButton;
