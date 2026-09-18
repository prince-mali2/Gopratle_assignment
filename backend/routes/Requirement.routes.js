const express = require('express');
const router = express.Router();
const {
  createRequirement,
  getRequirements,
  getRequirementById,
} = require('../controllers/Requirement.controller');

// POST 
router.post('/', createRequirement);
router.get('/', getRequirements);




module.exports = router;