import styles from "./Button.module.css";

/* eslint-disable react/prop-types */
function Button({ children, type, onclick }) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={onclick}>
			{children}
		</button>
	);
}

export default Button;
