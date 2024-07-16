import styles from "./Product.module.css";

export default function PageNotFound() {
	return (
		<main className={styles.product}>
			<section>
				<img
					src="img-2.jpg"
					alt="person with dog overlooking mountain with sunset"
				/>
				<div>
					<h2>Page not found</h2>
					<p>You go to wrong page. It is two paragraphs for you.</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
						dicta illum vero culpa cum quaerat architecto sapiente eius non
						soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
						perspiciatis?
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
						doloribus libero sunt expedita ratione iusto, magni, id sapiente
						sequi officiis et.
					</p>
				</div>
			</section>
		</main>
	);
}
