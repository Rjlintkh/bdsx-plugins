import { Actor, DimensionId, NativeModule, NetworkIdentifier, RawTypeId, serverControl } from "bdsx";
import { asm, Register, X64Assembler } from "bdsx/assembler";
import { Vec3 } from "bdsx/bds/blockpos";
import { Level } from "bdsx/bds/level";
import { NetworkHandler, ServerNetworkHandler } from "bdsx/bds/networkidentifier";
import { RaknetNetworkPeer } from "bdsx/bds/peer";
import { ServerInstance } from "bdsx/bds/server";
import { AllocatedPointer, makefunc, NativePointer, pdb, VoidPointer } from "bdsx/core";
import { disasm } from "bdsx/disassembler";
import { exehacker } from "bdsx/exehacker";
import { StaticPointer } from "bdsx/native";
import { NativeType } from "bdsx/nativetype";
import { CxxStringStructure, Pointer } from "bdsx/pointer";
import { MemoryUnlocker } from "bdsx/unlocker";
import { existsSync, readFileSync, writeFileSync } from "fs";

let base = NativeModule.get(null).add(0);

export class RVA extends NativePointer {
    constructor(rva: number) {
        super();
        let ptr = NativeModule.get(null).add(rva);
        this.setAddress(ptr.getAddressLow(), ptr.getAddressHigh());
    }
}

// Wrapped from exehacker.hooking
export function hook(target: StaticPointer, handler: VoidPointer, dummy_for_backward_compatible?: any, dummy2?: any): void {
    const code = disasm.process(target, 12);
    const unlock = new MemoryUnlocker(target, code.size);
    X64Assembler.hook(target, handler, code.size);
    unlock.done();
}

/* example
hook(new RVA(proc["?onPlayerJoined@ServerScoreboard@@UEAAXAEBVPlayer@@@Z"]),
    makefunc.np((serverScoreboard: VoidPointer) => {
        console.log(serverScoreboard);
        console.log("a player joined, i think");
    },
RawTypeId.Void, null, VoidPointer));
*/

if (!existsSync("./pdb_symbols.json")) {
    console.log("PDB Symbols not found, exporting...");
    let symbols = {};
    pdb.open();
    pdb.search((name, address) => {
        (symbols as any)[name] = address.getAddressLow() - base.getAddressLow();
        return true;
    });
    pdb.close();
    writeFileSync("./pdb_symbols.json", JSON.stringify(symbols));
    process.exit();
}
export const proc = JSON.parse(readFileSync("./pdb_symbols.json", {encoding: "utf8"}));

