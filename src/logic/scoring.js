
export function calculateScore(data) {
    const isIT = data.firmType === 'IT';

    // 1. Infrastructure Exposure (0-100)
    let infrastructureScore = 0;
    if (data.usesEmail) infrastructureScore += 10;
    if (data.hasWebsiteOrApp) infrastructureScore += 20;
    if (data.usesCloudServices) infrastructureScore += 20;
    if (data.hasOnPremiseServers) infrastructureScore += 15;
    if (data.hasPublicFacingSystems) infrastructureScore += 25;
    if (data.hasThirdPartyIntegrations) infrastructureScore += 10;

    // 2. Data Sensitivity (0-100)
    let dataSensitivityScore = 0;
    if (data.collectsCustomerData) dataSensitivityScore += 15;
    if (data.handlesFinancialData) dataSensitivityScore += 30;
    if (data.storesEmployeeData) dataSensitivityScore += 10;
    if (data.hasProprietaryData) dataSensitivityScore += 20;
    if (data.handlesHealthData) dataSensitivityScore += 20;
    if (data.retainsDataLongTerm) dataSensitivityScore += 5;

    // 3. Operational Dependency (0-100)
    let operationalScore = 0;
    if (data.acceptsDigitalPayments) operationalScore += 20;
    if (data.hasRemoteWork) operationalScore += 15;
    if (data.criticalUptime) operationalScore += 25;
    if (data.revenueDependent) operationalScore += 25;
    if (data.hasCustomerFacingSystems) operationalScore += 10;
    if (data.hasSupplyChainIntegration) operationalScore += 5;

    // 4. Compliance & Risk (0-100)
    let complianceScore = 0;
    if (data.hasRegulatoryCompliance) complianceScore += 40;
    if (data.hasIndustryRegulations) complianceScore += 30;
    if (data.hadPreviousIncidents) complianceScore += 20;
    if (!data.hasCyberInsurance) complianceScore += 5; // Lack of insurance is a risk
    if (!data.providesSecurityTraining) complianceScore += 5; // Lack of training is a risk

    // Calculate Weighted Score based on firm type
    let finalScore = 0;
    if (isIT) {
        finalScore += infrastructureScore * 0.30;
        finalScore += dataSensitivityScore * 0.25;
        finalScore += operationalScore * 0.25;
        finalScore += complianceScore * 0.20;
    } else {
        finalScore += infrastructureScore * 0.20;
        finalScore += dataSensitivityScore * 0.30;
        finalScore += operationalScore * 0.30;
        finalScore += complianceScore * 0.20;
    }

    finalScore = Math.min(100, Math.round(finalScore));

    // Determine Risk Level
    let riskLevel = 'Low';
    if (finalScore > 70) {
        riskLevel = 'High';
    } else if (finalScore > 35) {
        riskLevel = 'Medium';
    }

    // Generate Recommendations
    const recommendations = [];

    if (riskLevel === 'High') {
        recommendations.push({
            service: 'VAPT (Vulnerability Assessment)',
            description: 'Comprehensive testing of your exposed assets.',
            priority: 'Critical'
        });
        recommendations.push({
            service: '24/7 SOC Monitoring',
            description: 'Real-time threat detection and response.',
            priority: 'Recommended'
        });
    } else if (riskLevel === 'Medium') {
        recommendations.push({
            service: 'Security Posture Assessment',
            description: 'Identify vulnerabilities and security gaps.',
            priority: 'Critical'
        });
        recommendations.push({
            service: 'Endpoint Protection',
            description: 'Antivirus and firewall for all devices.',
            priority: 'Recommended'
        });
    } else {
        recommendations.push({
            service: 'Employee Security Training',
            description: 'Phishing awareness and safe practices.',
            priority: 'Recommended'
        });
    }

    // Specific triggers
    if (data.hasRegulatoryCompliance || data.hasIndustryRegulations) {
        recommendations.push({
            service: 'Compliance Audit',
            description: 'Ensure adherence to required standards (ISO, GDPR, HIPAA, etc.).',
            priority: 'Critical'
        });
    }

    if (data.handlesFinancialData || data.handlesHealthData) {
        recommendations.push({
            service: 'Data Protection Impact Assessment',
            description: 'Evaluate risks to sensitive data.',
            priority: 'Recommended'
        });
    }

    if (data.hadPreviousIncidents) {
        recommendations.push({
            service: 'Incident Response Planning',
            description: 'Prepare for and prevent future security incidents.',
            priority: 'Critical'
        });
    }

    if (!data.hasCyberInsurance && riskLevel !== 'Low') {
        recommendations.push({
            service: 'Cyber Insurance Consultation',
            description: 'Protect your business from financial losses.',
            priority: 'Optional'
        });
    }

    return {
        score: finalScore,
        riskLevel,
        recommendations,
        breakdown: {
            exposure: infrastructureScore,
            dataSensitivity: dataSensitivityScore,
            regulatory: complianceScore,
            operational: operationalScore
        }
    };
}
