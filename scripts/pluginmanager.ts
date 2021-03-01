import * as fs from "fs";
import * as childProcess from "child_process";
import * as colors from "colors";
import { stderr } from "process";
import { serverControl } from "./bdsx";

let reloadNeeded = false;

if (!fs.existsSync("./plugins")) {
    fs.mkdirSync("./plugins");
    console.log("[BDSX] Initializing plugin manager...");
}

if (!fs.existsSync("./plugins/plugins.json")) {
    fs.writeFileSync("./plugins/plugins.json", `{}`);
    fs.writeFileSync("./plugins/loader.ts", "");
    reloadNeeded = true;
}
console.log("[BDSX] Checking for plugins...");

let plugins = JSON.parse(fs.readFileSync("./plugins/plugins.json", "utf8"));

for (let f of fs.readdirSync("./plugins")) {
    let stats = fs.statSync(`./plugins/${f}`);
    if (!stats.isDirectory()) continue;
    if (fs.existsSync(`./plugins/${f}/manifest.json`)) {
        try {
            let { header: plugin } = JSON.parse(fs.readFileSync(`./plugins/${f}/manifest.json`, "utf8"));
            if (!plugins[plugin.uuid] || plugins[plugin.uuid].date !== stats.mtime.getTime()) {
                console.log(`[BDSX] Plugin ${plugin.name} v${plugin.version.join(".")} has been ${(plugins[plugin.uuid] ? "updated" : "added")}.`);
                plugins[plugin.uuid] = {
                    name: plugin.name,
                    version: plugin.version,
                    date: stats.mtime.getTime(),
                    main: f,
                };
                reloadNeeded = true;
            }
        } catch {}
    }
}

for (let k in plugins) {
    if (!fs.existsSync(`./plugins/${plugins[k].main}`)) {
        console.log(`[BDSX] Plugin ${plugins[k].name} v${plugins[k].version.join(".")} has been deleted.`);
        delete plugins[k];
        reloadNeeded = true;
    }
}

if (reloadNeeded) {
    fs.writeFileSync("./plugins/plugins.json", JSON.stringify(plugins));
    let loader = "";
    for (let k in plugins) {
        let plugin = plugins[k];
        let id = new Date().getTime();
        loader += `console.log("[BDSX] Enabling ${plugin.name} v${plugin.version.join(".")}");`;
        loader += `require("./${plugin.main}");`;
    }
    fs.writeFileSync("./plugins/loader.ts", loader);
    let builder = childProcess.spawn("cmd.exe", ["/c", `cd "${process.cwd()}/../" & npm run-script build`], { detached: false });
    console.log(colors.red("[BDSX] Plugins bundled, please restart."));
} else {
    require("./bedrock_server/plugins/loader");
}
