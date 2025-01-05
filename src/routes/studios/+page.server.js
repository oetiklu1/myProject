import db from "$lib/server/db.js";
import { error } from "@sveltejs/kit";

export async function load() {
    try {
        const studios = await db.getStudios();
        return { studios };
    } catch (err) {
        throw error(500, 'Failed to load studios');
    }
}

export const actions = {
    addToWatchlist: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let studio = {
            _id: id,
            watchlist: true
        };
        await db.updateStudio(studio);
    },
    removeFromWatchlist: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let studio = {
            _id: id,
            watchlist: false
        };
        await db.updateStudio(studio);
    }
};
