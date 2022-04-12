import { Request } from "express";

export const paginationConfig = (req: Request) => ({
  page: req.body.page || 0,
  limit: req.body.limit || 10,
});
