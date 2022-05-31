const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
	res.send("hello");
});

let lastColor = "#282c34";

io.on("connection", (socket) => {
	console.log("bir kullanıcı bağlandı!");

	socket.emit("receive", lastColor);

	socket.on("newColor", (color) => {
		console.log(color);

		lastColor = color;
		io.emit("receive", color);
		//io.emit ise tamamina gonder demektir
		//socket.broadcast=>bagli olan kullanici haric diger hepsinde degisiklik yapsin demektir
	});

	socket.on("disconnect", () => {
		console.log("Bir kullanıcı ayrıldı.");
	});
});

http.listen(3001, () => console.log("Server is up 🚀 🚀"));

//app.js ve package.json dosyalari hazir aldiktan sonra npm install ile paketleri kurup sonra da backedn i terminal de acitp npm start dememiz socket-io backend imizin calismasi icin yeterli olacaktir...