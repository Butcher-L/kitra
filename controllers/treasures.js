import { getLocationsWithinRadius } from '../data-access/queries.js'
export const findTreasure = async (req) => {
    const { latitude, longitude, distance } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).json({ error: 'Latitude, longitude, and distance are required' });
    }

    const result = await getLocationsWithinRadius(latitude, longitude, parseInt(distance));
    console.log("@HERE",result)
    
    return result
  }