Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);
		if (url.pathname == "/") {
			return new Response("Hello, homepage here!");
		}
		if (url.pathname == "/about") {
			return new Response("Hello, about here!");
		}
		return new Response("404: Not Found", { status: 404 });
	},
	error(error) {
		return new Response(`<pre>${error}\n${error.stack}</pre>`, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	},
});
