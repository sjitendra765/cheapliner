export const createFlight = (flight) => {
  // Return action
  return {
    // Unique identifier
    type: 'CREATE_LIST',
    // Payload
    flight: flight
  }
};
