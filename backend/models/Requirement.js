const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema(
  {
    // ---- Step 1: shared fields ----
    eventName: { type: String, required: true },
    eventType: { type: String, required: true }, // e.g. wedding, corporate, concert
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date }, // optional, for multi-day events
    },
    location: { type: String, required: true },
    venue: { type: String }, // optional

    category: {
      type: String,
      required: true,
      enum: ['planner', 'performer', 'crew'],
    },

    // ---- Step 2/3: category-specific fields ----
    details: {
      // Planner
      budgetRange: {
        min: Number,
        max: Number,
      },
      guestCount: Number,
      servicesNeeded: [String], // e.g. ['decor', 'catering', 'logistics']
      eventScale: String, // 'small' | 'medium' | 'large'
      specialRequirements: String,

      // Performer
      performanceType: String, // e.g. 'music', 'dance', 'comedy'
      duration: String, // e.g. '1 hr'
      genre: String,
      audienceSize: Number,
      equipmentProvided: Boolean,

      // Crew
      crewRole: [String], // e.g. ['sound engineer', 'lighting tech']
      crewCount: Number,
      shiftDuration: String,
      experienceLevel: String, // 'entry' | 'experienced' | 'expert'
      equipmentProvidedByClient: Boolean,

      // shared budget/fee field usable by performer or crew
      budgetOrFee: {
        min: Number,
        max: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Requirement', requirementSchema);