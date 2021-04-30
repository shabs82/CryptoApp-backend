import { ICryptoService } from '../primary-ports/crypto.service.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from '../../infrastructure/data-source/entities/crypto';
import { CryptoModel } from '../models/crypto-model';

@Injectable()
export class CryptoService implements ICryptoService {
  constructor(
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
  ) {}
  async addCrypto(id: number, name: string): Promise<Crypto> {
    let crypto = this.cryptoRepository.create();
    crypto.id = id;
    crypto.name = name;
    crypto = await this.cryptoRepository.save(crypto);
    return { id: crypto.id, name: crypto.name, description: '', price: 0 };
  }

  async deleteCrypto(id: number): Promise<void> {
    await this.cryptoRepository.delete({ id: id });
  }

  async getAllCrypto(): Promise<Crypto[]> {
    const crypto = await this.cryptoRepository.find();
    const cryptoModels: CryptoModel[] = JSON.parse(JSON.stringify(crypto));
    return cryptoModels;
  }

  getCryptoById(id: number): Promise<Crypto> {
    return Promise.resolve(undefined);
  }

  updateCrypto(id: number, cryptoValue: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
