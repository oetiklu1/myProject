import db from "$lib/server/db.js";
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const studio = await db.getStudio(params.studio_id);
    if (!studio) throw error(404, 'Studio nicht gefunden');
    const animes = await db.getAnimesByStudio(params.studio_id);
    return { studio, animes };
    }

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        await db.deleteStudio(data.get("id"));
        throw redirect(303, "/studios");
    },
}