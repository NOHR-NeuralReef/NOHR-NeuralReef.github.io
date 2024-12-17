// Constants for error messages and defaults
const ERROR_MESSAGES = {
  NETWORK: 'Network error occurred while fetching data',
  INVALID_DATA: 'Received invalid data format',
  MISSING_INTRO: 'Introduction data is missing'
};

// Helper function to validate response data
function validateResponseData(data) {
  if (!data) {
    throw new Error(ERROR_MESSAGES.INVALID_DATA);
  }
  
  if (!data.introduction) {
    throw new Error(ERROR_MESSAGES.MISSING_INTRO);
  }
  
  return data;
}

fetch('/my-api')
  .then(response => {
    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.NETWORK}: ${response.status}`);
    }
    return response.json();
  })
  .then(data => validateResponseData(data))
  .then(data => {
    // At this point, we're guaranteed to have valid data with an introduction property
    console.log(data.introduction);
  })
  .catch(error => {
    console.error('Error:', error.message);
    
    // Handle different types of errors appropriately
    if (error.message.includes('Network error')) {
      // Handle network errors (e.g., show retry button)
    } else if (error.message.includes('invalid data')) {
      // Handle invalid data format
    } else if (error.message.includes('missing')) {
      // Handle missing properties
    }
    
    // You might want to throw the error again if it needs to be handled by a parent component
    throw error;
  }); 