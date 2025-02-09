import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Candidates } from './candidates.entity';

@Entity('interviews') // Table name
export class Interviews {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @ManyToOne(() => Candidates, (candidate) => candidate.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidates; // Namizədin ID-si (foreign key)

  @Column({ type: 'varchar', length: 255 })
  joinUrl: string;

  @Column({ type: 'varchar', length: 255 })
  topic: string;

  @Column({ type: 'timestamp' })
  scheduleTime: Date; // Müsahibə üçün təyin olunan vaxt

  @Column({ type: 'text', nullable: true })
  recordingUrl: string; // Müsahibə zamanı qeydə alınmış video/audio linki
  
  @Column({ type: 'int', default: 40 })
  duration: number;

  @Column({ type: 'text', nullable: true })
  feedback: string; // Müsahibənin nəticəsi ilə bağlı rəy

  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;

  }
