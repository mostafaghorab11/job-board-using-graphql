import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/appError.js';

const prisma = new PrismaClient();

export async function createJob({ title, description, companyId }) {
  if (!companyId) {
    throw new Error('companyId is required to create a job');
  }
  return await prisma.job.create({
    data: {
      title,
      description,
      company: {
        connect: {
          id: +companyId,
        },
      },
    },
    include: { company: true },
  });
}

export async function getAllJobs(limit, page) {
  const skip = (page - 1) * limit;
  return await prisma.job.findMany({
    include: {
      company: true,
    },
    orderBy: [{ createdAt: 'asc' }],
    take: limit,
    skip: skip ? skip : 0,
  });
}

export async function countAllJobs() {
  return await prisma.job.count();
}

export async function getJobById(id) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: { company: true },
  });
  if (!job) {
    throw NotFoundError('No job found with that ID');
  }
  return job;
}

// we removed it and used include instead to avoid N+1 query problem

// export async function getCompany(jobId) {
//   return await prisma.job.findUnique({ where: { id: jobId } }).company();
// }

export async function deleteJob(jobId, { companyId }) {
  const job = await prisma.job.findUnique({
    where: { id: jobId, companyId },
  });
  if (!job) throw NotFoundError('Job not found');
  return await prisma.job.delete({ where: { id: jobId } });
}

export async function updateJob(jobId, { title, description, companyId }) {
  const existingJob = await prisma.job.findUnique({
    where: { id: jobId, companyId },
  });
  if (!existingJob) throw NotFoundError('Job not found');
  return await prisma.job.update({
    where: { id: jobId },
    data: { title, description, company: { connect: { id: +companyId } } },
    include: { company: true },
  });
}
