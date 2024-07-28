import { PrismaClient } from '@prisma/client';

import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getJobs,
} from './db/companies.js';
import { createJob, getAllJobs, getCompany, getJobById } from './db/jobs.js';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    jobs: async () => await getAllJobs(),

    job: async (_, { id }) => await getJobById(+id),

    companies: async () => await getAllCompanies(),

    company: async (_, { id }) => getCompanyById(+id),
  },
  Mutation: {
    createJob: async (_, { data }) => {
      const { title, description, companyId } = data;
      return await createJob({ title, description, companyId });
    },
    createCompany: async (_, { data }) => {
      const { name, description } = data;
      return await createCompany({ name, description });
    },
  },
  Job: {
    company: async (job) => {
      return job ? await getCompany(job.id) : null;
    },
  },
  Company: {
    jobs: async (company) => {
      return company ? await getJobs(company.id) : null;
    },
  },
};
