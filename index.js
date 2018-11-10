
import { 
    Relationship, 
    updateTestQualityForPositiveTestRun, 
    updateServiceQualityForPositiveTestRun, 
    updateTestQualityForNegativeTestRun, 
    updateServiceQualityForNegativeTestRun 
} from './src/bayesrelation.js'

import { 
    Population 
} from './src/bayespopulation.js'

export default {
    Relationship,
    Population,
    Rules: {
        updateTestQualityForPositiveTestRun,
        updateServiceQualityForPositiveTestRun,
        updateTestQualityForNegativeTestRun,
        updateServiceQualityForNegativeTestRun
    }
}
