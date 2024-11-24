const server = Bun.serve({
	fetch(req) {
		return new Response("Bun, haha!");
	},
});

console.log(server.port); // 3000
console.log(server.url); // http://localhost:3000
