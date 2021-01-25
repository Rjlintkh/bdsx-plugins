import { serverInstance } from "bdsx/";
import { wrappedFunc } from "./idkwhattocallthisanysuggestion";

export function setMotd(motd: string) {
    pdbFunc["ServerNetworkHandler::allowIncomingConnections"](serverInstance.minecraft.something.shandler, motd, true);
}

/* example
setInterval(() => {
    setMotd(new Date().toLocaleTimeString())
}, 5000);
*/
