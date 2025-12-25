import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  createFileShare,
  getFileShare,
  updateFileSharePermissions,
  deleteFileShare,
  getUserFileShares,
  getFileSharesByFileId,
} from "../db-file-sharing";

export const fileSharingRouter = router({
  createShare: publicProcedure
    .input(
      z.object({
        fileId: z.number(),
        userId: z.number(),
        isPublic: z.boolean(),
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await createFileShare(
        input.fileId,
        input.userId,
        input.isPublic,
        input.expiresAt
      );
    }),

  getShare: publicProcedure
    .input(z.object({ shareId: z.string() }))
    .query(async ({ input }) => {
      return await getFileShare(input.shareId);
    }),

  updatePermissions: publicProcedure
    .input(
      z.object({
        shareId: z.string(),
        isPublic: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      await updateFileSharePermissions(input.shareId, input.isPublic);
      return { success: true };
    }),

  deleteShare: publicProcedure
    .input(z.object({ shareId: z.string() }))
    .mutation(async ({ input }) => {
      await deleteFileShare(input.shareId);
      return { success: true };
    }),

  getUserShares: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      return await getUserFileShares(input.userId);
    }),

  getFileShares: publicProcedure
    .input(z.object({ fileId: z.number() }))
    .query(async ({ input }) => {
      return await getFileSharesByFileId(input.fileId);
    }),
});
