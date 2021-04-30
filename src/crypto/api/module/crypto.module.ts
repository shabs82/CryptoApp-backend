import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoGateway } from '../gateways/cryptoGateway';
import { Module } from '@nestjs/common';
import { CryptoService } from '../../core/services/cryptoService';
import { ICryptoServiceProvider } from '../../core/primary-ports/crypto.service.interface';
import { Crypto } from '../../infrastructure/data-source/entities/crypto';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto])],
  providers: [
    CryptoGateway,
    {
      provide: ICryptoServiceProvider,
      useClass: CryptoService,
    },
  ],
})
export class CryptoModule {}
