import { 
    getLocationsWithinRadius, 
    getLocationsWithinRadiusWithPrize,
    nearestTreasure } from '../data-access/queries.js'
export const findTreasure = async (req) => {
    const { latitude, longitude, distance } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).json({ error: 'Latitude, longitude, and distance are required' });
    }

    const result = await getLocationsWithinRadius(latitude, longitude, parseInt(distance));
    
    return result
  }

export const findTreasuresWithPrize = async (req) => {
    const { 
        latitude, 
        longitude, 
        distance, 
        prizeValueStart, 
        prizeValueEnd 
    } = req.query;

    if (!latitude || !longitude || !distance) {
        return res.status(400).json({ error: 'Latitude, longitude, and distance are required' });
    }

    const parsedDistance = parseFloat(distance);
    if (isNaN(parsedDistance) || ![1, 10].includes(parsedDistance)) {
        throw new Error('Distance must be either 1 or 10 km');
    }
    let prizeValueQuery = '';
    if (prizeValueStart !== undefined && prizeValueEnd !== undefined) {
        const parsedPrizeValueStart = parseInt(prizeValueStart);
        const parsedPrizeValueEnd = parseInt(prizeValueEnd);
        if (isNaN(parsedPrizeValueStart) || isNaN(parsedPrizeValueEnd) || parsedPrizeValueStart < 10 || parsedPrizeValueEnd > 30 || parsedPrizeValueStart > parsedPrizeValueEnd) {
           throw new Error('Prize value range must be between $10 and $30');
        }
        prizeValueQuery = `AND (m.amt BETWEEN ${parsedPrizeValueStart} AND ${parsedPrizeValueEnd})`;
    }

    const result = await getLocationsWithinRadiusWithPrize(latitude, longitude, parseInt(distance), prizeValueQuery);
    
    return result
  }

export const findNearestTreasure = async (req) => {
    const { 
        latitude, 
        longitude, 
    } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude, longitude are required' });
    }


    const result = await nearestTreasure(latitude, longitude);
    
    return result
}