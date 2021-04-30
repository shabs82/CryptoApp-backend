import { Crypto } from '../../infrastructure/data-source/entities/crypto';

export const ICryptoServiceProvider = 'ICryptoServiceProvider';
export interface ICryptoService {
  addCrypto(id: number, name: string): Promise<Crypto>;

  updateCrypto(id: number, cryptoValue: string): Promise<void>;

  getCryptoById(id: number): Promise<Crypto>;

  getAllCrypto(): Promise<Crypto[]>;

  deleteCrypto(id: number): Promise<void>;
}
