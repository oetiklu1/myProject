import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

async function initializeDb() {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
}

initializeDb();

const db = client.db("animeDB"); // select database

//////////////////////////////////////////
// Animes
//////////////////////////////////////////

// Get all animes with genre and studio details
async function getAnimes() {
  try {
    const collection = db.collection("animes");
    const animes = await collection.aggregate([
      {
        $addFields: {
          studioId: { $toObjectId: "$studioId" },
          genreId: { 
            $map: { 
              input: "$genreId",
              as: "id",
              in: { $toObjectId: "$$id" }
            }
          }
        }
      },
      {
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "studio"
        }
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genres"
        }
      },
      {
        $addFields: {
          studio: { $arrayElemAt: ["$studio", 0] }
        }
      }
    ]).toArray();

    return animes.map(anime => ({
      ...anime,
      _id: anime._id.toString(),
      studioId: anime.studioId?.toString(),
      genreId: Array.isArray(anime.genreId) ? anime.genreId.map(id => id.toString()) : [],
      studio: anime.studio ? { ...anime.studio, _id: anime.studio._id.toString() } : null,
      genres: anime.genres?.map(g => ({...g, _id: g._id.toString()})) || []
    }));
  } catch (error) {
    console.error("Error getting animes:", error);
    return [];
  }
}

// Get anime by id with genre and studio details
async function getAnime(id) {
  try {
    if (!ObjectId.isValid(id)) return null;
    
    const collection = db.collection("animes");
    const animes = await collection.aggregate([
      { 
        $match: { _id: new ObjectId(id) }
      },
      {
        $addFields: {
          studioId: { $toObjectId: "$studioId" },
          genreId: { 
            $map: { 
              input: "$genreId",
              as: "id",
              in: { $toObjectId: "$$id" }
            }
          }
        }
      },
      {
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "studio"
        }
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genres"
        }
      },
      {
        $addFields: {
          studio: { $arrayElemAt: ["$studio", 0] }
        }
      }
    ]).toArray();

    if (!animes[0]) return null;

    const result = animes[0];
    return {
      ...result,
      _id: result._id.toString(),
      studioId: result.studioId?.toString(),
      genreId: Array.isArray(result.genreId) ? result.genreId.map(id => id.toString()) : [],
      studio: result.studio ? { ...result.studio, _id: result.studio._id.toString() } : null,
      genres: result.genres?.map(g => ({...g, _id: g._id.toString()})) || []
    };
  } catch (error) {
    console.error("Error getting anime:", error);
    return null;
  }
}

// create anime with genre and studio IDs as ObjectId
async function createAnime(anime) {
  try {
    const collection = db.collection("animes");
    
    // Validate inputs
    if (!anime.studioIds?.length || !anime.genreIds?.length) {
      console.error("Missing studio or genre IDs");
      return null;
    }

    const newAnime = {
      title: anime.title,
      year: anime.year,
      episodes: anime.episodes,
      rating: anime.rating,
      poster: anime.poster,
      description: anime.description,
      studioId: new ObjectId(anime.studioIds[0]),
      genreId: anime.genreIds.map(id => new ObjectId(id))
    };
    
    const result = await collection.insertOne(newAnime);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating anime:", error);
    return null;
  }
}

async function updateAnime(newData) {
  try {
    const id = newData._id;
    delete newData._id;

    // Holen des aktuellen Anime-Dokuments
    const currentAnime = await db.collection("animes").findOne({ _id: new ObjectId(id) });

    if (!currentAnime) {
      console.log("No anime found with id " + id);
      return null;
    }

    // Merge existierender Daten mit neuen Daten
    const updatedAnime = { ...currentAnime, ...newData };
    delete updatedAnime._id;

    const collection = db.collection("animes");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedAnime }
    );

    if (result.matchedCount === 0) {
      console.log("No anime with id " + id);
    } else {
      console.log("Anime with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.error("Error updating anime:", error);
  }
  return null;
}

