const { VertexAI } = require('@google-cloud/vertexai');
const config = require('./config');
const { 
  sanitizeInput, 
  createCatCarePrompt, 
  formatResponse, 
  createErrorResponse 
} = require('./utils');

class PurrPalChatbot {
  constructor() {
    this.vertexAI = null;
    this.model = null;
    this.initialized = false;
  }

  /**
   * Initialize the Vertex AI client for Gemini
   */
  async initialize() {
    try {
      // Initialize Vertex AI
      this.vertexAI = new VertexAI({
        project: config.googleCloud.projectId,
        location: config.googleCloud.location,
        googleAuthOptions: {
          keyFilename: config.googleCloud.keyFilename
        }
      });

      // Get Gemini model
      this.model = this.vertexAI.getGenerativeModel({
        model: config.googleCloud.model,
        generationConfig: {
          maxOutputTokens: config.chatbot.maxTokens,
          temperature: config.chatbot.temperature,
          topP: config.chatbot.topP,
          topK: config.chatbot.topK,
        },
      });

      this.initialized = true;
      console.log('PurrPal Chatbot initialized successfully');
      console.log('Using model:', config.googleCloud.model);
      return true;
    } catch (error) {
      console.error('Failed to initialize chatbot:', error.message);
      throw new Error('Chatbot initialization failed: ' + error.message);
    }
  }

  /**
   * Generate response from user input using Gemini
   */
  async generateResponse(userMessage) {
    if (!this.initialized) {
      throw new Error('Chatbot not initialized. Call initialize() first.');
    }

    try {
      // Sanitize and prepare input
      const sanitizedMessage = sanitizeInput(userMessage);
      if (!sanitizedMessage) {
        throw new Error('Invalid input message');
      }

      const prompt = createCatCarePrompt(sanitizedMessage);

      // Generate response using Gemini
      const result = await this.model.generateContent(prompt);
      
      // Extract text from response
      let generatedText = 'Maaf, saya tidak dapat memberikan jawaban saat ini.';
      
      if (result && result.response) {
        const response = result.response;
        if (response.candidates && response.candidates.length > 0) {
          const candidate = response.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            generatedText = candidate.content.parts[0].text || generatedText;
          }
        }
      }

      return formatResponse(generatedText);

    } catch (error) {
      console.error('Error generating response:', error.message);
      return createErrorResponse(error);
    }
  }

  /**
   * Generate streaming response (optional feature)
   */
  async generateStreamingResponse(userMessage) {
    if (!this.initialized) {
      throw new Error('Chatbot not initialized. Call initialize() first.');
    }

    try {
      const sanitizedMessage = sanitizeInput(userMessage);
      if (!sanitizedMessage) {
        throw new Error('Invalid input message');
      }

      const prompt = createCatCarePrompt(sanitizedMessage);

      // Generate streaming response
      const streamingResult = this.model.generateContentStream(prompt);
      
      let fullResponse = '';
      for await (const item of streamingResult.stream) {
        if (item.candidates && item.candidates[0] && item.candidates[0].content) {
          const content = item.candidates[0].content;
          if (content.parts && content.parts[0]) {
            fullResponse += content.parts[0].text || '';
          }
        }
      }

      return formatResponse(fullResponse || 'Maaf, saya tidak dapat memberikan jawaban saat ini.');

    } catch (error) {
      console.error('Error generating streaming response:', error.message);
      return createErrorResponse(error);
    }
  }

  /**
   * Health check for the chatbot
   */
  async healthCheck() {
    try {
      if (!this.initialized) {
        return { status: 'not_initialized', message: 'Chatbot not initialized' };
      }

      // Simple test prediction
      const testResponse = await this.generateResponse('Halo');
      return { 
        status: 'healthy', 
        message: 'Chatbot is working properly',
        model: config.googleCloud.model,
        test_response: testResponse.success
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: error.message 
      };
    }
  }
}

// Export both class and singleton instance
const chatbotInstance = new PurrPalChatbot();

module.exports = {
  PurrPalChatbot,
  chatbot: chatbotInstance
};

// If running directly (not as module)
if (require.main === module) {
  async function testChatbot() {
    try {
      await chatbotInstance.initialize();
      
      const response = await chatbotInstance.generateResponse(
        'Kucing saya tidak mau makan, apa yang harus saya lakukan?'
      );
      
      console.log('Test Response:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Test failed:', error.message);
    }
  }
  
  testChatbot();
}