import { IAIProvider } from './ai-interface';
import { GeminiTripProvider } from './gemini-provider';
import { MockTripProvider } from './mock-provider';

export function getAIProvider(forceMock = false): IAIProvider {
  if (forceMock) {
    return new MockTripProvider();
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim() !== '') {
    return new GeminiTripProvider(geminiKey);
  }

  // Graceful fallback to rich mock provider
  return new MockTripProvider();
}

