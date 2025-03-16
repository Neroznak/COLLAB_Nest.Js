import {
  WebSocketGateway,
  OnGatewayInit,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";
import {IsReadMessageDto} from "./dto/isRead-message.dto";

@WebSocketGateway(5006, { // WebSocket сервер на порту 5006
  namespace: 'messages',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MyGateway');
  @WebSocketServer() server: Server;
  private connectedClients: number = 0; // счетчик подключений
  constructor(private readonly messageService: MessageService) {} // Инъекция сервиса


  afterInit(server: Server) {
    this.logger.log(`WebSocket сервер запущен на порту 5006 с namespace: /messages. ${server}`);
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

  @SubscribeMessage('joinCollab')
  handleJoinRoom(client: Socket, collabHash: string) {
    client.join(collabHash);
    this.logger.log(`Клиент ${client.id} присоединился к комнате: ${collabHash}`);
  }

    @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, collabHash: string) {
    client.leave(collabHash);
    this.logger.log(`Клиент ${client.id} покинул комнату: ${collabHash}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: CreateMessageDto) {
    this.logger.log(`Сообщение получено от клиента ${client.id}: ${JSON.stringify(payload)}`);

    const createdMessage = await this.messageService.createMessage(payload);

    this.server.to(payload.collabHash).emit('receiveMessage', {
      id: createdMessage.id,
      content: createdMessage.content,
      collabHash: createdMessage.collabHash,
      userId: createdMessage.userId,
      user: createdMessage.user
    });

    return `Message saved: ${createdMessage.id}`;
  }




  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(client: Socket, payload: IsReadMessageDto): Promise<void> {
    await this.messageService.markAsRead(payload.messageId);
    client.emit('messageRead', payload.messageId);
  }





}
