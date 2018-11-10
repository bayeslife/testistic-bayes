
import { 
    Relationship, 
    updateTestQualityForPositiveTestRun, 
    updateServiceQualityForPositiveTestRun, 
    updateTestQualityForNegativeTestRun, 
    updateServiceQualityForNegativeTestRun 
} from './src/bayesrule.js'


export default {
    Relationship,
    Rules: {
        updateTestQualityForPositiveTestRun,
        updateServiceQualityForPositiveTestRun,
        updateTestQualityForNegativeTestRun,
        updateServiceQualityForNegativeTestRun
    }
}
