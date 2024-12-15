const { id } = req.params;
let result = await User(id);
