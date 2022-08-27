import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
//on 은 여러번 발생시킬 수 있는 이벤트 once는 딱 한번만 발생만
const handleOpen = () => console.log("✅ Connected to DB ");
db.on("error", (error) => console.log("DB Error", error));
db.once("open", handleOpen);
