import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Application } from './applications.entity'; // Import Application entity

@Entity('vacancies') // Table name
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @Column({ type: 'varchar', length: 255 })
  title: string; // Vacancy Title

  @Column({ type: 'text' })
  description: string; // Vacancy Description

  @Column({ type: 'json', nullable: true })
  requirements: Record<string, any>; // Requirements in JSON format

  @Column({ type: 'varchar', length: 255 })
  location: string; // Job Location

  @Column({ type: 'varchar', length: 100, nullable: true })
  salaryRange: string; // Salary Range

  @Column({
    type: 'enum',
    enum: ['active', 'closed', 'archived'],
    default: 'active',
  })
  status: 'active' | 'closed' | 'archived'; // Vacancy Status

  @Column({ type: 'int' })
  createdBy: number; // Created by (HR or employer ID)

  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;

  @OneToMany(() => Application, (application) => application.vacancy, {
    cascade: ['insert', 'update'], // Specify cascading rules explicitly
  })
  applications: Application[]; // List of applications related to the vacancy
}
