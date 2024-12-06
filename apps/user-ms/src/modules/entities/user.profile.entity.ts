import { UUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
@Entity('users_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false }) 
  userAuthID: UUID;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string; // User's first name

  @Column({ type: 'varchar', length: 255, nullable: true })
  surname: string; // User's surname

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronymic: string; // User's patronymic (middle name), optional

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string; // User's gender (e.g., "male", "female", "other"), optional

  @Column({ type: 'varchar', length: 255, nullable: true })
  position: string; // User's job position, optional

  @Column({ type: 'varchar', length: 50, nullable: true })
  positionLevel: string; // User's position level (e.g., "junior", "mid", "senior"), optional

  @Column({ type: 'varchar', length: 50, nullable: true })
  positionSublevel: string; // User's position sublevel (e.g., "lead", "assistant"), optional

  // Tarixlər
  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;
}
