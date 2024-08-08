import axios from "axios";

/**
 * Defines the base API URL for making requests to the server.
 */
const API_URL = "https://seo.wisdmlabs.net";

export const validateUrl = async (url) => {
  console.log(`Validation URL: ${url}`);
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/validate?url=${url}`
    );
    return response.data.valid;
  } catch (error) {
    return false;
  }
};

export const getURL = async (url, primaryKeywords) => {
  console.log("URL API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/url?url=${url}&primaryKeywords=${primaryKeywords}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

// const retryRequest = async (url, params, retries = 3) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const response = await axios.get(url, { params });
//       return response.data;
//     } catch (error) {
//       if (i === retries - 1) {
//         // Log error details and throw after final retry
//         console.error('Final attempt failed:', error);
//         if (error.response) {
//           console.error('Server error:', error.response.data);
//           throw new Error(error.response.data.message);
//         } else if (error.request) {
//           console.error('Network error:', error.request);
//           throw new Error('Network error. Please try again.');
//         } else {
//           console.error('Error setting up request:', error.message);
//           throw new Error('An error occurred. Please try again.');
//         }
//       }
//       // Wait before retrying
//       await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
//     }
//   }
// };



// export const getTitle = async (url, primaryKeywords) => {
//   console.log("Title API called");
//   try {
//     const response = await retryRequest(`${API_URL}/api/optimize/title`, {
//       url: encodeURIComponent(url),
//       primaryKeywords: encodeURIComponent(primaryKeywords)
//     });
//     return response;
//   } catch (error) {
//     console.error('Error fetching title:', error);
//     throw error;
//   }
// };


export const getTitle = async (url, primaryKeywords) => {
  console.log("Title API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/title?url=${url}&primaryKeywords=${primaryKeywords}`);
    return response.data;
  } catch (error) {
    console.log('Title API error:', error);
    return error;     
    if (error.response) {
      // throw new Error(error.response.data.message); 
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};


export const getMeta = async (url, primaryKeywords) => {
  console.log("Meta API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/meta?url=${url}&primaryKeywords=${primaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH1 = async (url, primaryKeywords) => {
  console.log("H1 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h1?url=${url}&primaryKeywords=${primaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH2 = async (url, secondaryKeywords) => {
  console.log("H2 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h2?url=${url}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH3 = async (url, secondaryKeywords) => {
  console.log("H3 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h3?url=${url}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH4 = async (url, secondaryKeywords) => {
  console.log("H4 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h4?url=${url}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH5 = async (url, secondaryKeywords) => {
  console.log("H5 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h5?url=${url}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getH6 = async (url, secondaryKeywords) => {
  console.log("H6 API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/h6?url=${url}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getContent = async (url, primaryKeywords, secondaryKeywords) => {
  console.log("Content API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/content?url=${url}&primaryKeywords=${primaryKeywords}&secondaryKeywords=${secondaryKeywords}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getImage = async (url) => {
  console.log("Image API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/image?url=${url}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getAnchorText = async (url) => {
  console.log("Anchor Text API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/anchorText?url=${url}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export const getAnchorLinks = async (url) => {
  console.log("Anchor Links API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/optimize/anchorLink?url=${url}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};
