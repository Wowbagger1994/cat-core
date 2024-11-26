import { PrismaClient } from '@prisma/client';
import { userConstants } from '../src/users/constants';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    'Admin1234',
    userConstants.roundsOfHashing,
  );
  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@admin.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });
  console.log('Created user with id: ', user.id, 'email: ', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
