
import { defaultQuestionnaireConfig } from './questionnaireConfig';
import { questionnaire2Config } from './questionnaire2Config';
import { questionnaire3Config } from './questionnaire3Config';

/**
 * Questionnaire Selector
 * 
 * Change the ACTIVE_QUESTIONNAIRE constant to switch between different questionnaire sets:
 * - 'default': Original 5-step questionnaire (Infrastructure, Data Handling, Operations, Compliance)
 * - 'questionnaire2': Detailed 5-category assessment (Digital Dependency, Data Value, Exposure Surface, Governance, Recovery)
 * - 'questionnaire3': User-friendly "Check" format (Pulse, Target, Wallet, Culture, Recovery)
 */

// 🔧 CHANGE THIS TO SWITCH QUESTIONNAIRES
export const ACTIVE_QUESTIONNAIRE = 'questionnaire3';

/**
 * Get the active questionnaire configuration
 */
export function getActiveQuestionnaireConfig() {
    switch (ACTIVE_QUESTIONNAIRE) {
        case 'questionnaire2':
            return questionnaire2Config;
        case 'questionnaire3':
            return questionnaire3Config;
        case 'default':
        default:
            return defaultQuestionnaireConfig;
    }
}

/**
 * Get all available questionnaire configurations
 */
export function getAllQuestionnaireConfigs() {
    return {
        default: defaultQuestionnaireConfig,
        questionnaire2: questionnaire2Config,
        questionnaire3: questionnaire3Config
    };
}

/**
 * Get questionnaire metadata
 */
export function getQuestionnaireMetadata(variant) {
    const metadata = {
        default: {
            name: 'Original Assessment',
            description: 'Comprehensive 5-step assessment covering infrastructure, data, operations, and compliance',
            steps: 5,
            questions: 23
        },
        questionnaire2: {
            name: 'Detailed Security Assessment',
            description: 'In-depth evaluation of digital dependency, data value, exposure surface, governance, and recovery',
            steps: 5,
            questions: 25
        },
        questionnaire3: {
            name: 'Business-Friendly Assessment',
            description: 'Simplified assessment using practical "check" metaphors (Pulse, Target, Wallet, Culture, Recovery)',
            steps: 5,
            questions: 25
        }
    };

    return metadata[variant];
}
