const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "PayPal"], required: true },
    status: { type: String, enum: ["successful", "failed"], default: "successful" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
