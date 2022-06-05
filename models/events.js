
module.exports = (mongoose) => {
    const Event = mongoose.model(
      'events',
      mongoose.Schema({
        time: {
            type: String
        },
        date: {
            type: String
        },
        venueID: {
            type: String
        },
        ageGroup: {
            type: String
        },
        food: {
            type: String
        },
        sponsor: {
            type: String
        },
        theme: {
            type: String
        },
        cause: {
            type: String
        },
        eventPlanner: {
            type: String
        }
        
      })
    );
  
    return Event;
  };