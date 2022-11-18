import styles from './AddButton.module.scss';

function AddButton(props: { title: string }) {
  return (
    <button
      className={styles.button}
      style={{ marginRight: props.title === 'column' ? '30px' : '0' }}
    >
      + Add {props.title}
    </button>
  );
}

export default AddButton;
