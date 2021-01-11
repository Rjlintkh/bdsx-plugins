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

class SimpleForm {
    constructor(title = "", content = "") {
        this.type = "form";
        this.title = title;
        this.content = content;
        this.buttons = [];
    }
    addButton(text, imageType = null, imagePath = "") {
        let content = {
            text: text
        };
        if (imageType !== null) {
            content.image = {
                type: imageType === 0 ? "path" : "url",
                data: imagePath
            }
        }
        this.buttons.push(content);
    } 
}

exports.SimpleForm = SimpleForm;

class ModalForm {
    constructor(title = "", content = "") {
        this.type = "modal";
        this.title = title;
        this.content = content;
        this.button1 = "";
        this.button2 = "";
    }
    setLeftButton(text) {
        this.button1 = text;
    }
    setRightButton(text) {
        this.button2 = text;
    }
}

exports.ModalForm = ModalForm;

class CustomForm {
    constructor(title = "") {
        this.type = "custom_form";
        this.title = title;
        this.content = [];
    }
    addLabel(text) {
        let content = {
            type: "label",
            text: text
        };
        this.content.push(content);
    }
    addToggle(text, _default = null) {
        let content = {
            type: "toggle",
            text: text
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addSlider(text, min, max, step = null, _default = null) {
        let content = {
            type: "slider",
            text: text,
            min: min,
            max: max
        }
        if (step !== null) {
            content.step = step;
        }
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addStepSlider(text, steps, defaultIndex = null) {
        let content = {
            type: "step_slider",
            text: text,
            steps: steps
        }
        if (step !== null) {
            content.step = step;
        }
        if (defaultIndex !== null) {
            content.default = defaultIndex;
        }
        this.content.push(content);
    }
    addDropdown(text, options, _default = null) {
        let content = {
            type: "dropdown",
            text: text,
            options: options
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
    addInput(text, placeholder = "", _default = null) {
        let content = {
            type: "input",
            text: text,
            placeholder: placeholder
        };
        if (_default !== null) {
            content.default = _default;
        }
        this.content.push(content);
    }
}

exports.CustomForm = CustomForm;

const formHandlers = {};

function sendForm(networkIdentifier, form, handler = () => {}) {
    let formId = Math.floor(Math.random() * 2147483647) + 1;
    let packet = createPacket(PacketId.ModalFormRequest);
    packet.setUint32(formId, 0x28);
    packet.setCxxString(JSON.stringify(form), 0x30);
    sendPacket(networkIdentifier, packet);
    packet.dispose();
    formHandlers[formId] = handler;
    return formId;
}

exports.sendForm = sendForm;

netevent.raw(PacketId.ModalFormResponse).on((ptr, size, networkIdentifier) => {
    let data = {};
    ptr.move(1);
    data.formId = ptr.readVarUint();
    data.formData = ptr.readVarString();
    if (formHandlers[data.formId]) {
        formHandlers[data.formId](data, networkIdentifier);
        delete formHandlers[data.formId];
    }
});
