var { native, NativeModule } = require("bdsx");

const kernel32 = new NativeModule("Kernel32.dll");

const base = kernel32.get("GetModuleHandleW")("bedrock_server.exe");

function getPointerRelativeOffset(ptr) {
    return ptr.subptr(base);
}

function changeDimension(actor, dimensionId, respawn) {
    let ptr = base.clone();
    ptr.move(0xCD3FF0);
    return NativeModule.pointerToFunction(ptr)(actor, dimensionId, respawn);
}

exports.basePointer = base;
exports.getPointerRelativeOffset = getPointerRelativeOffset;
exports.changeDimension = changeDimension;