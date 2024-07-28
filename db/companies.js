import { PrismaClient } from '@prisma/client';
import { notFoundError } from '../utils/appError.js';

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
  return await prisma.company.findMany();
}

// export async function getAll()

export async function getCompanyById(id) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) {
    throw notFoundError('No company found with that ID');
  }
  return company;
}

export async function getJobs(companyId) {
  return await prisma.company
    .findUnique({ where: { id: companyId } })
    .jobs();
}
