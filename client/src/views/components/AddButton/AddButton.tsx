import styles from './AddButton.module.scss';

function AddButton(props: { title: string; callCreate?: () => void }) {
  return (
    <button
      className={styles.button}
      onClick={props.callCreate}
      style={{ marginRight: props.title === 'column' ? '30px' : '0' }}
    >
      + Add {props.title}
    </button>
  );
}

export default AddButton;
