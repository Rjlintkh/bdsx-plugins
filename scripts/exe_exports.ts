import { makefunc, NativePointer } from "bdsx/core";
import { RawTypeId } from "bdsx/common";
import { Actor, DimensionId, NativeModule } from "bdsx";
import { ServerInstance } from "bdsx/bds/server";
import { Level, ServerLevel } from "bdsx/bds/level";
import { NetworkHandler, NetworkIdentifier, ServerNetworkHandler } from "bdsx/bds/networkidentifier";
import { CxxStringStructure } from "bdsx/pointer";
import { Vec3 } from "bdsx/bds/blockpos";
import { NativeType } from "bdsx/nativetype";
import { RaknetNetworkPeer } from "bdsx/bds/peer";
import { proc } from "bdsx/bds/proc";

export enum Difficulty {
    Peaceful = 0,
    Easy = 1,
    Normal = 2,
    Hard = 3,
}

export enum ContainerId {
    None = -1,
    Inventory = 0,
    First = 1,
    Last = 100,
    Offhand = 119,
    Armor = 120,
    Hotbar = 122,
    FixedInventory = 123,
    UI = 124
}

export enum DeviceOS {
    Unknown = -1,
    Android = 1,
    IOS = 2,
    OSX = 3,
    Amazon = 4,
    GearVR = 5,
    Hololens = 6,
    Windows10 = 7,
    Win32 = 8,
    Dedicated = 9,
    TVOS = 10,
    Playstation = 11,
    Nintendo = 12,
    Xbox = 13,
    WindowsPhone = 14,
}

export enum EducationEditionOffer {
    None = 0,
    EverywhereExceptChina = 1,
    China = 2,
}

export enum GameRuleType {
    Bool = 1,
    Int = 2,
    Float = 3
}

export enum GameType {
    Survival = 0,
    Creative = 1,
    Adventure = 2,
    Spectator = 3,
    SurvivalViewer = 3,
    CreativeSViewer = 4,
    Default = 5
}

export enum GeneratorType {
    FiniteOverworld = 0,
    Overworld = 1,
    Flat = 2,
    Nether = 3,
    TheEnd = 4
}

export enum InputMode {
    Unknown = 0,
    MouseKeyboard = 1,
    Touchscreen = 2,
    GamePad = 3,
    MotionController = 4,
}

export enum PlayMode {
    Normal = 0,
    Teaser = 1,
    Screen = 2,
    Viewer = 3,
    VR = 4,
    Placement = 5,
    LivingRoom = 6,
    ExitLevel = 7,
    ExitLivingRoom = 8,
}

export enum PlayerMovementType {
    Legacy = 0,
    ServerAuthoritativeV1 = 1,
    ServerAuthoritativeV2Rewind = 2,
}

export enum PlayerPermissions {
    Visitor = 0,
    Member = 1,
    Operator = 2,
    Custom = 3,
    Server = 4,
}

export enum ResourcePackType {
    Invalid = 0,
    Addon = 1,
    Cached = 2,
    CopyProtected = 3,
    Behaviors = 4,
    PersonaPiece = 5,
    Resources = 6,
    Skins = 7,
    WorldTemplate = 8,
}

export enum UIProfile {
    Classic = 0,
    Pocket = 1,
}

export enum WindowTypes {
    None = -9,
    Inventory = -1,
    Container = 0,
    Workbench = 1,
    Furnace = 2,
    Enchantment = 3,
    BrewingStand = 4,
    Anvil = 5,
    Dispenser = 6,
    Dropper = 7,
    Hopper = 8,
    Cauldron = 9,
    MinecartChest = 10,
    MinecartHopper = 11,
    Horse = 12,
    Beacon = 13,
    StructureEditor = 14,
    Trading = 15,
    CommandBlock = 16,
    Jukebox = 17,
    Armor = 18,
    Hand = 19,
    CompoundCreator = 20,
    ElementConstructor = 21,
    MaterialReducer = 22,
    LabTable = 23,
    Loom = 24,
    Lectern = 25,
    Grindstone = 26,
    BlastFurnace = 27,
    Smoker = 28,
    Stonecutter = 29,
    Cartography = 30,
    Hud = 31,
    JigsawEditor = 32,
    SmithingTable = 33,
}

