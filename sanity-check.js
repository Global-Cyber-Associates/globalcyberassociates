
import { calculateScoreFromConfig } from './src/logic/scoringConfig.js';
import { getActiveQuestionnaireConfig } from './src/config/questionnaireSelector.js';
import { defaultQuestionnaireConfig } from './src/config/questionnaireConfig.js';

console.log('Scoring Config Loaded:', !!calculateScoreFromConfig);
console.log('Selector Loaded:', !!getActiveQuestionnaireConfig);
console.log('Default Config Loaded:', !!defaultQuestionnaireConfig);

const config = getActiveQuestionnaireConfig();
console.log('Active Config Steps:', config.steps.length);

const dummyAnswers = { firmType: 'IT' };
const result = calculateScoreFromConfig(dummyAnswers, config);
console.log('Result Calculated:', result.score);
