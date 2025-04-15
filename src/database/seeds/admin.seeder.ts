import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { Admin } from '@/database/entities/admin.entities'
import { AdminRoleEnum, AdminStatusEnum } from '@/common/enum/admin.enum'
import * as argon2 from 'argon2'

export default class AdminSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const adminRepository = dataSource.getRepository(Admin)

    const existing = await adminRepository.findOneBy({ email: 'superadmin@skillpros.com' })
    if (!existing) {
      const admin = adminRepository.create({
        firstname: 'Super',
        lastname: 'Admin',
        email: 'superadmin@skillpros.com',
        phone: '0000000000',
        password: await argon2.hash('admin1234'),
        status: AdminStatusEnum.ACTIVE,
        role: AdminRoleEnum.SUPERADMIN,
      })

      await adminRepository.save(admin)
    }
  }
}
