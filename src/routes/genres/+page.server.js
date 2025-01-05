// routes/genres/+page.server.js
import db from "$lib/server/db.js";
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const genres = await db.getGenres();
    return { genres };
  } catch (err) {
    throw error(500, 'Failed to load genres');
  }
}

