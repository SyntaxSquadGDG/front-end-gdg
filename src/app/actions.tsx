'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function redirectFromServer(path: string): Promise<void> {
  try {
    await redirect(path);
  } catch (error) {
    console.error(`Failed to revalidate path: ${path}`, error);
    throw error;
  }
}

export async function refetchPlans() {
  await revalidatePath('/plans');
}

export async function refetchProfile() {
  await revalidatePath('/profile');
}

export async function refetchCategory() {
  await revalidateTag('category');
}

export async function refetchTypeResults() {
  await revalidateTag('typeResults');
}

export async function refetchStorage() {
  await revalidateTag('storage');
}

export async function refetchManager(id) {
  await revalidateTag(`manager${id}`);
}

export async function refetchTag(tag) {
  await revalidateTag(tag);
}
