import { PrismaClient } from '@prisma/client';
import { notFoundError } from '../utils/appError.js';

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
  });
}

export async function getAllJobs() {
  return await prisma.job.findMany();
}

// export async function getAll()

export async function getJobById(id) {
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    throw notFoundError('No job found with that ID');
  }
  return job;
}

export async function getCompany(jobId) {
  return await prisma.job.findUnique({ where: { id: jobId } }).company();
}

// write a function to delete jobs
export async function deleteJob(jobId) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw notFoundError('Job not found');
  return await prisma.job.delete({ where: { id: jobId } });
}

// write a function to update jobs
export async function updateJob(jobId, { title, description, companyId }) {
  const existingJob = await prisma.job.findUnique({ where: { id: jobId } });
  console.log(existingJob);
  if (!existingJob) throw notFoundError('Job not found');
  return await prisma.job.update({
    where: { id: jobId },
    data: { title, description, company: { connect: { id: +companyId } } },
  });
}
