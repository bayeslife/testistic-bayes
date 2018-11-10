// This module has rules to update probabilities based on bayesrule

import assert from 'assert'

function validate () {
  var prior = {
    Q: this.relationships[0].Q,
    P: this.relationships[0].P
  }
  var exception = this.relationships.find((relationship) => {
    return relationship.Q !== prior.Q || relationship.P !== prior.P
  })
  return exception == null
 }

 function getProbabilities () {
   return this.posterior
 }

 /**
  * Updates the posterior given the new testresult
  * @param {*} testresult : identified by id and with either S(uccess) or F(ail) as true
  */
 function updateGiven (testresult = { id: 1, 'S': true }) {
    var rel = this.relationships.find((r) =>
      r.id === testresult.id)
    this.posterior = rel.probabilityGiven(this.posterior, testresult)
    return this.posterior
 }

export var TestModelState = {
  create: function (relationships) {
    assert(relationships.length > 0, 'There should be at least one relationship')
    var prior = {
      pQ: relationships[0].pQ,
      pP: relationships[0].pP
    }
    var posterior = {
        pQ: prior.pQ,
        pP: prior.pP
    }
    var result = {
        prior,
        relationships,
        posterior,
        validate,
        getProbabilities,
        updateGiven
    }
    assert(result.validate(), 'All relationships should have the same aggregate')
    return result
   }
}
