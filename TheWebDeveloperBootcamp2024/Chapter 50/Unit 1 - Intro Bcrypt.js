const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
	const salt = await bcrypt.genSalt(12);
	const pwHashed = await bcrypt.hash(pw, salt);
	console.log(pwHashed);
};

const login = async (pwInput, pwHashed) => {
	const result = await bcrypt.compare(pwInput, pwHashed);
	console.log("FINAL RESULT CHECK PASSWORD IS: ", result);
};

hashPassword("MYPA$$WORD###");
login(
	"MYPA$$WORD###",
	"$2b$12$5wqYZZQuN1RosJy4qdKMKuiuGuJ.ig/lrFq9sWdZ1bWjUaMp71fHy"
);
