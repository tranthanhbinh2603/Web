const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Task {
			title: String!
			description: String!
			status: String!
			priority: String!
			dueDate: String!
			createdAt: String!
			updatedAt: String!
		}

        type RootQuery {
			getTask: [Task!]!
		}		

		input TaskInputData {
			title: String!
			description: String!
			status: String!
			priority: String!
			dueDate: String!
		}

		type RootMutation {
			createTask(taskInput: TaskInputData!): Task!
		}

        schema {
            query: RootQuery
			mutation: RootMutation
        }
    `);
