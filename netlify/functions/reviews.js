const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-07-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Basic validation
    if (!data.productId || !data.name || !data.rating || !data.comment) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Missing required fields' }),
      };
    }

    // Basic spam protection: Check comment length and content
    if (data.comment.length < 10 || data.comment.length > 500) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Comment must be between 10 and 500 characters' }),
      };
    }

    // Check for suspicious patterns (basic spam detection)
    const suspiciousPatterns = [
      /http[s]?:\/\//i, // URLs
      /[A-Z]{10,}/, // Excessive caps
      /[!@#$%^&*]{5,}/, // Excessive special characters
      /(.)\1{5,}/, // Repeated characters
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(data.comment)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, error: 'Comment contains suspicious content' }),
        };
      }
    }

    // Create review in Sanity
    const review = await client.create({
      _type: 'review',
      productRef: {
        _type: 'reference',
        _ref: data.productId
      },
      name: data.name.trim(),
      rating: data.rating,
      comment: data.comment.trim(),
      isApproved: false, // Requires admin approval
      createdAt: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        reviewId: review._id 
      }),
    };

  } catch (error) {
    console.error('Error submitting review:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Failed to submit review. Please try again.' }),
    };
  }
};
