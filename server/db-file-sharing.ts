import { getDb } from "./db";
import { fileShares } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function createFileShare(
  fileId: number,
  userId: number,
  isPublic: boolean,
  expiresAt?: Date
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = Math.random().toString(36).substr(2, 9);
  const result = await db
    .insert(fileShares)
    .values({
      id,
      fileId,
      userId,
      isPublic: isPublic ? 1 : 0,
      expiresAt,
      createdAt: new Date(),
    });

  return { id, fileId, userId, isPublic, expiresAt };
}

export async function getFileShare(shareId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(fileShares)
    .where(eq(fileShares.id, shareId));

  return result[0];
}

export async function updateFileSharePermissions(
  shareId: string,
  isPublic: boolean
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(fileShares)
    .set({ isPublic: isPublic ? 1 : 0 })
    .where(eq(fileShares.id, shareId));
}

export async function deleteFileShare(shareId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(fileShares).where(eq(fileShares.id, shareId));
}

export async function getUserFileShares(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select()
    .from(fileShares)
    .where(eq(fileShares.userId, userId));

  return result;
}

export async function getFileSharesByFileId(fileId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select()
    .from(fileShares)
    .where(eq(fileShares.fileId, fileId));

  return result;
}
