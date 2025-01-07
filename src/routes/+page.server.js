import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

export async function load() {
    try {
        const client = new MongoClient(DB_URI);
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db('animeDB');

        const [animesRaw, genresRaw, studiosRaw] = await Promise.all([
            db.collection('animes').find().toArray(),
            db.collection('genres').find().toArray(),
            db.collection('studios').find().toArray()
        ]);

        // Convert MongoDB documents to serializable objects
        const animes = animesRaw.map(anime => ({
            ...anime,
            _id: anime._id.toString(),
            studioId: anime.studioId.toString(),
            genreId: anime.genreId.map(id => id.toString())
        }));

        const genres = genresRaw.map(genre => ({
            ...genre,
            _id: genre._id.toString()
        }));

        const studios = studiosRaw.map(studio => ({
            ...studio,
            _id: studio._id.toString()
        }));

        console.log('Data fetched:', { 
            animeCount: animes.length, 
            genreCount: genres.length, 
            studioCount: studios.length 
        });

        await client.close();
        console.log('MongoDB connection closed');

        return {
            animes,
            genres,
            studios
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            animes: [],
            genres: [],
            studios: []
        };
    }
}