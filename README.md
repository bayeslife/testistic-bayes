# Testistic  Bayes

This module is a library to express bayesian logic in the context of measuring the quality of a service through tests and test results.

# Conceptual Overview

A TestRelationship is a bayesian relationship between the quality of a tested service and test results which are used to measure the quality.

For any one service there can be multiple tests which measure the service quality in different ways.
We can update the plausibility of the service quality by considering evidence from multiple tests.  The set of TestRelationships and the current test results will be known as a TestModelState

# Usage

## TestRelationship

This module exports a TestRelationship factory which builds bayesian TestRelationships.

```
import Bayes from 'testistc-bayes'
var relationshipFactory = Bayes.TestRelationship
var relationship = relationshipFactory.create({
      QS: 18,
      QF: 2,
      PS: 22,
      PF: 58
    })
```

The factory create method takes values which express the intersection values between quality and test success.
- QS - represents the expectation of quality and a successful test
- QF - represents the expectation of quality and a failing test
- PS - represents the expectation of poor qualty and a successful test
- PS - represents the expectation of poor quality and a failing test

The TestRelationship data structure represents
```
{ 
    //intersections
    QS: 18, PS: 22, QF: 2,PF: 58,                                                                                            
    
    //aggregations
    Q: 20,P: 80,S: 40,F: 60,                                                                                                 

    //aggregations as probabilities           
    pQ: 0.2, pP: 0.8, pS: 0.4, pF: 0.6

    //conditional probabilities
    pQ_S: 0.45, pP_S: 0.55, pQ_F: 0.033, pP_F: 0.97  
}
```

## TestModelState 

This module exports a TestModelState factory.

```
import Bayes from 'testistc-bayes'
var stateFactory = Bayes.TestModelState
var state = relationshipFactory.create([{
    id: 'TestRelationship1',
      QS: 18,
      QF: 2,
      PS: 22,
      PF: 58
    }])
```

You are then able to ask for the probabilities of service quality

```
var p = state.getProbabilities()
```

As test results become known we ask for this new information to be included in the consideration of probability
```
p = state.updateGiven({ 
    id: 'TestRelationship1',
    S: true
})
```