import Engine from '../index.js'

import { assert } from 'chai'
import { fail } from 'assert'

describe('Given a relationship factory', function () {
  var relationshipFactory = Engine.Relationship

  var scenarios = [{
    relationships: [{
      QS: 18,
      QF: 2,
      PS: 22,
      PF: 58
    }, {
      QS: 16,
      QF: 4,
      PS: 14,
      PF: 66
    }],
    expect: {
      pQ: 0.14,
      pP: 0.03
    }
  }]
  scenarios.forEach((scenario) => {
    describe('When a relationship is created', function () {
      var relationships = scenario.relationships.map((r) => relationshipFactory.create(r))
      it(`Then relationships are created`, function () {
          assert.equal(2, relationships.length)
      })
      describe('And when success is known', function () {
        var prior = {
          pQ: 0.2,
          pP: 0.8
        }
        it(`Then posteriors are correct`, function () {
          var posterior = relationships[0].probabilityGiven(prior, { 'S': true })
          posterior = relationships[1].probabilityGiven(posterior, { 'S': true })
          assert.equal(posterior.pQ, scenario.expect.pQ)
          assert.equal(posterior.pP, scenario.expect.pP)
       })
      })
    })
  })
})
