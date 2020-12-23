const { ModalFormRequest } = require("bdsx/packetId");

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