// delete anime by id
// returns: id of the deleted anime or null, if anime could not be deleted
async function deleteAnime(id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const collection = db.collection("animes");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No anime with id " + id);
    } else {
      console.log("Anime with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

async function getStudios() {
  let studios = [];
  try {
    const collection = db.collection("studios");

    const query = {};

    studios = await collection.find(query).toArray();
    studios.forEach((studio) => {
      studio._id = studio._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return studios; // corrected return value
}

// Get studio by id
async function getStudio(id) {
  let studio = null;
  try {
    const collection = db.collection("studios");
    const query = { _id: new ObjectId(id) }; // filter by id
    studio = await collection.findOne(query);

    if (!studio) {
      console.log("No studio with id " + id);
      // TODO: errorhandling
    } else {
      studio._id = studio._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return studio;
}

// create studio
// Example studio object:
/* 
{ 
  studio: "Studio Name"
} 
*/
async function createStudio(studio) {
  try {
    const collection = db.collection("studios");
    const result = await collection.insertOne(studio);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update studio
// Example studio object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  studio: "Studio Name"
} 
*/
// returns: id of the updated studio or null, if studio could not be updated
async function updateStudio(studio) {
  try {
    let id = studio._id;
    delete studio._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("studios");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: studio });

    if (result.matchedCount === 0) {
      console.log("No studio with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Studio with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete studio by id
// returns: id of the deleted studio or null, if studio could not be deleted
async function deleteStudio(id) {
  try {
    const collection = db.collection("studios");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No studio with id " + id);
    } else {
      console.log("Studio with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// Get all genres
async function getGenres() {
  let genres = [];
  try {
    const collection = db.collection("genres");

    const query = {};

    genres = await collection.find(query).toArray();
    genres.forEach((genre) => {
      genre._id = genre._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return genres;
}

// Get genre by id
async function getGenre(id) {
  let genre = null;
  try {
    const collection = db.collection("genres");
    const query = { _id: new ObjectId(id) }; // filter by id
    genre = await collection.findOne(query);

    if (!genre) {
      console.log("No genre with id " + id);
    } else {
      genre._id = genre._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
  }
  return genre;
}

// create genre
// Example genre object:
/* 
{ 
  genre: "Genre Name"
} 
*/
async function createGenre(genre) {
  try {
    const collection = db.collection("genres");
    const result = await collection.insertOne(genre);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// update genre
// Example genre object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  genre: "Genre Name"
} 
*/
// returns: id of the updated genre or null, if genre could not be updated
async function updateGenre(genre) {
  try {
    let id = genre._id;
    delete genre._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("genres");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: genre });

    if (result.matchedCount === 0) {
      console.log("No genre with id " + id);
    } else {
      console.log("Genre with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// delete genre by id
// returns: id of the deleted genre or null, if genre could not be deleted
async function deleteGenre(id) {
  try {
    const collection = db.collection("genres");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No genre with id " + id);
    } else {
      console.log("Genre with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

async function addRating(rating) {
  try {
    if (!rating.animeId || !ObjectId.isValid(rating.animeId)) {
      console.error('Invalid animeId:', rating.animeId);
      return null;
    }

    if (!rating.rating || isNaN(rating.rating) || rating.rating < 1 || rating.rating > 5) {
      console.error('Invalid rating value:', rating.rating);
      return null;
    }

    const collection = db.collection("ratings");
    const ratingDoc = {
      animeId: new ObjectId(rating.animeId),
      rating: parseInt(rating.rating),
      comment: rating.comment.trim(),
      timestamp: new Date()
    };

    const result = await collection.insertOne(ratingDoc);
    console.log("Rating added successfully:", result.insertedId);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error adding rating:", error);
    return null;
  }
}

async function getRatings(animeId) {
  try {
    if (!animeId || !ObjectId.isValid(animeId)) {
      console.error('Invalid animeId format:', animeId);
      return [];
    }

    const collection = db.collection("ratings");
    const ratings = await collection.find({
      animeId: new ObjectId(animeId)
    })
      .sort({ timestamp: -1 })
      .toArray();

    return ratings.map(rating => ({
      ...rating,
      _id: rating._id.toString(),
      animeId: rating.animeId.toString(),
      rating: parseInt(rating.rating),
      timestamp: rating.timestamp.toISOString()
    }));
  } catch (error) {
    console.error('Error getting ratings:', error);
    return [];
  }
}

async function getAnimesByGenre(genreId) {
  try {
    if (!ObjectId.isValid(genreId)) return [];
    
    const collection = db.collection("animes");
    const animes = await collection.aggregate([
      {
        $match: {
          genreId: { $in: [genreId, new ObjectId(genreId)] }  // Prüft beide Formate
        }
      },
      {
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "studio"
        }
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genres"
        }
      },
      {
        $addFields: {
          studio: { $arrayElemAt: ["$studio", 0] }
        }
      }
    ]).toArray();

    return animes.map(anime => ({
      ...anime,
      _id: anime._id.toString(),
      studioId: anime.studioId?.toString(),
      genreId: Array.isArray(anime.genreId) ? anime.genreId.map(id => id.toString()) : [],
      studio: anime.studio ? { ...anime.studio, _id: anime.studio._id.toString() } : null,
      genres: anime.genres?.map(g => ({...g, _id: g._id.toString()})) || []
    }));
  } catch (error) {
    console.error("Error getting animes by genre:", error);
    return [];
  }
}

async function getAnimesByStudio(studioId) {
  try {
    if (!ObjectId.isValid(studioId)) return [];
    
    const collection = db.collection("animes");
    const animes = await collection.aggregate([
      {
        $match: {
          $or: [
            { studioId: studioId },             // String Format
            { studioId: new ObjectId(studioId) } // ObjectId Format
          ]
        }
      },
      {
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "studio"
        }
      },
      {
        $lookup: {
          from: "genres",
          localField: "genreId",
          foreignField: "_id",
          as: "genres"
        }
      },
      {
        $addFields: {
          studio: { $arrayElemAt: ["$studio", 0] }
        }
      }
    ]).toArray();

    return animes.map(anime => ({
      ...anime,
      _id: anime._id.toString(),
      studioId: anime.studioId?.toString(),
      genreId: Array.isArray(anime.genreId) ? anime.genreId.map(id => id.toString()) : [],
      studio: anime.studio ? { ...anime.studio, _id: anime.studio._id.toString() } : null,
      genres: anime.genres?.map(g => ({...g, _id: g._id.toString()})) || []
    }));
  } catch (error) {
    console.error("Error getting animes by studio:", error);
    return [];
  }
}

export default {
  getAnimes,
  getAnime,
  createAnime,
  updateAnime,
  deleteAnime,
  getStudios,
  getStudio,
  createStudio,
  updateStudio,
  deleteStudio,
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
  addRating,
  getRatings,
  getAnimesByStudio,
  getAnimesByGenre
};