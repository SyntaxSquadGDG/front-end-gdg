'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidatePathAction(path: string): Promise<void> {
  try {
    await revalidatePath(path);
    console.log(`Path revalidated: ${path}`);
  } catch (error) {
    console.error(`Failed to revalidate path: ${path}`, error);
    throw error;
  }
}

export async function revalidateTagAction(tag: string): Promise<void> {
  try {
    await revalidateTag(tag);
    console.log(`Tag revalidated: ${tag}`);
  } catch (error) {
    console.error(`Failed to revalidate tag: ${tag}`, error);
    throw error;
  }
}

