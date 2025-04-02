import getDistanceAndTime from "../controllers/DistanceController.js";
import rideModel from "../modelsf/Ridemodel.js";
import crypto from 'crypto';


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    // Change `origin` to `pickup`
    const distanceTime = await getDistanceAndTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: `${(baseFare.auto + (distanceTime.distance_km * perKmRate.auto) + (distanceTime.duration_min * perMinuteRate.auto)).toFixed(2)}`,
        car: `${(baseFare.car + (distanceTime.distance_km * perKmRate.car) + (distanceTime.duration_min * perMinuteRate.car)).toFixed(2)}`,
        motorcycle: `${(baseFare.motorcycle + (distanceTime.distance_km * perKmRate.motorcycle) + (distanceTime.duration_min * perMinuteRate.motorcycle)).toFixed(2)}`,
        minaway: `${(distanceTime.duration_min)}`
    };

    return fare;
}

function getotp(num) {
    if (!num || num <= 0) {
        throw new Error('num must be a positive integer');
    }

    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
const CreateRide = async ({user, pickup, destination, vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('user, pickup, destination and vehicleType are required');
    }
    const origin = pickup;

    const fare = await getFare(pickup,destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getotp(6),
        fare: fare[vehicleType],
    })
    return ride
}

export {CreateRide,getFare,getotp};