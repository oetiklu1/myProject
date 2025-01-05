import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const studio = {
      studio: data.get('studio'),
      founded: parseInt(data.get('founded')),
      poster: data.get('poster')
    };
    
    const result = await db.createStudio(studio);
    if (!result) {
      throw error(500, 'Failed to create studio');
    }
    throw redirect(303, '/studios');
  }
};