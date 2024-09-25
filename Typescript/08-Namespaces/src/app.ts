/// <reference path="model/drag-drop.ts" />
/// <reference path="model/project.ts" />
/// <reference path="state/project.ts" />
/// <reference path="utils/validate.ts" />
/// <reference path="utils/autobind.ts" />
/// <reference path="utils/loadTaskFromStorage.ts" />
/// <reference path="components/base.ts" />
/// <reference path="components/projectList.ts" />
/// <reference path="components/projectInput.ts" />

namespace App {
	new ProjectInput();

	new ProjectList("active");
	new ProjectList("finished");

	new LoadTasksFromStorage();
}
