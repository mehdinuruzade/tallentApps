import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('resettokens')
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @OneToOne(()=>User, (user)=> user.resetTokens,{onDelete: 'CASCADE'})
  user: User;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

}