export class RVA extends NativePointer {
    constructor(rva: number) {
        super();
        let ptr = NativeModule.get(null).add(rva);;
        this.setAddress(ptr.getAddressLow(), ptr.getAddressHigh());
    }
}

// Update this after bds update
export const procRVA = {
    "Actor::despawn": new RVA(0xD49C10),
    "Actor::hasTag": new RVA(0xD35F30),
    "Actor::heal": new RVA(0xD50A80),
    "Actor::isInLava": new RVA(0xD38120),
    "Actor::kill": new RVA(0xD4F8D0),
    "Actor::setInvisible": new RVA(0xD51990),
    "Actor::setNameTagVisible": new RVA(0xD4A2B0),
    "Actor::setPos": new RVA(0xD3B040),
    "Actor::setSitting": new RVA(0xD37980),
    "Actor::setSize": new RVA(0xD3BC10),
    "Actor::setSneaking": new RVA(0xD45450),
    "Actor::updateInvisibilityStatus": new RVA(0xD51DD0),
    "Actor::removeEffectParticles": new RVA(0xD51B70),
    "Level::setEducationLevelSettings": new RVA(0x2D5E60),
    "Level::getSeed": new RVA(0x2D12B0),
    "NetworkHandler::getPeerForUser": new RVA(0xB193A0),
    "Player::setFieldOfViewModifier": new RVA(0xF5D550),
    "Player::setName": new RVA(0xF5F3B0),
    "Player::stopDestroying": new RVA(0xCC78E0),
    "ServerInstance::disconnectAllClientsWithMessage": new RVA(0xCCBF20),
    "ServerLevel::setCommandsEnabled": new RVA(0xCCD2E0),
    "ServerLevel::setDifficulty": new RVA(0xCCDF20),
    "ServerNetworkHandler::_displayGameMessage": new RVA(0xB7A960),
    "ServerNetworkHandler::updateServerAnnouncement": new RVA(0xB8B9E0),
    "ServerPlayer::changeDimension": new RVA(0xCD3FF0),
    "ServerPlayer::changeDimensionWithCredits": new RVA(0xCD40F0),
    "ServerPlayer::getInputMode": new RVA(0xCD6CE0),
    "ServerPlayer::getPlayMode": new RVA(0xCD6CF0),
    "ServerPlayer::knockback": new RVA(0xCCF210),
    "ServerPlayer::openInventory": new RVA(0xCD2990),
    "ServerPlayer::setPermissions": new RVA(0xCD3260),
    "ServerPlayer::setPlayerGameType": new RVA(0xCD4280),
};

