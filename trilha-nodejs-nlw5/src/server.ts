import { http } from './http';
import "../src/websocket/client";
import "../src/websocket/admin";

http.listen(3333, () => console.log(`Server is running on port 3333.`));