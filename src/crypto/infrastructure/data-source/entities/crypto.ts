import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crypto {
  @PrimaryColumn({ unique: true })
  public id: number;
  @Column({ unique: true })
  public name: string;
  @Column({ unique: true })
  public description: string;
  @Column({ unique: false })
  public price: number;
}
