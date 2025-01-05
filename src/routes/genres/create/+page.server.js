// routes/genres/create/+page.server.js
import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const genre = {
      genre: data.get('genre'),
      description: data.get('description')
    };
    
    const result = await db.createGenre(genre);
    if (!result) {
      throw error(500, 'Failed to create genre');
    }
    throw redirect(303, '/genres');
  }
};