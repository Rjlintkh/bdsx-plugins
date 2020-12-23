var { netevent, createPacket, sendPacket, PacketId } = require("bdsx");

const formHandlers = {};

function sendForm(networkIdentifier, form, handler = () => {}) {
    let formId = parseInt(new Date().getTime() / 1000);
    let packet = createPacket(PacketId.ModalFormRequest);
    packet.setUint32(formId, 0x28);
    packet.setCxxString(JSON.stringify(form), 0x30);
    sendPacket(networkIdentifier, packet);
    packet.dispose();
    formHandlers[formId] = handler;
    return formId;
}

netevent.raw(PacketId.ModalFormResponse).on((ptr, size, networkIdentifier) => {
    let data = {};
    ptr.move(1);
    data.formId = ptr.readVarUint();
    data.formData = ptr.readVarString();
    formHandlers[data.formId](data, networkIdentifier);
    delete formHandler[formId];
});