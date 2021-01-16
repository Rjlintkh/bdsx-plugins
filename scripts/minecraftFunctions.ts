import { makefunc } from "bdsx/core";
import { RawTypeId } from "bdsx/common";
import { Actor, NativeModule } from "bdsx";
import { ServerInstance } from "bdsx/bds/server";
import { ServerLevel } from "bdsx/bds/level";

export function RVA(rva: number) {
    return NativeModule.get(null).add(rva);
}

export const minecraftFunctions = {
    "Actor::despawn": makefunc.js(RVA(0xD49C10), RawTypeId.Void, null, Actor),
    "Actor::hasTag": makefunc.js(RVA(0xD35F30), RawTypeId.Boolean, null, Actor, RawTypeId.StringUtf8),
    "Actor::heal": makefunc.js(RVA(0xD50A80), RawTypeId.Void, null, Actor, RawTypeId.Int32),
    "Actor::isInLava": makefunc.js(RVA(0xD38120), RawTypeId.Boolean, null, Actor),
    "Actor::kill": makefunc.js(RVA(0xD4A540), RawTypeId.Void, null, Actor),
    "Actor::setInvisible": makefunc.js(RVA(0xD51990), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::setNameTag": makefunc.js(RVA(0xD4A540), RawTypeId.Void, null, Actor, RawTypeId.StringUtf8),
    "Actor::setNameTagVisible": makefunc.js(RVA(0xD4A2B0), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::setPos": makefunc.js(RVA(0xD3B040), RawTypeId.Void, null, Actor, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float),
    "Actor::setSitting": makefunc.js(RVA(0xD37980), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::setSize": makefunc.js(RVA(0xD3BC10), RawTypeId.Void, null, Actor, RawTypeId.Float, RawTypeId.Float),
    "Actor::setSneaking": makefunc.js(RVA(0xD45450), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::updateInvisibilityStatus": makefunc.js(RVA(0xD51DD0), RawTypeId.Void, null, Actor),
    "Actor::removeEffectParticles": makefunc.js(RVA(0xD51B70), RawTypeId.Void, null, Actor),
    "ServerInstance::disconnectAllClientsWithMessage": makefunc.js(RVA(0xCCBF20), RawTypeId.Void, null, ServerInstance, RawTypeId.StringUtf8),
    "ServerLevel::setCommandsEnabled": makefunc.js(RVA(0xCCD2E0), RawTypeId.Void, null, ServerLevel, RawTypeId.Boolean),
    "ServerLevel::setDifficulty": makefunc.js(RVA(0xCCDF20), RawTypeId.Void, null, ServerLevel, RawTypeId.Boolean),
    "ServerPlayer::changeDimension": makefunc.js(RVA(0xCD3FF0), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean), // working
    "ServerPlayer::changeDimensionWithCredits": makefunc.js(RVA(0xCD40F0), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean),
    "ServerPlayer::getInputMode": makefunc.js(RVA(0xCD6CE0), RawTypeId.Int32, null, Actor),
    "ServerPlayer::getPlayMode": makefunc.js(RVA(0xCD6CF0), RawTypeId.Int32, null, Actor),
    "ServerPlayer::knockback": makefunc.js(RVA(0xCCF210), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float),
    "ServerPlayer::openInventory": makefunc.js(RVA(0xCD2990), RawTypeId.Void, null, Actor), // working
    "ServerPlayer::setPermissions": makefunc.js(RVA(0xCD3260), RawTypeId.Void, null, Actor, RawTypeId.Int32), // working
    "ServerPlayer::setPlayerGameType": makefunc.js(RVA(0xCD4280), RawTypeId.Void, null, Actor, RawTypeId.Int32), // working
}
