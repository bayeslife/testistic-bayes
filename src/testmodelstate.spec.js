import Bayes from '../index.js'

import { assert } from 'chai'
import { fail } from 'assert'

describe('Given some factories', function () {
  var relationshipFactory = Bayes.TestRelationship
  var modelstateFactory = Bayes.TestModelState

  var scenarios = [{
    relationships: [{
      id: 1,
      QS: 18,
      QF: 2,
      PS: 22,
      PF: 58
    }, {
      id: 2,
      QS: 16,
      QF: 4,
      PS: 14,
      PF: 66
    }],
    expect: {
      pQ: 0.2,
      pP: 0.8
    },
    testresult: [{
      id: 1,
      S: true,
      expect: {
        pQ: 0.45,
        pP: 0.55
      }
    }, {
      id: 2,
      S: true,
      expect: {
        pQ: 0.78,
        pP: 0.21
      }
    }]
  }]

  scenarios.forEach((scenario) => {
    describe('When relationships are created', function () {
      var relationships = scenario.relationships.map((r) => relationshipFactory.create(r))
      var modelstate = modelstateFactory.create(relationships)
      it(`Then`, function () {
        var p = modelstate.getProbabilities()
        assert.equal(scenario.expect.pQ, p.pQ)
        assert.equal(scenario.expect.pP, p.pP)

        p = modelstate.updateGiven(scenario.testresult[0])
        assert.equal(scenario.testresult[0].expect.pQ, p.pQ)
        assert.equal(scenario.testresult[0].expect.pP, p.pP)

        p = modelstate.updateGiven(scenario.testresult[1])
        assert.equal(scenario.testresult[1].expect.pQ, p.pQ)
        assert.equal(scenario.testresult[1].expect.pP, p.pP)
      })
    })
  })
})
