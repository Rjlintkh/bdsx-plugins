import { makefunc } from "bdsx/core";
import { RawTypeId } from "bdsx/common";
import { Actor, NativeModule } from "bdsx";

export function RVA(rva: number) {
    return NativeModule.get(null).add(rva);
}

export const minecraftFunctions = {
    "ServerPlayer::changeDimension": makefunc.js(RVA(0xCD3FF0), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean), // working
    "ServerPlayer::changeDimensionWithCredits": makefunc.js(RVA(0xCD40F0), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean),
    "ServerPlayer::knockback": makefunc.js(RVA(0xCCF210), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float),
    "ServerPlayer::setPlayerGameType": makefunc.js(RVA(0xCD4280), RawTypeId.Void, null, Actor, RawTypeId.Int32),
    "ServerPlayer::openInventory": makefunc.js(RVA(0xCD2990), RawTypeId.Void, null, Actor), // working
}