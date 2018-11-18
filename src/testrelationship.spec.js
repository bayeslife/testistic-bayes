import Bayes from '../index.js'

import { assert } from 'chai'
import { fail } from 'assert'

describe('Given a relationship factory', function () {
  var relationshipFactory = Bayes.TestRelationship

  describe('When an relationship is created with extra metaata', function () {
    it('There meta data is available', function () {
        var r = relationshipFactory.create({ foo: 'bar', QS: 25, QF: 25, PS: 25, PF: 25 })
        assert.ok(r.foo)
    })
  })
  describe('When an invalid relationship is created', function () {
    it('There is an exception thrown', function () {
      try {
        relationshipFactory.create({})
        fail('no exception thrown')
      } catch (e) {
      }
    })
    describe('When a relationship that doesnt add to 100 is created', function () {
      it('There is an exception thrown', function () {
        try {
          relationshipFactory.create({
            QS: 10,
            QF: 10,
            PS: 10,
            PF: 10
          })
          fail('no exception thrown')
        } catch (e) {
        }
      })
    })
  })

  var scenarios = [{
    relationship: {
      QS: 18,
      QF: 2,
      PS: 22,
      PF: 58
    },
    expect: {
      probabilities: {
        pQ: 0.2,
        pP: 0.8,
        pS: 0.4,
        pF: 0.6
      },
      conditionalProbabilities: {
        pQ_S: 0.9,
        pP_S: 0.1,
        pQ_F: 0.275,
        pP_F: 0.725
      },
      aggregates: {
        Q: 20,
        P: 80,
        S: 40,
        F: 60
      },
      intersections: {
        QS: 18,
        PS: 22,
        QF: 2,
        PF: 58
      },
      updates: {
        'S': {
          pQ: 0.45,
          pP: 0.55
        },
        'F': {
          pQ: 0.03,
          pP: 0.96
        }
      }
    }
  }]
  scenarios.forEach((scenario) => {
    describe('When a relationship is created', function () {
      var relationship = relationshipFactory.create(scenario.relationship)
      it(`Then probabilities are correct`, function () {
        var derivedProbabilities = relationship.getProbabilities()
        assert.equal(scenario.expect.probabilities.pQ, derivedProbabilities.pQ)
        assert.equal(scenario.expect.probabilities.pP, derivedProbabilities.pP)
        assert.equal(scenario.expect.probabilities.pS, derivedProbabilities.pS)
        assert.equal(scenario.expect.probabilities.pF, derivedProbabilities.pF)
      })
      it(`Then conditional probabilities are correct`, function () {
        var conditionalProbabilities = relationship.getConditionalProbabilties()
        assert.equal(scenario.expect.conditionalProbabilities.pQ, conditionalProbabilities.pQ)
        assert.equal(scenario.expect.conditionalProbabilities.pP, conditionalProbabilities.pP)
        assert.equal(scenario.expect.conditionalProbabilities.pS, conditionalProbabilities.pS)
        assert.equal(scenario.expect.conditionalProbabilities.pF, conditionalProbabilities.pF)
      })
      it(`Then aggregates are correct`, function () {
        // console.log(relationship.getAggregates())
        var aggregates = relationship.getAggregates()
        assert.equal(scenario.expect.aggregates.Q, aggregates.Q)
        assert.equal(scenario.expect.aggregates.P, aggregates.P)
        assert.equal(scenario.expect.aggregates.S, aggregates.S)
        assert.equal(scenario.expect.aggregates.F, aggregates.F)
      })
      it(`Then intersections are correct`, function () {
        // console.log(relationship.getIntersections())
        var intersections = relationship.getIntersections()
        assert.equal(scenario.expect.intersections.Q, intersections.Q)
        assert.equal(scenario.expect.intersections.P, intersections.P)
        assert.equal(scenario.expect.intersections.S, intersections.S)
        assert.equal(scenario.expect.intersections.F, intersections.F)
      })
      it(`Then updated probabilities given success`, function () {
        var updated = relationship.probabilityGiven({ pQ: 0.2, pP: 0.8 }, { S: true })
        assert.equal(scenario.expect.updates.S.pQ, updated.pQ)
        assert.equal(scenario.expect.updates.S.pP, updated.pP)
      })
      it(`Then updated probabilities given failure`, function () {
        var updated = relationship.probabilityGiven({ pQ: 0.2, pP: 0.8 }, { F: true })
        assert.equal(scenario.expect.updates.F.pQ, updated.pQ)
        assert.equal(scenario.expect.updates.F.pP, updated.pP)
      })
      it(`Then relationship is valid`, function () {
        assert.isTrue(relationship.validate())
      })
    })
  })
})

describe.skip('Given engine for bayes rules', function () {
  var rules = Bayes.Rules
  describe('When the posterior test quality is calculated after a postive test run', function () {
    it(`Then the posterior is calculated correctly`, function () {
      assert.equal(0.72,
        rules.updateTestQualityForPositiveTestRun(
          60 / 100.0 /* prior that its a quality test */,
          60 / 100.0/* probability positive testrun result given quality test, how many positive testruns result when quality test */,
          50 / 100.0/* probability positive test run , how many positive test runs out of all test runs */)
      )
    })
  })
  describe('When the posterior test quality is calculated after a negative test run', function () {
    it(`Then the posterior is calculated correctly`, function () {
      assert.equal(0.3,
        rules.updateTestQualityForNegativeTestRun(
          60 / 100.0 /* prior that its a quality test */,
          25 / 100.0/* probability negative testrun result given quality test, how many negative testruns result when quality test */,
          50 / 100.0/* probability negative test run , how many negative test runs out of all test runs */)
      )
    })
  })

  describe('When the posterior service quality is calculated after a positive test run', function () {
    it(`Then the posterior is calculated correctly`, function () {
      assert.equal(0.12,
        rules.updateTestQualityForPositiveTestRun(
          10 / 100.0 /* prior that its a quality service */,
          60 / 100.0/* probability positive testrun result given quality service, how many positive testruns result when quality service */,
          50 / 100.0/* probability positive test run , how many positive test runs out of all test runs */)
      )
    })
  })
  describe('When the posterior service quality is calculated after a negative test run', function () {
    it(`Then the posterior is calculated correctly`, function () {
      assert.equal(0.06,
        rules.updateTestQualityForNegativeTestRun(
          10 / 100.0 /* prior that its a quality service */,
          30 / 100.0/* probability negative testrun result given quality service, how many negative testruns result when quality service */,
          50 / 100.0/* probability negative test run , how many negative test runs out of all test runs */)
      )
    })
  })
})
