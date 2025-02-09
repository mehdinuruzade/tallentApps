import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    const predefinedRoles = [
      { id: 0, name: 'Guest', description: 'Guest user with not completed profile, cannot use any service.' },
      { id: 1, name: 'User', description: 'Regular user with limited access' },
      { id: 2, name: 'Recruiter', description: 'Can post and manage job listings' },
      { id: 3, name: 'Interviewer', description: 'Responsible for conducting interviews' },
      { id: 4, name: 'Admin', description: 'Administrator with full access' },
    ];

    for (const role of predefinedRoles) {
      const existingRole = await this.roleRepository.findOneBy({ id: role.id });
      if (!existingRole) {
        await this.roleRepository.save(role);
        console.log(`Inserted role: ${role.name}`);
      }
    }
  }
}