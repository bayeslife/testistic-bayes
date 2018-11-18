// This module has rules to update probabilities based on bayesrule

import assert from 'assert'

function updateTestQualityForPositiveTestRun (
  pQ /* prior estimate that test is quality test */,
  pS_Q /* probability of positive testrun given a quality test */,
  pS /* probability of a positive testrun given a quality or not quality test */
 ) {
  return pQ * pS_Q / pS
}

function updateTestQualityForNegativeTestRun (
  pQ/* prior estimate that test is quality test */,
  pF_Q/* probablity of negative testrun given a quality test */,
  pF/* probability of a negative testrun given a quality or not quality test */
) {
  return pQ * pF_Q / pF
}

function updateServiceQualityForPositiveTestRun (
  pQ/* prior estimate that service is quality service */,
  pS_Q/* probablity of positive testrun given a quality service */,
  pS/* probability of a positive testrun given a quality or not quality service */
) {
  return pQ * pS_Q / pS
}

function updateServiceQualityForNegativeTestRun (
  pQ/* prior estimate that test is quality service */,
  pS_Q/* probablity of negative testrun given a quality service */,
  pd/* probability of a negative testrun given a quality or not quality service */
) {
  return pQ * pS_Q / pd
}

function validate () {
  return (this.QS + this.QF + this.PS + this.PF) === 100
 }

 function getAggregates () {
  return {
    Q: this.Q,
    P: this.P,
    F: this.F,
    S: this.S
  }
 }

 function getProbabilities () {
  return {
    pQ: this.pQ,
    pP: this.pP,
    pS: this.pS,
    pF: this.pF
  }
 }

 function getConditionalProbabilties () {
  return {
    pQ_S: this.pQ_S,
    pP_S: this.pP_S,
    pQ_F: this.pQ_F,
    pP_F: this.pP_F
  }
 }

 function getIntersections () {
  return {
    QS: this.QS,
    PS: this.PS,
    QF: this.QF,
    PF: this.PF
  }
 }

 function getIntersectionProbabilities () {
  return {
    pQS: this.pQS,
    pPS: this.pPS,
    pQF: this.pQF,
    pPF: this.pPF
  }
 }

 function probabilityGiven (prior, evidence) {
  assert(prior.pQ, 'No prior probablity of Quality defined')
  assert(prior.pP, 'No prior probablity of Poor quality defined')
  var pQ, pP
  if (evidence.S) {
    // console.log(`Prior: ${prior.pQ}, QS:${this.QS}, Q:${this.Q}`)
    pQ = prior.pQ * this.QS / this.Q
    pP = prior.pP * this.PS / this.P
    return {
      Q: Math.floor(100 * pQ / (pQ + pP)),
      P: Math.floor(100 * pP / (pQ + pP)),
      pQ: Math.floor(100 * pQ / (pQ + pP)) / 100,
      pP: Math.floor(100 * pP / (pQ + pP)) / 100,
      workings: {
        prior: {
          pQ: prior.pQ,
          pP: prior.pP
        },
        likelihood: {
          QS: this.QS,
          Q: this.Q,
          PS: this.PS,
          P: this.P,
          lQ: this.QS / this.Q,
          lP: this.PS / this.P
        },
        posterior: {
          pQ: Math.floor(100 * pQ) / 100,
          pP: Math.floor(100 * pP) / 100
        }
      }
    }
  } else {
    // console.log(`Prior: ${prior.pQ}, QF:${this.QF}, Q:${this.Q}`)
    pQ = Math.floor(100 * prior.pQ * this.QF / this.Q) / 100
    pP = Math.floor(100 * prior.pP * this.PF / this.P) / 100
    return {
      Q: Math.floor(100 * pQ / (pQ + pP)),
      P: Math.floor(100 * pP / (pQ + pP)),
      pQ: Math.floor(100 * pQ / (pQ + pP)) / 100,
      pP: Math.floor(100 * pP / (pQ + pP)) / 100,
      workings: {
        prior: {
          pQ: prior.pQ,
          pP: prior.pP
        },
        likelihood: {
          QF: this.QF,
          Q: this.Q,
          PF: this.PF,
          P: this.P,
          lQ: this.QF / this.Q,
          lP: this.PF / this.P
        },
        posterior: {
          pQ: Math.floor(100 * pQ) / 100,
          pP: Math.floor(100 * pP) / 100
        }
      }
    }
  }
}

export var TestRelationship = {
  create: function (relationship) {
     function reset () {
      var QS = relationship.QS
      var PS = relationship.PS
      var QF = relationship.QF
      var PF = relationship.PF
      var result = Object.assign({
        Q: QS + QF,
        P: PS + PF,
        S: QS + PS,
        F: QF + PF,
        pQ: (QS + QF) / 100,
        pP: (PS + PF) / 100,
        pS: (QS + PS) / 100,
        pF: (QF + PF) / 100,
        pQ_S: QS / (QS + PS),
        pP_S: PS / (QS + PS),
        pQ_F: QF / (QF + PF),
        pP_F: PF / (QF + PF),
        pQS: QS / 100,
        pQF: QF / 100,
        pPS: PS / 100,
        pPF: PF / 100
        }, relationship)
      return result
     }

     var init = reset()

     var result = Object.assign(init, {
      validate,
      getAggregates,
      getProbabilities,
      getConditionalProbabilties,
      getIntersections,
      getIntersectionProbabilities,
      probabilityGiven,
      reset
     })

    //  var result = {
      //  id,
      //  QS,
      //  PS,
      //  QF,
      //  PF,
      // }
      assert(result.validate(), 'Bayesian relationship is not valid as intersections dont sum to 100')
     return result
   }
}
