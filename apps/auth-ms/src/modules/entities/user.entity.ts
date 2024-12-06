// src/user/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RefreshToken } from './refreshtoken.entity';
import { ResetToken } from './resettoken.entity';
import { Role } from './role.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('users_auth')
export class UserAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false }) // Email not-null
  email: string;

  @Column({ nullable: false }) // Password not-null
  password: string;

  @Column({ default: true }) // Default value for isActive
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;

  @OneToMany(() => RefreshToken, (resfreshToken) => resfreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => ResetToken, (resetToken) => resetToken.user, {
    nullable: true,
  })
  @JoinColumn()
  resetTokens: ResetToken[];

  @ManyToOne(() => Role, (role) => role.users)
  roleDetails: Role;
}
