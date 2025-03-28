const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    price: { type: Number, required: true },
    ticketType: { type: String, enum: ["VIP", "General", "Student"], required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", TicketSchema);