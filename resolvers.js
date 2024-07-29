import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getJobs,
} from './db/companies.js';
import {
  createJob,
  deleteJob,
  getAllJobs,
  getCompany,
  getJobById,
  updateJob,
} from './db/jobs.js';

export const resolvers = {
  Query: {
    jobs: async () => await getAllJobs(),

    job: async (_, { id }) => await getJobById(+id),

    companies: async () => await getAllCompanies(),

    company: async (_, { id }) => getCompanyById(+id),
  },
  Mutation: {
    createJob: async (_, { input: { title, description, companyId } }) => {
      return await createJob({ title, description, companyId });
    },
    createCompany: async (_, { input: { name, description } }) => {
      return await createCompany({ name, description });
    },
    deleteJob: async (_, { id }) => await deleteJob(+id),

    updateJob: async (_, { id, input: { title, description, companyId } }) => {
      return await updateJob(+id, { title, description, companyId });
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
