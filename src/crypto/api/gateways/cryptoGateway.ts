import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ICryptoService,
  ICryptoServiceProvider,
} from '../../core/primary-ports/crypto.service.interface';
import { Inject } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CryptoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(ICryptoServiceProvider) private cryptoService: ICryptoService,
  ) {}
  @WebSocketServer() server;
  @SubscribeMessage('allCrypto')
  async handleStockEvent(@ConnectedSocket() client: Socket): Promise<void> {
    try {
      const crypto = await this.cryptoService.getAllCrypto();
      this.server.emit('allCrypto', crypto);
    } catch (e) {
      client.error(e.message);
    }
  }

  async handleConnection(client: Socket, ...args): Promise<any> {
    this.server.emit('allCrypto', await this.cryptoService.getAllCrypto());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    this.server.emit('allCrypto', await this.cryptoService.getAllCrypto());
  }
}
