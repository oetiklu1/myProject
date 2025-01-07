import db from "$lib/server/db.js";
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const [animes, genres, studios, allRatings] = await Promise.all([
      db.getAnimes(),
      db.getGenres(),
      db.getStudios(),
      db.getRatings() // Existierende Funktion aus db.js
    ]);

    const avgRating = animes.reduce((acc, anime) => acc + anime.rating, 0) / animes.length;

    const studioStats = {};
    animes.forEach(anime => {
      if (anime.studio) {
        studioStats[anime.studio.studio] = (studioStats[anime.studio.studio] || 0) + 1;
      }
    });

    const yearStats = Object.entries(
      animes.reduce((acc, anime) => {
        acc[anime.year] = (acc[anime.year] || 0) + 1;
        return acc;
      }, {})
    )
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);

    // User Ratings Verteilung
    const ratingDistribution = Array(5).fill(0);
    allRatings.forEach(rating => {
      ratingDistribution[rating.rating - 1]++;
    });

    return {
      animeCount: animes.length,
      genreCount: genres.length,
      studioCount: studios.length,
      avgRating: avgRating.toFixed(1),
      yearStats,
      topStudios: Object.entries(studioStats)
        .map(([name, count]) => ({name, count}))
        .sort((a,b) => b.count - a.count),
      ratingDistribution: ratingDistribution.map((count, index) => ({
        rating: index + 1,
        count
      }))
    };
  } catch (err) {
    console.error('Dashboard Error:', err);
    throw error(500, 'Failed to load dashboard data');
  }
}