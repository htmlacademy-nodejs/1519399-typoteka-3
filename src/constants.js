'use strict';

const DEFAULT_COMMAND = `--help`;

const MAX_ID_LENGTH = 6;

const USER_ARGV_INDEX = 2;

const API_PREFIX = `/api`;

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  MAX_ID_LENGTH,
  USER_ARGV_INDEX,
  API_PREFIX,
  ExitCode,
  HttpCode,
  HttpMethod,
  Env,
};
