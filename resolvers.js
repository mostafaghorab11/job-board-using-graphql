import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  // getJobs,
} from './db/companies.js';
import {
  createJob,
  deleteJob,
  getAllJobs,
  // getCompany,
  getJobById,
  updateJob,
} from './db/jobs.js';
import { UnauthorizedError } from './utils/appError.js';

export const resolvers = {
  Query: {
    jobs: async () => await getAllJobs(),

    job: async (_, { id }) => await getJobById(+id),

    companies: async () => await getAllCompanies(),

    company: async (_, { id }) => getCompanyById(+id),
  },
  Mutation: {
    createJob: async (
      _,
      { input: { title, description, companyId } },
      { user }
    ) => {
      if (!user) throw UnauthorizedError('please login first to create a job');
      return await createJob({ title, description, companyId: user.companyId });
    },
    createCompany: async (_, { input: { name, description } }) => {
      return await createCompany({ name, description });
    },
    deleteJob: async (_, { id }, { user }) => {
      if (!user) return UnauthorizedError('Please login to delete a job');
      return await deleteJob(+id, { companyId: +user.companyId });
    },

    updateJob: async (_, { id, input: { title, description } }, { user }) => {
      if (!user) return UnauthorizedError('Please login to update a job');
      return await updateJob(+id, {
        title,
        description,
        companyId: +user.companyId,
      });
    },
  },

  // Job: {
  //   company: async (job) => {
  //     return job ? await getCompany(job.id) : null;
  //   },
  // },

  // Company: {
  //   jobs: async (company) => {
  //     return company ? await getJobs(company.id) : null;
  //   },
  // },
};
