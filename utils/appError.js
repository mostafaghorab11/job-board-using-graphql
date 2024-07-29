import { GraphQLError } from 'graphql';

export function NotFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
}

export function UnauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED',
    },
  });
}
