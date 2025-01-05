import db from "$lib/server/db.js";
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const animes = await db.getAnimes();
    console.log("Loaded Animes:", animes);
    
    if (!animes) {
      throw error(500, 'Failed to load animes');
    }
    
    return {
      animes
    };
  } catch (err) {
    console.error('Error loading animes:', err);
    throw error(500, 'Failed to load animes');
  }
}

export const actions = {
  addToWatchlist: async ({ request }) => {
    try {
      let data = await request.formData();
      let id = data.get("id");
      let anime = {
        _id: id,
        watchlist: true
      }
      await db.updateAnime(anime);
      return { success: true };
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      throw error(500, 'Failed to update watchlist');
    }
  },
  removeFromWatchlist: async ({ request }) => {
    try {
      let data = await request.formData();
      let id = data.get("id");
      let anime = {
        _id: id,
        watchlist: false
      }
      await db.updateAnime(anime);
      return { success: true };
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      throw error(500, 'Failed to update watchlist');
    }
  }
}