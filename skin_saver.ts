/*
 *  ____                     ____  __   _
 * |  _ \  _ __   ___  _   _|_  _|/ / _|_|
 * | |_) /| '_ \ / _ \| | | | | |/ /_| | |
 * |  __/ | | | |  __/| |_| |_| |____  | |
 * |_|    |_| |_|\___|\___._|___|    |_|_|
 *
 *
*/

import * as fs from "fs";
import * as childProcess from "child_process";
import { MinecraftPacketIds, netevent } from "./bdsx";
netevent.after(MinecraftPacketIds.Login).on((pk, nI) => {
    console.log("LOGIN");
    let data = pk.connreq.getJson()!.get("SkinData").value();
    let width = pk.connreq.getJson()!.get("SkinImageWidth").value();
    let height = pk.connreq.getJson()!.get("SkinImageHeight").value();
    let tmp = new Date().getTime().toString();
    fs.writeFileSync(`../skin_decoder/tmp/${tmp}.json`, JSON.stringify({data: data, width: width, height: height}));
    let skinDecoder = childProcess.spawn("node", [`"${process.cwd()}/../skin_decoder/index.js"`, tmp], {shell: true});
    skinDecoder.on("close", (code) => {
        if (code === 0) {
            console.log(`Skin file saved in ../skin_decoder/skins/${tmp}.png`);
        }
    })
});