export const func = {
    /** public: virtual void __cdecl Actor::despawn(void) __ptr64 */
    "Actor::despawn": makefunc.js(new RVA(proc["?despawn@Actor@@UEAAXXZ"]), RawTypeId.Void, null, Actor),
    /** public: bool __cdecl Actor::hasTag(class std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> > const & __ptr64)const __ptr64 */
    "Actor::hasTag": makefunc.js(new RVA(proc["?hasTag@Actor@@QEBA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"]), RawTypeId.Boolean, null, Actor, CxxStringStructure),
    /** public: virtual void __cdecl Actor::heal(int) __ptr64 */
    "Actor::heal": makefunc.js(new RVA(proc["?heal@Actor@@UEAAXH@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Int32),
    /** public: virtual bool __cdecl Actor::isInLava(void)const __ptr64 */
    "Actor::isInLava": makefunc.js(new RVA(proc["?isInLava@Actor@@UEBA_NXZ"]), RawTypeId.Boolean, null, Actor),
    /** public: virtual void __cdecl Actor::kill(void) __ptr64  */
    "Actor::kill": makefunc.js(new RVA(proc["?kill@Actor@@UEAAXXZill"]), RawTypeId.Void, null, Actor),
    /** public: void __cdecl Actor::setInvisible(bool) __ptr64 */
    "Actor::setInvisible": makefunc.js(new RVA(proc["?setInvisible@Actor@@QEAAX_N@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    /** public: virtual void __cdecl Actor::setNameTagVisible(bool) __ptr64 */
    "Actor::setNameTagVisible": makefunc.js(new RVA(proc["?setNameTagVisible@Actor@@UEAAX_N@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Boolean),
    /** public: virtual void __cdecl Actor::setPos(class Vec3 const & __ptr64) __ptr64 */
    "Actor::setPos": makefunc.js(new RVA(proc["?setPos@Actor@@UEAAXAEBVVec3@@@Z"]), RawTypeId.Void, null, Actor, Vec3),
    /** public: virtual void __cdecl Actor::setSize(float,float) __ptr64 */
    "Actor::setSize": makefunc.js(new RVA(proc["?setSize@Actor@@UEAAXMM@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Float, RawTypeId.Float),
    /** public: void __cdecl Actor::updateInvisibilityStatus(void) __ptr64 */
    "Actor::updateInvisibilityStatus": makefunc.js(new RVA(proc["?updateInvisibilityStatus@Actor@@QEAAXXZ"]), RawTypeId.Void, null, Actor),
    /** public: void __cdecl Actor::removeEffectParticles(void) __ptr64 */
    "Actor::removeEffectParticles": makefunc.js(new RVA(proc["?removeEffectParticles@Actor@@QEAAXXZ"]), RawTypeId.Void, null, Actor),
    /** public: class NetworkPeer * __ptr64 __cdecl NetworkHandler::getPeerForUser(class NetworkIdentifier const & __ptr64) __ptr64 */
    "NetworkHandler::getPeerForUser": makefunc.js(new RVA(proc["?getPeerForUser@NetworkHandler@@QEAAPEAVNetworkPeer@@AEBVNetworkIdentifier@@@Z"]), RaknetNetworkPeer, {this: RaknetNetworkPeer}, NetworkHandler, NetworkIdentifier),
    /** public: virtual void __cdecl Player::setName(class std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> > const & __ptr64) __ptr64 */
    "Player::setName": makefunc.js(new RVA(proc["?setName@Player@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"]), RawTypeId.Void, null, Actor, CxxStringStructure),
    /** public: virtual void __cdecl Player::setFieldOfViewModifier(float) __ptr64 */
    "Player::setFieldOfViewModifier": makefunc.js(new RVA(proc["?setFieldOfViewModifier@Player@@UEAAXM@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Float),
    /** public: void __cdecl ServerInstance::disconnectAllClientsWithMessage(class std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> >) __ptr64 */
    "ServerInstance::disconnectAllClientsWithMessage": makefunc.js(new RVA(proc["?disconnectAllClientsWithMessage@ServerInstance@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"]), RawTypeId.Void, null, ServerInstance, CxxStringStructure), // working
    /** public: virtual void __cdecl ServerLevel::setCommandsEnabled(bool) __ptr64 */
    "ServerLevel::setCommandsEnabled": makefunc.js(new RVA(proc["?setCommandsEnabled@ServerLevel@@UEAAX_N@Z"]), RawTypeId.Void, null, Level, RawTypeId.Boolean),
    /** public: virtual void __cdecl ServerLevel::setDifficulty(enum Difficulty) __ptr64 */
    "ServerLevel::setDifficulty": makefunc.js(new RVA(proc["?setDifficulty@ServerLevel@@UEAAXW4Difficulty@@@Z"]), RawTypeId.Void, null, Level, RawTypeId.Int32),
    /** private: void __cdecl ServerNetworkHandler::_displayGameMessage(class Player const & __ptr64,class std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> > const & __ptr64) __ptr64 */
    "ServerNetworkHandler::_displayGameMessage": makefunc.js(new RVA(proc["?_displayGameMessage@ServerNetworkHandler@@AEAAXAEBVPlayer@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"]), RawTypeId.Void, null, ServerNetworkHandler, Actor, CxxStringStructure),
    /** public: void __cdecl ServerNetworkHandler::allowIncomingConnections(class std::basic_string<char,struct std::char_traits<char>,class std::allocator<char> > const & __ptr64,bool) __ptr64 */
    "ServerNetworkHandler::allowIncomingConnections": makefunc.js(new RVA(proc["?allowIncomingConnections@ServerNetworkHandler@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z"]), RawTypeId.Void, null, ServerNetworkHandler, CxxStringStructure, RawTypeId.Boolean),
    /** public: void __cdecl ServerNetworkHandler::updateServerAnnouncement(void) __ptr64 */
    "ServerNetworkHandler::updateServerAnnouncement": makefunc.js(new RVA(proc["?updateServerAnnouncement@ServerNetworkHandler@@QEAAXXZ"]), RawTypeId.Void, null, ServerNetworkHandler),
    /** public: virtual void __cdecl ServerPlayer::changeDimension(class AutomaticID<class Dimension,int>,bool) __ptr64 */
    "ServerPlayer::changeDimension": makefunc.js(new RVA(proc["?changeDimension@ServerPlayer@@UEAAXV?$AutomaticID@VDimension@@H@@_N@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean),
    /** public: virtual void __cdecl ServerPlayer::changeDimensionWithCredits(class AutomaticID<class Dimension,int>) __ptr64 */
    "ServerPlayer::changeDimensionWithCredits": makefunc.js(new RVA(proc["?changeDimensionWithCredits@ServerPlayer@@UEAAXV?$AutomaticID@VDimension@@H@@@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Int32, RawTypeId.Boolean),
    /** public: virtual enum InputMode __cdecl ServerPlayer::getInputMode(void)const __ptr64 */
    "ServerPlayer::getInputMode": makefunc.js(new RVA(proc["?getInputMode@ServerPlayer@@UEBA?AW4InputMode@@XZ"]), RawTypeId.Int32, null, Actor),
    /** public: virtual enum ClientPlayMode __cdecl ServerPlayer::getPlayMode(void)const __ptr64 */
    "ServerPlayer::getPlayMode": makefunc.js(new RVA(proc["?getPlayMode@ServerPlayer@@UEBA?AW4ClientPlayMode@@XZ"]), RawTypeId.Int32, null, Actor),
    /** public: virtual void __cdecl ServerPlayer::knockback(class Actor * __ptr64,int,float,float,float,float,float) __ptr64 */
    "ServerPlayer::knockback": makefunc.js(new RVA(proc["?knockback@ServerPlayer@@UEAAXPEAVActor@@HMMMMM@Z"]), RawTypeId.Void, null, Actor, Actor, RawTypeId.Int32, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float, RawTypeId.Float),
    /** public: virtual void __cdecl ServerPlayer::openInventory(void) __ptr64 */
    "ServerPlayer::openInventory": makefunc.js(new RVA(proc["?openInventory@ServerPlayer@@UEAAXXZ"]), RawTypeId.Void, null, Actor),
    /** public: virtual void __cdecl ServerPlayer::setPermissions(enum CommandPermissionLevel) __ptr64 */
    "ServerPlayer::setPermissions": makefunc.js(new RVA(proc["?setPermissions@ServerPlayer@@UEAAXW4CommandPermissionLevel@@@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Int32),
    /** public: virtual void __cdecl ServerPlayer::setPlayerGameType(enum GameType) __ptr64 */
    "ServerPlayer::setPlayerGameType": makefunc.js(new RVA(proc["?setPlayerGameType@ServerPlayer@@UEAAXW4GameType@@@Z"]), RawTypeId.Void, null, Actor, RawTypeId.Int32),
}

export const pdbFunc = {
    /**
    * @deprecated Fires unexpected packet to the client
    */
    "Actor::despawn": (instance: Actor): void => { // working
        func["Actor::despawn"](instance);
    },
    "Actor::heal": (instance: Actor, amount: number): void => { // not tested
        func["Actor::heal"](instance, amount);
    },
    /**
    * @deprecated Kills the server as well
    */
    "Actor::kill": (instance: Actor): void => { // working
        func["Actor::kill"](instance);
    },
    "Actor::setInvisible": (instance: Actor, value: boolean): void => { // working
        func["Actor::setInvisible"](instance, value);
    },
    "Actor::setSize": (instance: Actor, xSize: number, ySize: number): void => { // not tested
        func["Actor::setSize"](instance, xSize, ySize);
    },
    "Actor::updateInvisibilityStatus": (instance: Actor): void => { // working
        func["Actor::updateInvisibilityStatus"](instance);
    },
    "Actor::removeEffectParticles": (instance: Actor): void => { // not tested
        func["Actor::removeEffectParticles"](instance);
    },
    /**
    * @deprecated Not working (not sure)
    */
    "Player::setFieldOfViewModifier": (instance: Actor, modifier: number): void => { // not working
        func["Player::setFieldOfViewModifier"](instance, modifier);
    },
    "Player::setName": (instance: Actor, name: string): void => { // working
        let b = new CxxStringStructure(true);
        b[NativeType.ctor]();
        b.value = name;
        func["Player::setName"](instance, b);
        b[NativeType.dtor]();
    },
    "ServerNetworkHandler::updateServerAnnouncement": (instance: ServerInstance): void => { // working
        func["ServerNetworkHandler::updateServerAnnouncement"](instance);
    },
    "ServerInstance::disconnectAllClientsWithMessage": (instance: ServerInstance, message: string): void => { // working
        let b = new CxxStringStructure(true);
        b[NativeType.ctor]();
        b.value = message;
        func["ServerInstance::disconnectAllClientsWithMessage"](instance, b);
        b[NativeType.dtor]();
    },
    "ServerLevel::setDifficulty": (instance: Level, difficulty: Difficulty): void => { // not tested
        func["ServerLevel::setDifficulty"](instance, difficulty);
    },
    "ServerNetworkHandler::allowIncomingConnections": (instance: ServerNetworkHandler, motd: string, isShown: boolean): void => { // working
        let b = new CxxStringStructure(true);
        b[NativeType.ctor]();
        b.value = motd;
        func["ServerNetworkHandler::allowIncomingConnections"](instance, b, isShown);
        b[NativeType.dtor]();
    },
    "ServerPlayer::changeDimension": (instance: Actor, dimension: DimensionId, respawn: boolean): void => { // working
        func["ServerPlayer::changeDimension"](instance, dimension, respawn);
    },
    "ServerPlayer::getInputMode": (instance: Actor): InputMode => { // working
        return func["ServerPlayer::getPlayMode"](instance);
    },
    "ServerPlayer::getPlayMode": (instance: Actor): PlayMode => { // working
        return func["ServerPlayer::getPlayMode"](instance);
    },
    "ServerPlayer::openInventory": (instance: Actor): void => { // working
        func["ServerPlayer::openInventory"](instance);
    },
    "ServerPlayer::setPermissions": (instance: Actor, permissions: CommandPermissionLevel): void => { // working
        func["ServerPlayer::setPermissions"](instance, permissions);
    },
    "ServerPlayer::setPlayerGameType": (instance: Actor, gameType: GameType): void => { // working
        func["ServerPlayer::setPlayerGameType"](instance, gameType);
    }
}

export enum CommandPermissionLevel {
    Visitor = 0,
    Member = 1,
    Operator = 2,
    Custom = 3,
    Server = 4,
}

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
    SurvivalViewer = 3,
    CreativeViewer = 4,
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

export enum ActorDamageSource {
	Override = 0x0,
	Contact = 0x1,
	EntityAttack = 0x2,
	Projectile = 0x3,
	Suffocation = 0x4,
	Fall = 0x5,
	Fire = 0x6,
	FireTick = 0x7,
	Lava = 0x8,
	Drowning = 0x9,
	BlockExplosion = 0x0A,
	EntityExplosion = 0x0B,
	Void = 0x0C,
	Suicide = 0x0D,
	Magic = 0x0E,
	Wither = 0x0F,
	Starve = 0x10,
	Anvil = 0x11,
	Thorns = 0x12,
	FallingBlock = 0x13,
	Piston = 0x14,
	FlyIntoWall = 0x15,
	Magma = 0x16,
	Fireworks = 0x17,
	Lightning = 0x18,
	Charging = 0x19,
	Temperature = 0x1A,
	All = 0x1F,
	None = -0x01,
};

export enum PlayerMovementType {
    Legacy = 0,
    ServerAuthoritativeV1 = 1,
    ServerAuthoritativeV2Rewind = 2,
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
