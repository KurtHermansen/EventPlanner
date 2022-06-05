const { number, boolean } = require("joi");

module.exports = (mongoose) => {
    const Venue = mongoose.model(
      'venues',
      mongoose.Schema({
        address: {
          type: String
        },
        locationName: {
          type: String
        },
        capacity: {
          type: Number
        },
        indoor: {
          type: Boolean
        }
      })
    );
  
    return Venue;
  };