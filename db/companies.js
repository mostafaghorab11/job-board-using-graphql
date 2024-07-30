import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/appError.js';

const prisma = new PrismaClient();

export async function createCompany({ name, description }) {
  return await prisma.company.create({
    data: {
      name,
      description,
    },
  });
}

export async function getAllCompanies() {
  return await prisma.company.findMany({
    include: {
      jobs: true,
    },
  });
}

export async function getCompanyById(id) {
  const company = await prisma.company.findUnique({
    where: { id },
    include: { jobs: true },
  });
  if (!company) {
    throw NotFoundError('No company found with that ID');
  }
  return company;
}

// export async function getJobs(companyId) {
//   return await prisma.company
//     .findUnique({ where: { id: companyId } })
//     .jobs();
// }
