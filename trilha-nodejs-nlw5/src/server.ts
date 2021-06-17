import { http } from './http';
import "../src/websocket/client";

http.listen(3333, () => console.log(`Server is running on port 3333.`));