import { RawPacket } from "bdsx/rawpacket";
import { NativePointer, PacketId } from "./bdsx";

export class PlayStatusPacket {
	static LoginSuccess = 0;
	static LoginFailedClient = 1;
	static LoginFailedServer = 2;
	static PlayerSpawn = 3;
	static LoginFailedInvalidTenent = 4;
	static LoginFailedVanillaEDU = 5;
	static LoginFailedEDUVanilla = 6;
	static LoginFailedServerFull = 7;
    status: number;
    read(ptr: NativePointer) {
        ptr.move(1);
        this.status = ptr.readInt32();
    }
    write(): RawPacket {
        let pk = new RawPacket(PacketId.PlayStatus);
        pk.writeInt32(this.status);
        return pk;
    }
}

export class TextPacket {
    static TypeRaw = 0;
    static TypeChat = 1;
    static TypeTranslation = 2;
    static TypePopup = 3;
    static TypeJukeboxPopup = 4;
    static TypeTip = 5;
    static TypeSystem = 6;
    static TypeWhisper = 7;
    static TypeAnnouncement = 8;
    static TypeJSONWhisper = 9;
    static TypeJSON = 10;
    type: number;
    needsTranslation: boolean;
    sourceName: string;
    message: string;
    parameters: string[] = [];
    xboxUserId: string = "";
    platformChatId: string = "";
    read(ptr: NativePointer) {
        ptr.move(1);
        this.type = ptr.readUint8();
        this.needsTranslation = ptr.readBoolean();
        switch (this.type) {
            case TextPacket.TypeChat:
            case TextPacket.TypeWhisper:
            case TextPacket.TypeAnnouncement:
                this.sourceName = ptr.readVarString();
            case TextPacket.TypeRaw:
            case TextPacket.TypeTip:
            case TextPacket.TypeSystem:
            case TextPacket.TypeJSONWhisper:
            case TextPacket.TypeJSON:
                this.message = ptr.readVarString();
                break;
            case TextPacket.TypeTranslation:
            case TextPacket.TypePopup:
            case TextPacket.TypeJukeboxPopup:
                this.message = ptr.readVarString();
                for (let i = 0; i < ptr.readVarUint(); i++) {
                    this.parameters.push(ptr.readVarString());
                }
                break;
        }
        this.xboxUserId = ptr.readVarString();
        this.platformChatId = ptr.readVarString();
    }
    write(): RawPacket {
        let pk = new RawPacket(PacketId.Text);
        pk.writeUint8(this.type);
        pk.writeBoolean(this.needsTranslation);
        switch (this.type) {
            case TextPacket.TypeChat:
            case TextPacket.TypeWhisper:
            case TextPacket.TypeAnnouncement:
                pk.writeVarString(this.sourceName);
            case TextPacket.TypeRaw:
            case TextPacket.TypeTip:
            case TextPacket.TypeSystem:
            case TextPacket.TypeJSONWhisper:
            case TextPacket.TypeJSON:
                pk.writeVarString(this.message);
                break;
            case TextPacket.TypeTranslation:
            case TextPacket.TypePopup:
            case TextPacket.TypeJukeboxPopup:
                pk.writeVarString(this.message);
                pk.writeVarUint(this.parameters.length);
                for (let p of this.parameters) {
                    pk.writeVarString(p);
                }
                break;
        }
        pk.writeVarString(this.xboxUserId);
        pk.writeVarString(this.platformChatId);
        return pk;
    }
}
