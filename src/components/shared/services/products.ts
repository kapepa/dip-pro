import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

export const productsSearch = async (query: string): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } }))
    .data;
};