import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('candidates') // Table name
export class Candidates {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key
  
  @Column({ type: 'varchar', length: 255 })
  name: string; // Namizədin adı

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // Namizədin email ünvanı

  @Column({ type: 'varchar', length: 50 })
  selectedLevel: string; // Namizədin seçdiyi səviyyə (Junior/Mid/Senior)

  @Column({ type: 'boolean', default: false })
  profileCompleted: boolean; // Profil tamamlanma statusu

  @CreateDateColumn({ type: 'timestamptz' }) // Automatically set to the current date
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Automatically updated to the current date on updates
  updatedAt: Date;

  }
