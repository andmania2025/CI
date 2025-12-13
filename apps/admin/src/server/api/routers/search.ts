import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { searchDal } from "@/server/dal/search";
import { z } from "zod";

export const searchRouter = createTRPCRouter({
  getAreas: publicProcedure.query(async () => {
    return searchDal.getAreas();
  }),

  getPrefectures: publicProcedure.query(async () => {
    return searchDal.getPrefectures();
  }),

  getCities: publicProcedure
    .input(z.object({ prefecture: z.string().optional() }))
    .query(async ({ input }) => {
      return searchDal.getCities(input.prefecture);
    }),

  getRoutes: publicProcedure.query(async () => {
    return searchDal.getRoutes();
  }),

  getStations: publicProcedure
    .input(z.object({ route: z.string().optional() }))
    .query(async ({ input }) => {
      return searchDal.getStations(input.route);
    }),

  getFloorPlans: publicProcedure.query(async () => {
    return searchDal.getFloorPlans();
  }),

  getPropertyTypes: publicProcedure.query(async () => {
    return searchDal.getPropertyTypes();
  }),

  getRealEstateCompanies: publicProcedure.query(async () => {
    return searchDal.getRealEstateCompanies();
  }),
});
