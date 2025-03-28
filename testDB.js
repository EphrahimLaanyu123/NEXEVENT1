const mongoose = require("mongoose");
const connectDB = require("./db");
const User = require("./models/usermodel");
const Event = require("./models/eventmodel");

connectDB(); // Connect to DB

const testDB = async () => {
    try {
        // Create a new user
        const user = new User({
            name: "Mark Kariuki",
            email: "mark@example.com",
            password: "hashedpassword", // In real apps, hash passwords!
            role: "organizer"
        });
        await user.save();
        console.log("User Created:", user);

        // Create an event
        const event = new Event({
            title: "AI & Tech Summit",
            description: "A summit for AI enthusiasts.",
            date: new Date("2025-06-15"),
            location: "Nairobi Conference Center",
            organizerId: user._id,
            capacity: 500,
            ticketsAvailable: 200
        });
        await event.save();
        console.log("Event Created:", event);
        
        // Fetch events with organizer details
        const events = await Event.find().populate("organizerId");
        console.log("Fetched Events:", events);
        
        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
    }
};

testDB();
