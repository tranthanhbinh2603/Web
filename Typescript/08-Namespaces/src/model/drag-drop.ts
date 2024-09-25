namespace App {
	export enum ProjectType {
		active = "active",
		finished = "finished",
	}

	export class Project {
		constructor(
			public id: number,
			public name: string,
			public description: string,
			public peopleJoin: number,
			public state: ProjectType
		) {}
	}
}
