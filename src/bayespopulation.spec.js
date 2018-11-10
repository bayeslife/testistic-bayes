import Bayes from '../index.js'

import { assert } from 'chai'
import { fail } from 'assert'

describe('Given some factories', function () {
  var relationshipFactory = Bayes.Relationship
  var populationFactory = Bayes.Population

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
        pQ: 0.18,
        pP: 0.22
      }
    }, {
      id: 2,
      S: true,
      expect: {
        pQ: 0.14,
        pP: 0.03
      }
    }]
  }]

  scenarios.forEach((scenario) => {
    describe('When relationships are created', function () {
      var relationships = scenario.relationships.map((r) => relationshipFactory.create(r))
      var population = populationFactory.create(relationships)
      it(`Then`, function () {
        var p = population.getProbabilities()
        assert.equal(scenario.expect.pQ, p.pQ)
        assert.equal(scenario.expect.pP, p.pP)

        p = population.updateGiven(scenario.testresult[0])
        assert.equal(scenario.testresult[0].expect.pQ, p.pQ)
        assert.equal(scenario.testresult[0].expect.pP, p.pP)

        p = population.updateGiven(scenario.testresult[1])
        assert.equal(scenario.testresult[1].expect.pQ, p.pQ)
        assert.equal(scenario.testresult[1].expect.pP, p.pP)
      })
    })
  })
})
