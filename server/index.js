import http from 'node:http';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const parseJsonBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1e6) {
      req.destroy();
      reject(new Error('Payload too large'));
    }
  });
  req.on('end', () => {
    try {
      resolve(body ? JSON.parse(body) : {});
    } catch (error) {
      reject(error);
    }
  });
});

const requireApiKey = (res) => {
  if (!ai) {
    sendJson(res, 500, { error: 'Missing GEMINI_API_KEY on server.' });
    return false;
  }
  return true;
};

const handleApi = async (req, res, pathname) => {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  if (!requireApiKey(res)) return;

  try {
    const body = await parseJsonBody(req);

    if (pathname === '/api/health-plan') {
      const { answers } = body;
      const prompt = `
    As a clinical longevity expert, analyze the following user assessment data and provide a "Sleep Vitality Score" and a detailed action plan.
    User Data: ${JSON.stringify(answers)}
    
    Return a detailed health report in JSON format matching the AssessmentResult interface.
    Include:
    1. A score between 0-100.
    2. A category label (e.g., "High Heat Retainer", "REM Deprived").
    3. An efficiency percentage.
    4. A scientific summary of their profile.
    5. A 3-step action plan with behavioral fixes.
    6. Ensure the tone is analytical, scientific, and trustworthy.
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              label: { type: Type.STRING },
              efficiency: { type: Type.STRING },
              summary: { type: Type.STRING },
              actionPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ['title', 'description', 'icon']
                }
              }
            },
            required: ['score', 'label', 'efficiency', 'summary', 'actionPlan']
          }
        }
      });

      sendJson(res, 200, JSON.parse(response.text));
      return;
    }

    if (pathname === '/api/hot-sleeper-plan') {
      const { answers, score, severity } = body;
      const prompt = `
    As a sleep optimization expert specializing in thermal regulation, analyze this Hot Sleeper assessment data and provide personalized recommendations.

    User Profile:
    - Hot Sleeper Score: ${score}/100 (${severity})
    - Heat Frequency: ${answers.heatFrequency}
    - Bedroom Temperature: ${answers.roomTemperature}
    - Partner Preferences: ${answers.partnerPreferences}
    - Current Bedding: ${answers.beddingType}
    - Current Solutions: ${answers.currentSolutions}
    - Budget: ${answers.budget}

    Context about cooling products we recommend:
    - Eight Sleep Pod 4 ($2,695): Best for severe hot sleepers - active water cooling, dual-zone, tracks sleep
    - Eight Sleep Pod 5 ($3,295): Latest tech, enhanced AI algorithms
    - ChiliPad Cube ($699): Budget-friendly water-based cooling, works with any mattress
    - Sleep Number Climate Cool ($2,299): Mainstream option with ceramic gel cooling

    Generate:
    1. A 2-3 sentence scientific summary explaining their thermal sleep profile and why they're experiencing heat issues
    2. A 3-step action plan with specific, actionable recommendations tailored to their score and budget

    The tone should be analytical, scientific, and trustworthy. Focus on sleep science and temperature regulation.
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              actionPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ['title', 'description', 'icon']
                }
              }
            },
            required: ['summary', 'actionPlan']
          }
        }
      });

      sendJson(res, 200, JSON.parse(response.text));
      return;
    }

    if (pathname === '/api/cgm-assessment') {
      const { answers, score, label, primaryProduct, productName } = body;
      const prompt = `
    As a metabolic health expert, analyze this CGM Worthiness Quiz assessment and provide personalized recommendations.

    WRITING STYLE RULES (follow strictly):
    - No "testament to", "underscores", "highlights", "showcases"
    - No "Not only X, but Y" constructions
    - No em dashes for dramatic effect
    - Use "is" and "are" instead of "serves as" or "stands as"
    - Be specific, not vague ("eat fewer carbs at dinner" not "optimize your nutrition")
    - Skip the cheerleading ("this could help" not "this exciting opportunity")
    - No generic positive conclusions
    - Write like you're texting a friend who asked for advice

    User Profile:
    - Worthiness Score: ${score}/100 (${label})
    - Primary Goal: ${answers.primaryGoal}
    - Risk Factors: ${answers.riskFactors.join(', ') || 'None'}
    - Diet Approach: ${answers.dietApproach}
    - Data Style Preference: ${answers.dataStyle}
    - Wearable Comfort Level: ${answers.wearableComfort}
    - Budget: ${answers.budget}
    - Timeline/Commitment: ${answers.timeline}

    Top Recommended Product: ${productName || primaryProduct}

    Context about CGM products we recommend:
    - Levels Health ($199/mo): Best for self-directed biohackers and athletes who want detailed glucose insights
    - Nutrisense ($225/mo): Best for those wanting 1:1 dietitian coaching and support
    - Dexcom Stelo ($99/mo): Best for clinical accuracy seekers, FDA-cleared, no prescription needed
    - Signos ($199/mo): Best for weight loss focused users with RD support
    - Abbott Lingo ($49/mo): Best budget entry option with simplified "Lingo count" metric
    - Lumen ($349 one-time): Non-invasive breath analysis alternative for those uncomfortable with sensors

    ${score < 55 ? 'Note: This user scored lower on CGM worthiness. While still recommending products, emphasize that they may get less value from CGM tracking and suggest starting with entry-level options or alternatives.' : ''}

    Generate:
    1. A 2-3 sentence verdict explaining why CGM tracking ${score >= 55 ? 'would benefit them' : 'may be optional for them'} based on their specific profile
    2. A 3-step action plan with specific, actionable recommendations tailored to their goals and timeline
    3. Three specific reasons why ${productName || primaryProduct} fits their needs (whyItFits array)

    The tone should be analytical, scientific, and trustworthy. Focus on metabolic health and personalized recommendations.
    Use these Material Symbols icon names for actionPlan icons: glucose, restaurant, schedule, fitness_center, analytics, science, tips_and_updates
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              verdict: { type: Type.STRING },
              actionPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ['title', 'description', 'icon']
                }
              },
              whyItFits: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['verdict', 'actionPlan', 'whyItFits']
          }
        }
      });

      sendJson(res, 200, JSON.parse(response.text));
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('API error:', error);
    sendJson(res, 500, { error: 'Failed to handle request.' });
  }
};

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const serveStatic = async (res, distPath, pathname) => {
  const filePath = pathname === '/' ? path.join(distPath, 'index.html') : path.join(distPath, pathname);
  try {
    await stat(filePath);
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    const fallbackPath = path.join(distPath, 'index.html');
    try {
      await stat(fallbackPath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      createReadStream(fallbackPath).pipe(res);
    } catch (fallbackError) {
      res.writeHead(404);
      res.end('Not found');
    }
  }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (pathname.startsWith('/api/')) {
    await handleApi(req, res, pathname);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const distPath = path.join(__dirname, '..', 'dist');
    await serveStatic(res, distPath, pathname);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
