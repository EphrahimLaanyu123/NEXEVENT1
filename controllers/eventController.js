const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, date, location } = req.body;

  try {
    const event = new Event({ name, date, location, createdBy: req.user.id });
    await event.save();

    res.status(201).json({ message: 'Event created successfully!', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};