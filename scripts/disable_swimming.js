/*
 *  ____                     ____  __   _
 * |  _ \  _ __   ___  _   _|_  _|/ / _|_|
 * | |_) /| '_ \ / _ \| | | | | |/ /_| | |
 * |  __/ | | | |  __/| |_| |_| |____  | |
 * |_|    |_| |_|\___|\___._|___|    |_|_|
 *
 * Made by PneuJai 
 */

var { netevent, PacketId, CANCEL } = require("bdsx");

netevent.raw(PacketId.PlayerAction).on((ptr, size, networkIdentifier) => {
    ptr.move(2);
    let action = ptr.readVarInt();
    if (action === 21) {
        console.log("swim");
        return CANCEL;
    }
  });