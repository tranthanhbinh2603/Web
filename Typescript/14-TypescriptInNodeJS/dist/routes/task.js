"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let listTasks = [];
router.get("/", (_, res) => {
    res.send(listTasks);
});
router.post("/", (req, res) => {
    const { name, duration } = req.body;
    listTasks.push({ id: Date.now(), name, duration });
    res.status(200).send({ result: "Finish add task." });
});
router.patch("/", (req, res) => {
    const { id, name, duration } = req.body;
    const taskToUpdate = listTasks.find((task) => task.id === id);
    if (taskToUpdate) {
        taskToUpdate.name = name;
        taskToUpdate.duration = duration;
        res.status(200).send({ result: "Finish edit task." });
    }
    else {
        res.status(420).send({ result: "Id not found." });
    }
});
router.delete("/", (req, res) => {
    const { id } = req.body;
    listTasks = listTasks.filter((task) => task.id !== id);
    res.status(200).send({ result: "Finish delete task." });
});
exports.default = router;
//# sourceMappingURL=task.js.map