import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Vacancy } from './vacancies.entity'; // Import Vacancy entity

@Entity('applications') // Table name
export class Application {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications, {
    onDelete: 'CASCADE', // Ensure cascading deletes when a vacancy is removed
  })
  @JoinColumn({ name: 'vacancy_id' }) // Foreign Key referencing Vacancy table
  vacancy: Vacancy;

  @Column({ type: 'int' })
  candidateId: number; // Candidate ID (assumes integration with another service)

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'rejected'; // Application Status

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date; // Created Timestamp

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date; // Updated Timestamp
}
