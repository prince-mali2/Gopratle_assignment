const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema(
  {

    eventName: { type: String, required: true },
    eventType: { type: String, required: true }, 
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date }, 
    },
    location: { type: String, required: true },
    venue: { type: String }, 

    category: {
      type: String,
      required: true,
      enum: ['planner', 'performer', 'crew'],
    },


    details: {
      // Planner
      budgetRange: {
        min: Number,
        max: Number,
      },
      guestCount: Number,
      servicesNeeded: [String], 
      eventScale: String, 
      specialRequirements: String,

      // Performer
      performanceType: String, 
      duration: String, 
      genre: String,
      audienceSize: Number,
      equipmentProvided: Boolean,

      // Crew
      crewRole: String, 
      crewCount: Number,
      shiftDuration: String,
      experienceLevel: String, 
      equipmentProvidedByClient: Boolean,


      budgetOrFee: {
        min: Number,
        max: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Requirement', requirementSchema);