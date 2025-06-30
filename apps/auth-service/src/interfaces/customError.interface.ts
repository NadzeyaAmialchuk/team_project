export interface ICustomError extends Error {
    statusCode?: number;
    errors?: any[];
  }
