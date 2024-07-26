import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await prisma.job.findMany();
      return jobs;
    },

    job: async (_, { id }) => {
      id = +id;
      const job = await prisma.job.findUnique({ where: { id } });
      if (!job) {
        throw new Error('No job found with that ID');
      }
      return job;
    },

    companies: async () => {
      const companies = await prisma.company.findMany();
      return companies;
    },

    company: async (_, { id }) => {
      id = +id;
      const company = await prisma.company.findUnique({ where: { id } });
      if (!company) {
        throw new Error('No company found with that ID');
      }
      return company;
    }
  },
  Mutation: {
    createJob: async (_, { data }) => {
      const { title, description, companyId } = data;
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
    },
    createCompany: async (_, { data }) => {
      const { name, description } = data;
      return await prisma.company.create({
        data: {
          name,
          description,
        },
      });
    },
  },
  Job: {
    company: async (job, args, context) => {
      return job
        ? await prisma.job.findUnique({ where: { id: job.id } }).company()
        : null;
    },
  },
};
