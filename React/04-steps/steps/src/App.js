import { useState } from "react";

const steps = ["Learn React", "Apply new job", "Invest your new income"];

export default function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);
	const incStep = () => {
		if (step < 3) setStep(step + 1);
	};
	const decStep = () => {
		if (step > 1) setStep(step - 1);
	};
	return (
		<>
			<button
				className="close"
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				&times;
			</button>
			{isOpen ? (
				<div className="steps">
					<div className="numbers">
						<div className={step >= 1 ? "active" : ""}>1</div>
						<div className={step >= 2 ? "active" : ""}>2</div>
						<div className={step >= 3 ? "active" : ""}>3</div>
					</div>
					<p className="message">
						Step {step}: {steps[step - 1]}
					</p>
					<div className="buttons">
						<button className="button" onClick={decStep}>
							Previous
						</button>
						<button className="button" onClick={incStep}>
							Next
						</button>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}
