export const createFlight = (flight) => {
  // Return action
  return {
    // Unique identifier
    type: 'CREATE_LIST',
    // Payload
    flight: flight
  }
};
export const queryList = (query) => {
  // Return action
  return {
    // Unique identifier
    type: 'CREATE_QUERY',
    // Payload
    query: query
  }
};
