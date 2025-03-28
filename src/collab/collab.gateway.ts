import {
    WebSocketGateway,
    OnGatewayInit,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer
} from "@nestjs/websockets";
import {Injectable, Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {PrismaService} from "../prisma.service";


@WebSocketGateway(5006, { // WebSocket сервер на порту 5006
    namespace: 'collab',
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

@Injectable()
export class CollabGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('CollabGateway');
    @WebSocketServer()
    public server: Server; // Делаем публичным
    private connectedClients: number = 0; // счетчик подключений
    constructor(private readonly prisma: PrismaService) {
    }


    afterInit(server: Server) {
        this.logger.log(`WebSocket сервер запущен на порту 5006 с namespace: /collab. ${server}`);
    }

    // Логирование подключений
    handleConnection(client: Socket) {
        const clientIp = client.handshake.address;
        this.connectedClients++;
        this.logger.log(`Клиент подключён: ${client.id} (IP: ${clientIp}). Всего подключений: ${this.connectedClients}`);
    }

    // Логирование отключений
    handleDisconnect(client: Socket) {
        this.connectedClients--;
        this.logger.log(`Клиент отключён: ${client.id}. Всего подключений: ${this.connectedClients}`);
    }


    @SubscribeMessage('joinToCollab')
    async handleJoinCollab(client: Socket, collabHash: string) {
        client.join(collabHash);
        const users = await  this.getUsers(collabHash);
        console.log("Пользователь вошёл в collab: ", JSON.stringify(users))
        this.server.to(collabHash).emit('updateUsers', users);
    }

    @SubscribeMessage('leaveToCollab')
    async handleLeaveCollab(client: Socket, collabHash: string) {
        client.leave(collabHash);
        const users = await  this.getUsers(collabHash);
        console.log("Пользователь вышел из collab'а: ", JSON.stringify(users))
        this.server.to(collabHash).emit('updateUsers', users);
    }

    async getUsers(collabHash: string) {
        const usersInCollab = await this.prisma.collabUser.findMany({
            where: {collabHash: collabHash},
            select: {
                User: {
                    select: {
                        id: true,
                        profilePictureUrl: true,
                        userName: true
                    }
                }
            }
        });

        return usersInCollab.map(collabUser => ({
            id: collabUser.User.id,
            profilePictureUrl: collabUser.User.profilePictureUrl,
            userName: collabUser.User.userName
        }));
    }


}
