import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserAuth } from './user.entity';

@Entity('resettokens')
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @OneToOne(() => UserAuth, (user) => user.resetTokens, { onDelete: 'CASCADE' })
  user: UserAuth;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
} 
