import { eq } from "drizzle-orm";
import { files, InsertFile } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Create a new file record in the database
 */
export async function createFile(fileData: InsertFile): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.insert(files).values(fileData);
  } catch (error) {
    console.error("[Database] Failed to create file:", error);
    throw error;
  }
}

/**
 * Get all files for a specific user
 */
export async function getUserFiles(userId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(files)
      .where(eq(files.userId, userId))
      .orderBy(files.uploadedAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user files:", error);
    throw error;
  }
}

/**
 * Get a specific file by ID
 */
export async function getFileById(fileId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(files)
      .where(eq(files.id, fileId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get file:", error);
    throw error;
  }
}

/**
 * Delete a file record from the database
 */
export async function deleteFile(fileId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.delete(files).where(eq(files.id, fileId));
  } catch (error) {
    console.error("[Database] Failed to delete file:", error);
    throw error;
  }
}
