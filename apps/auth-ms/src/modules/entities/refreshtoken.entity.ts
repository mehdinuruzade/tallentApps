import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserAuth } from './user.entity';

@Entity('refreshtokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @ManyToOne(() => UserAuth, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  user: UserAuth;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
