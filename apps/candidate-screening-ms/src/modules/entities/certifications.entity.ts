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

@Entity('certifications') // Table name
export class Certifications {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key
  
  @ManyToOne(() => Candidates, (candidate) => candidate.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidates; // Namizədin ID-si (foreign key)

  @CreateDateColumn({ type: 'timestamp' })
  issuedDate: Date; // Sertifikatın təqdim edildiyi tarix

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string; // Sertifikatın statusu (məsələn: "active", "revoked")

  @Column({ type: 'text', nullable: true })
  remarks: string; // Sertifikat ilə bağlı əlavə qeydlər


  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;

  }