export const procFunc = {
    "Actor::despawn": makefunc.js(procRVA["Actor::despawn"], RawTypeId.Void, null, Actor),
    "Actor::hasTag": makefunc.js(procRVA["Actor::hasTag"], RawTypeId.Boolean, null, Actor, CxxStringStructure),
    "Actor::heal": makefunc.js(procRVA["Actor::heal"], RawTypeId.Void, null, Actor, RawTypeId.Int32),
    "Actor::isInLava": makefunc.js(procRVA["Actor::isInLava"], RawTypeId.Boolean, null, Actor),
    "Actor::kill": makefunc.js(procRVA["Actor::kill"], RawTypeId.Void, null, Actor), // working: but crashes the server after few seconds
    "Actor::setInvisible": makefunc.js(procRVA["Actor::setInvisible"], RawTypeId.Void, null, Actor, RawTypeId.Boolean), // working: needs to be used with Actor::updateInvisibilityStatus
    "Actor::setNameTagVisible": makefunc.js(procRVA["Actor::setNameTagVisible"], RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::setPos": makefunc.js(procRVA["Actor::setPos"], RawTypeId.Void, null, Actor, Vec3),
    "Actor::setSitting": makefunc.js(procRVA["Actor::setSitting"], RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::setSize": makefunc.js(procRVA["Actor::setSize"], RawTypeId.Void, null, Actor, RawTypeId.Float, RawTypeId.Float),
    "Actor::setSneaking": makefunc.js(procRVA["Actor::setSneaking"], RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    "Actor::updateInvisibilityStatus": makefunc.js(procRVA["Actor::updateInvisibilityStatus"], RawTypeId.Void, null, Actor), // working
    "Actor::removeEffectParticles": makefunc.js(procRVA["Actor::removeEffectParticles"], RawTypeId.Void, null, Actor),
    "Level::setEducationLevelSettings": makefunc.js(procRVA["Level::setEducationLevelSettings"], RawTypeId.Void, null, Level, RawTypeId.Boolean),
    "Level::getSeed": makefunc.js(procRVA["Level::getSeed"], RawTypeId.Int32, null, Level),
    "NetworkHandler::getPeerForUser": makefunc.js(procRVA["NetworkHandler::getPeerForUser"], RaknetNetworkPeer, {this: RaknetNetworkPeer}, NetworkHandler, NetworkIdentifier),
    "Player::setName": makefunc.js(procRVA["Player::setName"], RawTypeId.Void, null, Actor, CxxStringStructure),
    "Player::setFieldOfViewModifier": makefunc.js(procRVA["Player::setFieldOfViewModifier"], RawTypeId.Void, null, Actor, RawTypeId.Float),
    "Player::stopDestroying": makefunc.js(procRVA["Player::stopDestroying"], RawTypeId.Void, null, Actor),
    "ServerInstance::disconnectAllClientsWithMessage": makefunc.js(procRVA["ServerInstance::disconnectAllClientsWithMessage"], RawTypeId.Void, null, ServerInstance, CxxStringStructure), // working
    "ServerLevel::setCommandsEnabled": makefunc.js(procRVA["ServerLevel::setCommandsEnabled"], RawTypeId.Void, null, Level, RawTypeId.Boolean),
    "ServerLevel::setDifficulty": makefunc.js(procRVA["ServerLevel::setDifficulty"], RawTypeId.Void, null, Level, RawTypeId.Int32),
    "ServerNetworkHandler::_displayGameMessage": makefunc.js(procRVA["ServerNetworkHandler::_displayGameMessage"], RawTypeId.Void, null, ServerNetworkHandler, Actor, CxxStringStructure),
    "ServerNetworkHandler::updateServerAnnouncement": makefunc.js(procRVA["ServerNetworkHandler::updateServerAnnouncement"], RawTypeId.Void, null, ServerNetworkHandler),
    "ServerPlayer::changeDimension": makefunc.js(procRVA["ServerPlayer::changeDimension"], RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean), // working
    "ServerPlayer::changeDimensionWithCredits": makefunc.js(procRVA["ServerPlayer::changeDimensionWithCredits"], RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean),
    "ServerPlayer::getInputMode": makefunc.js(procRVA["ServerPlayer::getInputMode"], RawTypeId.Int32, null, Actor),
    "ServerPlayer::getPlayMode": makefunc.js(procRVA["ServerPlayer::getPlayMode"], RawTypeId.Int32, null, Actor),
    "ServerPlayer::knockback": makefunc.js(procRVA["ServerPlayer::knockback"], RawTypeId.Void, null, Actor, Actor, RawTypeId.Int32, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float),
    "ServerPlayer::openInventory": makefunc.js(procRVA["ServerPlayer::openInventory"], RawTypeId.Void, null, Actor), // working
    "ServerPlayer::setPermissions": makefunc.js(procRVA["ServerPlayer::setPermissions"], RawTypeId.Void, null, Actor, RawTypeId.Int32), // working
    "ServerPlayer::setPlayerGameType": makefunc.js(procRVA["ServerPlayer::setPlayerGameType"], RawTypeId.Void, null, Actor, RawTypeId.Int32), // working
}

export const wrappedFunc = {
    /**
    * @deprecated Fires unexpected packet to the client
    */
    "Actor::despawn": (instance: Actor): void => { // working
        procFunc["Actor::despawn"](instance);
    },
    "Actor::heal": (instance: Actor, amount: number): void => { // not tested
        procFunc["Actor::heal"](instance, amount);
    },
    /**
    * @deprecated Kills the server as well
    */
    "Actor::kill": (instance: Actor): void => { // working
        procFunc["Actor::kill"](instance);
    },
    "Actor::setInvisible": (instance: Actor, value: boolean): void => { // working
        procFunc["Actor::setInvisible"](instance, value);
    },
    "Actor::setSize": (instance: Actor, xSize: number, ySize: number): void => { // not tested
        procFunc["Actor::setSize"](instance, xSize, ySize);
    },
    "Actor::updateInvisibilityStatus": (instance: Actor): void => { // working
        procFunc["Actor::updateInvisibilityStatus"](instance);
    },
    "Actor::removeEffectParticles": (instance: Actor): void => { // not tested
        procFunc["Actor::removeEffectParticles"](instance);
    },
    "Level::getSeed": (instance: Level): number => { // not tested
        return procFunc["Level::getSeed"](instance);
    },
    /**
    * @deprecated Not working (not sure)
    */
    "Player::setFieldOfViewModifier": (instance: Actor, modifier: number): void => { // not working
        procFunc["Player::setFieldOfViewModifier"](instance, modifier);
    },
    "Player::setName": (instance: Actor, name: string): void => { // working
        let b = new CxxStringStructure(true);
        b[NativeType.ctor]();
        b.value = name;
        procFunc["Player::setName"](instance, b);
        b[NativeType.dtor]();
    },
    /**
    * @deprecated Not working
    */
    "Player::stopDestroying": (instance: Actor): void => { // not working
        procFunc["Player::stopDestroying"](instance);
    },
    "ServerInstance::disconnectAllClientsWithMessage": (instance: ServerInstance, message: string): void => { // working
        let b = new CxxStringStructure(true);
        b[NativeType.ctor]();
        b.value = message;
        procFunc["ServerInstance::disconnectAllClientsWithMessage"](instance, b);
        b[NativeType.dtor]();
    },
    "ServerLevel::setDifficulty": (instance: Level, difficulty: Difficulty): void => { // not tested
        procFunc["ServerLevel::setDifficulty"](instance, difficulty);
    },
    "ServerPlayer::changeDimension": (instance: Actor, dimension: DimensionId, respawn: boolean): void => { // working
        procFunc["ServerPlayer::changeDimension"](instance, dimension, respawn);
    },
    "ServerPlayer::getInputMode": (instance: Actor): InputMode => { // working
        return procFunc["ServerPlayer::getPlayMode"](instance);
    },
    "ServerPlayer::getPlayMode": (instance: Actor): PlayMode => { // working
        return procFunc["ServerPlayer::getPlayMode"](instance);
    },
    "ServerPlayer::openInventory": (instance: Actor): void => { // working
        procFunc["ServerPlayer::openInventory"](instance);
    },
    "ServerPlayer::setPermissions": (instance: Actor, permissions: PlayerPermissions): void => { // working
        procFunc["ServerPlayer::setPermissions"](instance, permissions);
    },
    "ServerPlayer::setPlayerGameType": (instance: Actor, gameType: GameType): void => { // working
        procFunc["ServerPlayer::setPlayerGameType"](instance, gameType);
    }
}
