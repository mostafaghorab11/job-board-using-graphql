import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/appError.js';

const prisma = new PrismaClient();

export async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw NotFoundError('No user found with that ID');
  return user;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw NotFoundError('No user found with that email');
  return user;
}
