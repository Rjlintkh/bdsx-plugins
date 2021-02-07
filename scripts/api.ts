import { NetworkHandler, NetworkIdentifier, ServerNetworkHandler } from "bdsx/bds/networkidentifier";
import { BossEventPacket, TransferPacket } from "bdsx/bds/packets";
import { SYMOPT_UNDNAME } from "bdsx/common";
import { pdb } from "bdsx/core";
import { Actor, DimensionId } from "bdsx";
import { float64_t, int32_t, NativeType } from "bdsx/nativetype";
import { CxxStringWrapper } from "bdsx/pointer";
import { ProcHacker } from "bdsx/prochacker";
import { RawTypeId, serverInstance, VoidPointer } from "./bdsx";
import { Vec3 } from "bdsx/bds/blockpos";
import { RakNetInstance } from "bdsx/bds/raknetinstance";
import { RaknetNetworkPeer } from "bdsx/bds/peer";
import { NativeClass } from "bdsx/nativeclass";
import { RakNet } from "bdsx/bds/raknet";
import { Player, ServerPlayer } from "bdsx/bds/player";
import { ServerInstance } from "bdsx/bds/server";
import { mce } from "bdsx/mce";
import { Level } from "bdsx/bds/level";
import { remapAndPrintError } from "bdsx/source-map-support";

pdb.setOptions(SYMOPT_UNDNAME);
const procHacker = ProcHacker.load("../pdbcache.ini", [
    "Actor::getNameTag",
    "Level::addPlayer",
    "NetworkHandler::getPeerForUser",
    "Player::attack",
    "RakNet::RakPeer::GetLastPing",
    "RakNetInstance::getPort",
    "RakNetInstance::RakNetNetworkPeer::getNetworkStatus",
    "ServerScoreboard::onPlayerJoined",
    "ServerInstance::disconnectAllClientsWithMessage",
    "ServerNetworkHandler::_onPlayerLeft",
    "ServerNetworkHandler::allowIncomingConnections",
    "ServerNetworkHandler::disconnectClient",
    "TeleportCommand::teleport",
]);
pdb.setOptions(0);
pdb.close();

export enum Events {
    PlayerAttack = "PlayerAttack",
    PlayerJoin = "PlayerJoin",
    PlayerLeave = "PlayerLeave",
}
const eventListeners: {[key: string]: CallableFunction[]} = {};

export function addEventListener(event: Events, handler: CallableFunction) {
    if (!eventListeners[event]) {
        eventListeners[event] = [];
    }
    eventListeners[event].push(handler);
}

function onPlayerAttack(player: Player, target: Actor): boolean {
    try {
        for (let handler of eventListeners[Events.PlayerAttack]) {
            if (handler(player, target) === false) return false;
        }
    } catch (err) {
        remapAndPrintError(err);
    }
    return _onPlayerAttack(player, target);
}
let _onPlayerAttack = procHacker.hooking("Player::attack", RawTypeId.Boolean, null, Player, Actor)(onPlayerAttack);

/*
function onPlayerJoin(serverScoreboard: VoidPointer, player: Player): boolean {
    try {
        for (let handler of eventListeners[Events.PlayerJoin]) {
            if (handler(player) === false) return false;
        }
    } catch (err) {
        remapAndPrintError(err);
    }
    return _onPlayerJoin(serverScoreboard, player);
}
let _onPlayerJoin = procHacker.hooking("ServerScoreboard::onPlayerJoined", RawTypeId.Boolean, null, VoidPointer, Player)(onPlayerJoin);
*/

function onPlayerLeave(serverNetworkHandler: ServerNetworkHandler, player: ServerPlayer): boolean {
    try {
        for (let handler of eventListeners[Events.PlayerLeave]) {
            if (handler(player) === false) return false;
        }
    } catch (err) {
        remapAndPrintError(err);
    }
    return _onPlayerLeave(serverNetworkHandler, player);
}
let _onPlayerLeave = procHacker.hooking("ServerNetworkHandler::_onPlayerLeft", RawTypeId.Boolean, null, ServerNetworkHandler, ServerPlayer)(onPlayerLeave);

