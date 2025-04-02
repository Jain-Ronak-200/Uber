import { validationResult } from "express-validator"
import  {CreateRide, getFare } from "../Services/Rideservices.js";
import getAddressesCoordinates, { getCaptainInTheRadius } from "../Services/mapsservices.js";
import { sendMessage } from "../socket.js";
import rideModel from "../modelsf/Ridemodel.js";


const createRide = async(req,res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        
        const ride = await CreateRide({user:req.user._id,pickup,destination,vehicleType});

        const pickupCoordinates = await getAddressesCoordinates(pickup)
        console.log(pickupCoordinates)
        const captainsInradius = await getCaptainInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,1000)
        ride.otp = ""
        
        const ridewithuser= await rideModel.findOne({_id:ride._id}).populate('user')
        captainsInradius.map(async captain=>{
            console.log(captain,ride)
            sendMessage(captain.socketId,{
                event:'new-ride',
                data:ridewithuser
            })

        })
        return res.json({ride});
    } catch (error) {
        return res.json({error:error.message});
        
    }



}

const getfare  = async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(4000).json({errors:error.array()})
    }
    const{pickup,destination}=req.query;
    try {
        const fare = await getFare(pickup,destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.log(error)
        res.json({error:error.message})
        
    }

}

const confirmRide = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { rideId, captainId } = req.body;

        // Ensure rideId is provided
        if (!rideId) {
            return res.status(400).json({ success: false, message: 'Ride ID is required' });
        }

        // Check if rideId is a valid MongoDB ObjectId
        if (!rideId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Ride ID format' });
        }

        // Find and update ride status
        const ride = await rideModel.findOneAndUpdate(
            { _id: rideId },
            { status: 'accepted', captain: captainId },
            { new: true }
        ).populate('user').populate('captain').select('+otp');

        if (!ride) {
            return res.status(404).json({ success: false, message: 'Ride not found' });
        }

        // Send confirmation message to the user
        if (ride.user?.socketId) {
            sendMessage(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        return res.status(200).json({ success: true, message: 'Ride confirmed successfully', ride });

    } catch (error) {
        console.error('❌ Error confirming ride:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
const startRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });

    }

    const {rideId, otp, captain} = req.query;
    try {
        // Ensure rideId and otp are provided
        if (!rideId || !otp) {
            return res.status(400).json({ success: false, message: 'Ride ID and OTP are required' });
        }

        // Check if rideId is a valid MongoDB ObjectId
        if (!rideId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Ride ID format' });
        }

        // Find the ride and verify OTP
        const ride = await rideModel.findOne({ _id: rideId, otp: otp, captain: captain })
            .populate('user')
            .populate('captain')
            .select('+otp');

        if (!ride) {
            return res.status(404).json({ success: false, message: 'Ride not found or invalid OTP' });
        }

        // Update ride status to 'started'
        ride.status = 'ongoing';
        await ride.save();

        // Notify user that ride has started
        if (ride.user?.socketId) {
            sendMessage(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json({ success: true, message: 'Ride started successfully', ride });
        
    } catch (error) {
        console.error(' Error starting ride:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }


}

const endRide  = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { rideId ,raiddetail} = req.body;

    try {
        // Ensure rideId is provided
        if (!rideId) {
            return res.status(400).json({ success: false, message: 'Ride ID is required' });
        }

        // Check if rideId is a valid MongoDB ObjectId
        if (!rideId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid Ride ID format' });
        }

        // Find the ride and update status to 'completed'
        const ride = await rideModel.findOneAndUpdate(
            { _id: rideId, status: 'ongoing' },
            { status: 'completed' }
        ).populate('user');

        if (!ride) {
            return res.status(404).json({ success: false, message: 'Ride not found or not ongoing' });
        }

        // Notify user that ride has ended
        if (ride.user?.socketId) {
            sendMessage(ride.user.socketId, {
                event: 'ride-ended',
                data: ride
            });
        }

        return res.status(200).json({ success: true, message: 'Ride ended successfully', ride });

    } catch (error) {
        console.error(' Error ending ride:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export  {createRide,getfare,confirmRide,startRide,endRide};


