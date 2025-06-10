/**
 * Sanitize user input to prevent injection attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 500); // Limit input length
}

/**
 * Create context prompt for cat care chatbot
 */
function createCatCarePrompt(userMessage) {
  const basePrompt = `
Kamu adalah PurrPal AI, asisten virtual yang membantu pemilik kucing di Indonesia. 
Kamu memiliki pengetahuan tentang:
- Perawatan kucing dan kesehatan dasar
- Nutrisi dan makanan kucing
- Perilaku kucing
- Tips perawatan harian
- Tanda-tanda kucing sakit
- Kapan harus ke dokter hewan

Berikan jawaban yang ramah, informatif, dan mudah dipahami dalam Bahasa Indonesia.
Jika pertanyaan tentang kondisi serius, selalu sarankan untuk konsultasi dokter hewan.

Pertanyaan pengguna: ${userMessage}

Jawaban:`;
  
  return basePrompt;
}

/**
 * Format response for consistency
 */
function formatResponse(response) {
  return {
    success: true,
    message: response.trim(),
    timestamp: new Date().toISOString(),
    source: 'vertex-ai'
  };
}

/**
 * Create error response
 */
function createErrorResponse(error) {
  return {
    success: false,
    message: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.',
    error: error.message,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  sanitizeInput,
  createCatCarePrompt,
  formatResponse,
  createErrorResponse
};