export function setBossBar(player: Actor, title: string, healthPercent: number): void {
    let pk = BossEventPacket.create();
    pk.setBin(player.getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(0, 0x40);
    pk.setCxxString(title, 0x48);
    pk.setFloat32(healthPercent, 0x68);
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}

export function hideBossBar(player: Actor): void {
    let pk = BossEventPacket.create();
    pk.setBin(player.getUniqueIdPointer().getBin64(), 0x30);
    pk.setUint32(2, 0x40);
    pk.setCxxString("", 0x48);
    pk.setFloat32(0, 0x68);
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}

let _setServerMotd = procHacker.js("ServerNetworkHandler::allowIncomingConnections", RawTypeId.Void, null, ServerNetworkHandler, CxxStringWrapper, RawTypeId.Boolean);
export function setServerMotd(motd: string): void {
    let _motd = new CxxStringWrapper(true);
    _motd[NativeType.ctor]();
    _motd.value = motd;
    _setServerMotd(serverInstance.minecraft.something.shandler, _motd, true);
    _motd[NativeType.dtor]();
}

export function transferServer(player: Actor, address: string, port: number = 19132): void {
    let pk = TransferPacket.create();
    pk.address = address;
    pk.port = port;
    pk.sendTo(player.getNetworkIdentifier());
    pk.dispose();
}

let _teleport = procHacker.js("TeleportCommand::teleport", RawTypeId.Void, null, Actor, Vec3, RawTypeId.Int32, RawTypeId.Int32, RawTypeId.Float, RawTypeId.Float, RawTypeId.Int32, RawTypeId.Int32);
/** @deprecated Will crash server */
export function teleport(actor: Actor, target: {x: number, y: number, z: number}, dimension: DimensionId = 0): void {
    let _target = new Vec3();
    _target.x = target.x;
    _target.y = target.y;
    _target.z = target.z;
    _teleport(actor, _target, 0, dimension, 0, 0, 0, -1);
}

let _getPort = procHacker.js("RakNetInstance::getPort", RawTypeId.Int32, null, RakNetInstance);
export function getPort() {
    return _getPort(serverInstance.minecraft.something.network.instance);
}

/*
export class NetworkStatus extends NativeClass {
    level: int32_t;
    ping: int32_t;
    avgping: int32_t;
    packetloss: float64_t;
    avgpacketloss: float64_t;
}
let _getPeerForUser = procHacker.js("NetworkHandler::getPeerForUser", RaknetNetworkPeer, null, NetworkHandler, NetworkIdentifier);
let _getNetworkStatus = procHacker.js("RakNetInstance::RakNetNetworkPeer::getNetworkStatus", NetworkStatus, null, RaknetNetworkPeer);
export function getNetworkStatus(networkIdentifier: NetworkIdentifier) {
    return _getNetworkStatus(_getPeerForUser(serverInstance.minecraft.something.network, networkIdentifier));
}

let _getLastPing = procHacker.js("RakNet::RakPeer::GetLastPing", RawTypeId.Int32, null, RakNet.RakPeer, RakNet.AddressOrGUID);
export function getLastPing(networkIdentifier: NetworkIdentifier) {
    let peer = _getPeerForUser(serverInstance.minecraft.something.network, networkIdentifier);
    return _getLastPing(peer.peer, peer.addr);
}
*/

let _disconnectClient = procHacker.js("ServerNetworkHandler::disconnectClient", RawTypeId.Void, null, ServerNetworkHandler, NetworkIdentifier, RawTypeId.Int32, CxxStringWrapper, RawTypeId.Int32);
export function disconnectClient(networkIdentifier: NetworkIdentifier, message: string = "disconnectionScreen.disconnected") {
    let _message = new CxxStringWrapper(true);
    _message[NativeType.ctor]();
    _message.value = message;
    _disconnectClient(serverInstance.minecraft.something.shandler, networkIdentifier, 0, _message, 0);
    _message[NativeType.dtor]();
}

let _disonnectAllClients = procHacker.js("ServerInstance::disconnectAllClientsWithMessage", RawTypeId.Void, null, ServerInstance, CxxStringWrapper);
export function disconnectAllClients(message: string = "disconnectionScreen.disconnected") {
    let _message = new CxxStringWrapper(true);
    _message[NativeType.ctor]();
    _message.value = message;
    _disonnectAllClients(serverInstance, _message);
    _message[NativeType.dtor]();
}

let _getActorName = procHacker.js("Actor::getNameTag", CxxStringWrapper, null, Actor);
export function getActorName(actor: Actor): string {
    return _getActorName(actor).value;
}