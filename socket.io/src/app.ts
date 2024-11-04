import { serverHttp } from "./http";
import './websocket'

const PORT = process.env.PORT || 3333;

serverHttp.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}!`);
})