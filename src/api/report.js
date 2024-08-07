import axios from "axios";

const API_URL = "https://seo.wisdmlabs.net"

export const checkTechnicalSEO = async (url) => {
  console.log('Technical SEO API called');
  try {
    const [technicalSEOResponse, mobileFriendlyResponse] = await Promise.all([
      axios.get(`${API_URL}/api/report/checkTechSEO?url=${url}`),
      axios.get(`${API_URL}/api/report/checkMobileFriendly?url=${url}`)
    ]);

    console.log('Technical SEO Response:', technicalSEOResponse.data);
    console.log('Mobile Friendly Response:', mobileFriendlyResponse.data);

    return {
      technicalSEO: technicalSEOResponse.data,
      mobileFriendly: mobileFriendlyResponse.data,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const checkCompilanceSEO = async (url) => {
  console.log('Compilance SEO API called');
  try {
    const canonicalTagResponse = await axios.get(
      `${API_URL}/api/report/checkCanonical?url=${url}`
    );
    console.log('Canonical Tag Response:', canonicalTagResponse.data);

    const structuredDataResponse = await axios.get(
      `${API_URL}/api/report/checkSD?url=${url}`
    );
    console.log('Structured Data Response:', structuredDataResponse.data);

    return {
      canonicalTag: canonicalTagResponse.data,
      structuredData: structuredDataResponse.data,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const checkScore = async (url) => {
  console.log("Score API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkScore?url=${url}`
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

export const getScreenshot = async (url) => {
  console.log("Screenshot API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkSS?url=${url}`
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

export const checkURL = async (url, primaryKeywords) => {
  console.log("URL API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkURL?url=${url}&primaryKeywords=${primaryKeywords}`
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

export const checkTitleMeta = async (url, primaryKeywords, secondaryKeywords) => {
  console.log("Title-Meta API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkTitleMeta?url=${url}&primaryKeywords=${primaryKeywords}&secondaryKeywords=${secondaryKeywords}`
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

export const checkTags = async (url) => {
  console.log("Meta Tags API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkTag?url=${url}`
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

export const checkContent = async (url, primaryKeywords, secondaryKeywords) => {
  console.log("Content API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkContent?url=${url}&primaryKeywords=${primaryKeywords}&secondaryKeywords=${secondaryKeywords}`
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

export const checkInternalLinks = async (url) => {
  console.log("Internal Links API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkInternalLink?url=${url}`
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

export const checkAltKeyword = async (url, secondaryKeywords) => {
  console.log("Alt Keyword API called");
  try {
    const response = await axios.get(
      `${API_URL}/api/report/checkAltKeyword?url=${url}&secondaryKeywords=${secondaryKeywords}`
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

