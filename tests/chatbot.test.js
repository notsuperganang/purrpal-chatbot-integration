const { PurrPalChatbot } = require('../src/chatbot');
const { sanitizeInput, createCatCarePrompt } = require('../src/utils');

describe('PurrPal Chatbot', () => {
  let chatbot;

  beforeAll(async () => {
    chatbot = new PurrPalChatbot();
    // Note: Skip initialization in tests to avoid API calls
  });

  test('should sanitize input correctly', () => {
    expect(sanitizeInput('  Hello World  ')).toBe('Hello World');
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput(null)).toBe('');
  });

  test('should create proper cat care prompt', () => {
    const prompt = createCatCarePrompt('Test message');
    expect(prompt).toContain('PurrPal AI');
    expect(prompt).toContain('Test message');
  });

  test('should handle initialization', () => {
    expect(chatbot.initialized).toBe(false);
  });
});