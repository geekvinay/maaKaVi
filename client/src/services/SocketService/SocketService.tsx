import { io } from 'socket.io-client';
export default class SocketService {
    public io;

    constructor(url: string) {
        this.io = io(url);
    }
}