import axios from 'axios';

// OpenRouter API configuration
const OPENROUTER_API_BASE_URL = 'https://openrouter.ai/api/v1';
const CLAUDE_MODEL = 'mistralai/mistral-small-24b-instruct-2501:free';

// Create axios instance for OpenRouter API
const openRouterApi = axios.create({
  baseURL: OPENROUTER_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Portfolio Project Summarizer',
  },
});

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  max_tokens?: number;
  temperature?: number;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generate text completion using Claude via OpenRouter
 * @param messages - Array of messages for the conversation
 * @param options - Optional parameters for the request
 */
export const generateCompletion = async (
  messages: OpenRouterMessage[],
  options: {
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<string> => {
  try {
    const request: OpenRouterRequest = {
      model: CLAUDE_MODEL,
      messages,
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7,
    };

    const response = await openRouterApi.post<OpenRouterResponse>('/chat/completions', request);
    
    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('No completion choices returned from OpenRouter API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating completion with OpenRouter:', error);
    throw error;
  }
};

/**
 * Generate a project summary using Claude
 * @param projectData - Combined project metadata and content
 */
export const generateProjectSummary = async (projectData: {
  name: string;
  description?: string;
  language?: string;
  topics: string[];
  readmeContent?: string;
  stats: {
    stars: number;
    forks: number;
    issues: number;
  };
}): Promise<string> => {
  const systemPrompt = `Tu es un rédacteur technique expert et passionné qui crée des résumés de projets captivants et amusants pour le portfolio d'un développeur.

Ta mission est de générer un résumé bref et accrocheur (2-3 phrases) qui met en avant :
- Le but principal et les fonctionnalités du projet de manière engageante
- Les technologies clés avec un ton enthousiaste
- Les caractéristiques notables ou réalisations impressionnantes

Adopte un ton professionnel mais décontracté, avec une pointe d'humour et d'enthousiasme. Rends ce projet irrésistible et mémorable ! Utilise des émojis avec parcimonie pour ajouter du dynamisme.`;

  const userPrompt = `Crée un résumé captivant et fun pour ce projet :

**Nom du Projet:** ${projectData.name}
**Description:** ${projectData.description || 'Aucune description fournie'}
**Langage Principal:** ${projectData.language || 'Non spécifié'}
**Technologies/Sujets:** ${projectData.topics.join(', ') || 'Aucun spécifié'}
**Stats GitHub:** ${projectData.stats.stars} étoiles, ${projectData.stats.forks} forks, ${projectData.stats.issues} issues ouvertes

${projectData.readmeContent ? `**Contenu README:**\n${projectData.readmeContent.slice(0, 2000)}${projectData.readmeContent.length > 2000 ? '...' : ''}` : '**Note:** Aucun fichier README disponible'}

Génère un résumé de 2-3 phrases en français qui soit à la fois professionnel, accrocheur et amusant - parfait pour un portfolio qui se démarque !`;

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  return await generateCompletion(messages, {
    maxTokens: 250,
    temperature: 0.8
  });
};

const openrouterService = {
  generateCompletion,
  generateProjectSummary,
};

export default openrouterService;