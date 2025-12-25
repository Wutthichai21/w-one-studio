import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import { createFile, getUserFiles, deleteFile, getFileById } from "../db-files";

/**
 * File upload router with S3 storage integration
 */
export const filesRouter = router({
  /**
   * Upload a file to S3 and save metadata to database
   */
  upload: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1).max(255),
        fileData: z.string(), // base64 encoded file data
        mimeType: z.string().max(100),
        fileSize: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Decode base64 file data
        const buffer = Buffer.from(input.fileData, "base64");

        // Upload to S3
        const storageKey = `files/${ctx.user.id}/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(
          storageKey,
          buffer,
          input.mimeType
        );

        // Save file metadata to database
        await createFile({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          storageKey,
          storageUrl: url,
        });

        return {
          success: true,
          fileName: input.fileName,
          url,
          storageKey,
        };
      } catch (error) {
        console.error("[Files] Upload failed:", error);
        throw new Error("File upload failed");
      }
    }),

  /**
   * Get all files for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userFiles = await getUserFiles(ctx.user.id);
      return userFiles.map((file) => ({
        id: file.id,
        fileName: file.fileName,
        fileSize: file.fileSize,
        mimeType: file.mimeType,
        storageUrl: file.storageUrl,
        uploadedAt: file.uploadedAt,
      }));
    } catch (error) {
      console.error("[Files] List failed:", error);
      throw new Error("Failed to list files");
    }
  }),

  /**
   * Delete a file
   */
  delete: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Verify file belongs to user
        const file = await getFileById(input.fileId);
        if (!file || file.userId !== ctx.user.id) {
          throw new Error("File not found or unauthorized");
        }

        // Delete from database
        await deleteFile(input.fileId);

        return { success: true };
      } catch (error) {
        console.error("[Files] Delete failed:", error);
        throw new Error("Failed to delete file");
      }
    }),
});
