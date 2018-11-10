# Testistic  Bayes

This module is a library to express bayesian logic

# Usage

This module exports a Relationship factory which builds bayesian Relationships.

```
import Bayes from 'testistc-bayes'
var relationshipFactory = Bayes.Relationship
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

The Relationship data structure represents
```
{ 
    //intersections
    QS: 18, PS: 22, QF: 2,PF: 58,                                                                                            
    
    //aggregations
    Q: 20,P: 80,S: 40,F: 60,                                                                                                 

    //aggregations as probabilities           
    pQ: 0.2, pP: 0.8, pS: 0.4, pF: 0.6,                                                                                          
    //conditional probabilities                                                                                             
    pQ_S: 0.45, pP_S: 0.55, pQ_F: 0.033, pP_F: 0.97  
}
```