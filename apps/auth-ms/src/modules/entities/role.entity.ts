import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(()=>Permission,(permission)=> permission.roles ) 
  @JoinTable()
  permissions: string[];

  @OneToMany(()=> User , (user)=>(user.roleDetails)) 
  users: User[];

}
