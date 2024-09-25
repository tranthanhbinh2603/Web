namespace App {
	export interface ValidateInterface {
		value: string | number;
		require: boolean;
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
	}

	export function validate(objList: ValidateInterface[]) {
		let isValid = true;

		for (const obj of objList) {
			if (obj.require) {
				isValid =
					isValid &&
					obj.value !== "" &&
					obj.value !== null &&
					obj.value !== undefined;
			}

			if (!isValid) {
				break;
			}

			if (typeof obj.value === "string") {
				if (obj.minLength != null) {
					isValid = isValid && obj.value.length >= obj.minLength;
				}
				if (obj.maxLength != null) {
					isValid = isValid && obj.value.length <= obj.maxLength;
				}
			}

			if (typeof obj.value === "number") {
				if (obj.min != null) {
					isValid = isValid && obj.value >= obj.min;
				}
				if (obj.max != null) {
					isValid = isValid && obj.value <= obj.max;
				}
			}

			if (!isValid) {
				break;
			}
		}

		return isValid;
	}
}
