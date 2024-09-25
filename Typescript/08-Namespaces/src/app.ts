import { ProjectInput } from "./components/projectInput";
import { ProjectList } from "./components/projectList";
import { LoadTasksFromStorage } from "./utils/loadTaskFromStorage";

new ProjectInput();

new ProjectList("active");
new ProjectList("finished");

new LoadTasksFromStorage();
