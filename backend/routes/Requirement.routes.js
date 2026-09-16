const express = require('express');
const router = express.Router();
const {
  createRequirement,
  getRequirements,
  getRequirementById,
} = require('../controllers/Requirement.controller');

// POST /api/requirements  -> create a new requirement
router.post('/', createRequirement);

// GET /api/requirements  -> list all (optionally ?category=planner|performer|crew)
router.get('/', getRequirements);

// GET /api/requirements/:id  -> get a single requirement
router.get('/:id', getRequirementById);

module.exports = router;