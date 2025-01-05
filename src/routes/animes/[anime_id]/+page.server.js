import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';
import { ObjectId } from "mongodb";

export async function load({ params }) {
  try {
    const animeId = params.anime_id;
    if (!ObjectId.isValid(animeId)) {
      throw error(400, 'Invalid anime ID');
    }

    const anime = await db.getAnime(animeId);
    if (!anime) {
      throw error(404, 'Anime nicht gefunden');
    }

    const genres = await db.getGenres();
    const studios = await db.getStudios();
    const ratings = await db.getRatings(animeId);

    return {
      anime,
      genres,
      studios,
      ratings: ratings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
  } catch (err) {
    throw error(500, err.message);
  }
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const result = await db.deleteAnime(id);
    if (!result) {
      throw error(500, 'Failed to delete anime');
    }
    throw redirect(303, '/animes');
  },

addRating: async ({ params, request }) => {
    try {
      const animeId = params.anime_id;
      if (!ObjectId.isValid(animeId)) {
        throw error(400, 'Invalid anime ID');
      }

      const anime = await db.getAnime(animeId);
      if (!anime) {
        throw error(404, 'Anime not found');
      }

      const data = await request.formData();
      const rating = parseInt(data.get("rating"));
      const comment = data.get("comment");

      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw error(400, 'Rating must be between 1 and 5');
      }

      if (!comment || typeof comment !== 'string' || comment.length < 3 || comment.length > 1000) {
        throw error(400, 'Comment must be between 3 and 1000 characters');
      }

      const ratingResult = await db.addRating({
        animeId: animeId,
        rating: rating,
        comment: comment.trim()
      });

      if (!ratingResult) {
        throw error(500, 'Failed to add rating');
      }

      return {
        type: 'success',
        status: 200,
        body: {
          success: true,
          ratingId: ratingResult
        }
      };
    } catch (err) {
      console.error('Rating error:', err);
      throw error(err.status || 500, err.message);
    }
  }
};