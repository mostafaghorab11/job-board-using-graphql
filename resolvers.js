import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await prisma.job.findMany();
      return jobs;
    },
  },
  Mutation: {
    createJob: async (_, args) => {
      const { title, description } = args.data;
      return await prisma.job.create({
        data: {
          title,
          description,
        },
      });
    },
  },
};
