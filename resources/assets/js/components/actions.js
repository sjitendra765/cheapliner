export const createFlight = (flight) => {
  // Return action
  return {
    // Unique identifier
    type: 'CREATE_LIST',
    // Payload
    flight: flight
  }
};

export const addFlight = (flight) => {
  // Return action
  return {
    // Unique identifier
    type: 'ADD_LIST',
    // Payload flight info
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
