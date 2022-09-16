import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 80;

if (PORT === 80) {
  process.env.EC2_ON = "activate";
}

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
console.log(process.env.EC2_ON);

app.listen(PORT, handleListening);
