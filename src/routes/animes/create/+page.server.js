import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from "mongodb";

export async function load() {
  try {
    const [genres, studios] = await Promise.all([
      db.getGenres(),
      db.getStudios()
    ]);
    return { genres, studios };
  } catch (err) {
    throw error(500, 'Failed to load genres and studios');
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let anime = {
      title: data.get("title"),
      year: parseInt(data.get("year")),
      episodes: parseInt(data.get("episodes")),
      rating: parseFloat(data.get("rating")),
      poster: data.get("poster") || "/images/placeholder.jpg",
      description: data.get("description"),
      genreIds: data.getAll("genres").map(id => new ObjectId(id)),
      studioIds: data.getAll("studios").map(id => new ObjectId(id))
    };
    
    const result = await db.createAnime(anime);
    if (!result) {
      throw error(500, 'Failed to create anime');
    }
    throw redirect(303, `/animes/${result}`);
  }
};