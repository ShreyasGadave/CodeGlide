import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/connection.config.js";

connectDB();

const Port = config.PORT || 8000;

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});