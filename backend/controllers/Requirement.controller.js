const Requirement = require('../models/Requirement');

// POST /api/requirements
// Creates a new requirement, categorized under planner/performer/crew
const createRequirement = async (req, res) => {
  try {
    const { eventName, eventType, dateRange, location, venue, category, details } = req.body;

    if (!eventName || !eventType || !dateRange?.startDate || !location || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['planner', 'performer', 'crew'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const requirement = await Requirement.create({
      eventName,
      eventType,
      dateRange,
      location,
      venue,
      category,
      details,
    });

    return res.status(201).json({ message: 'Requirement created', data: requirement });
  } catch (error) {
    console.error('createRequirement error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/requirements
// Returns all requirements, optionally filtered by category (?category=planner)
const getRequirements = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ data: requirements });
  } catch (error) {
    console.error('getRequirements error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/requirements/:id
const getRequirementById = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    return res.status(200).json({ data: requirement });
  } catch (error) {
    console.error('getRequirementById error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createRequirement,
  getRequirements,
  getRequirementById,
};