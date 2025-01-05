import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const genre = await db.getGenre(params.genre_id);
    if (!genre) {
      throw error(404, 'Genre nicht gefunden');
    }
    const animes = await db.getAnimesByGenre(params.genre_id);
    return { genre, animes };
  } catch (err) {
    throw error(500, err.message);
  }
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const result = await db.deleteGenre(id);
    if (!result) {
      throw error(500, 'Failed to delete genre');
    }
    throw redirect(303, '/genres');
  }
};