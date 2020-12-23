/*
 *  ____                     ____  __   _
 * |  _ \  _ __   ___  _   _|_  _|/ / _|_|
 * | |_) /| '_ \ / _ \| | | | | |/ /_| | |
 * |  __/ | | | |  __/| |_| |_| |____  | |
 * |_|    |_| |_|\___|\___._|___|    |_|_|
 *
 * Made by PneuJai 
 */

var { netevent, createPacket, sendPacket, PacketId } = require("bdsx");

const serverSettingHandlers = {};

const serverSettingsForm = {
    type: "custom_form",
    title: "menu.serverGenericName",
    icon: {
        type: "path",
        data: "textures/ui/settings_glyph_color_2x"
    },
    content:[
        {"type":"label", "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    ]
};

const serverSettingHandler = (data, networkIdentifier) => {
    console.log(data);
};

netevent.raw(PacketId.ServerSettingsRequest).on((ptr, size, networkIdentifier, packetId) => {
    let formId = Math.floor(Math.random() * 2147483647) + 1;
    let packet = createPacket(PacketId.ServerSettingsResponse);
    packet.setUint32(formId, 0x28);
    packet.setCxxString(JSON.stringify(serverSettingsForm), 0x30);
    sendPacket(networkIdentifier, packet);
    packet.dispose();
    serverSettingHandlers[formId] = serverSettingHandler;
});

netevent.raw(PacketId.ModalFormResponse).on((ptr, size, networkIdentifier, packetId) => { // ModalFormResponsePacket 0x65
    ptr.move(1);
    let data = {};
    data.formId = ptr.readVarUint();
    data.formData = ptr.readVarString();
    if (serverSettingHandlers[data.formId]) {
        serverSettingHandlers[data.formId](data, networkIdentifier);
        delete serverSettingHandlers[data.formId];
    }
});