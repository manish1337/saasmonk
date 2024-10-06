import { Request } from "express";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export const getPaginationOptions = (req: Request): PaginationOptions => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  return { page, limit };
};

export const paginateResults = <T>(
  results: T[],
  page: number,
  limit: number
): T[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return results.slice(startIndex, endIndex);
};
