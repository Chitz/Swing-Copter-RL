/**
 * Created by ctewani on 5/1/16.
 */

stateActionValue = {};
agent = {
    init: function(){
        //currState = null;
        //console.log("Agent Object Initialized");
        // stateValue dictionary

         action = { 0 : "Do Nothing",
                   1 : "Flip"
                };

        numActions = 2;
        epsilon = 0.07;
        gamma = 0.98;
        alpha = 0.7;
        lambda = 0.01;
        initStateValueAction = 0;
        epsilonPolicy = 0.05;
    },

    agent_start: function(state){
        //console.log(state);
        //console.log(" state Action Value Count " +  JSON.stringify(stateActionValue))
        //console.log("Agent Start " + "init State " + JSON.stringify(state)
        //   + " state Action Value Count " +  Object.keys(stateActionValue).length);
        currState = state;

        // for each episode eligibility trace is 0

        eligibilityTrace = {};


        //currAction = 0;
        var stateActionKey = $.map(currState, function(value, key) { return value });

        stateActionKey = stateActionKey.join("+");
        //stateActionKey = stateActionKey.concat(stateActionKey, currAction)

        //console.log();

        // random action
        if(Math.random() < epsilon){
            currAction = Math.round(Math.random())
        }else{
            // max action, greedy!

            statAction_val_action_0 = statAction_val_action_1 = -Number.MAX_VALUE;

            // avoiding a for loop to improve computation speed.!

            // check for action - 0
            if(stateActionKey.concat("+",0) in stateActionValue){
                statAction_val_action_0 = stateActionValue[stateActionKey.concat("+",0)]
            }else{
                statAction_val_action_0 = stateActionValue[stateActionKey.concat("+",0)]
                    = initStateValueAction
            }

            // check for action -1
            if(stateActionKey.concat("+",1) in stateActionValue){
                statAction_val_action_1 = stateActionValue[stateActionKey.concat("+",1)]
            }else{
                statAction_val_action_1 = stateActionValue[stateActionKey.concat("+",1)]
                    = initStateValueAction
            }

            if(statAction_val_action_0 > statAction_val_action_1)
                currAction = 0;
            else
                currAction = 1;

        }

        //console.log("Next action " + currAction);
        //return an action
        return currAction;
    },

    agent_step: function(nextState, reward, isTerminalState){
        //console.log("Curr State - " + JSON.stringify(currState) + " Action " + JSON.stringify(currAction) +
         //   " Next state - " + JSON.stringify(nextState) + " Reward " + JSON.stringify(reward))

        // if(reward == -1000){
        //    console.log(" lenght of dict " + Object.keys(stateActionValue).length);
        // }
        //console.log("Curr action " + currAction);
        var stateActionKey = $.map(currState, function(value, key) { return value });

        stateActionKey = stateActionKey.join("+");
        //stateActionKey = stateActionKey.concat(stateActionKey, currAction);

        var nextStateActionKey = $.map(nextState, function(value, key) { return value });

        nextStateActionKey = nextStateActionKey.join("+");


        //console.log();

        // random action
        if(Math.random() < epsilon){
            //console.log("Random action")
            nextAction = Math.round(Math.random());
        }else{
            // max action, greedy!

            statAction_val_action_0 = statAction_val_action_1 = -Number.MAX_VALUE;

            // avoiding a for loop to improve computation speed.!
            // check for action - 0
            if(nextStateActionKey.concat("+",0) in stateActionValue){
                statAction_val_action_0 = stateActionValue[nextStateActionKey.concat("+",0)];
            }else{
                statAction_val_action_0 = stateActionValue[nextStateActionKey.concat("+",0)]
                    = initStateValueAction
            }

            // check for action -1
            if(nextStateActionKey.concat("+",1) in stateActionValue){
                statAction_val_action_1 = stateActionValue[nextStateActionKey.concat("+",1)];
            }else{
                statAction_val_action_1 = stateActionValue[nextStateActionKey.concat("+",1)]
                    = initStateValueAction
            }

            if(statAction_val_action_0 > statAction_val_action_1)
                nextAction = 0;
            else
                nextAction = 1;

        }

        summationPolicyStateAction = 0;

        // check for action 0

        if(stateActionValue[nextStateActionKey.concat("+",0)]  > stateActionValue[nextStateActionKey.concat("+",1)])
            prob = 1 - epsilonPolicy + epsilonPolicy/2;
        else
            prob = epsilonPolicy/2;

        summationPolicyStateAction += prob*stateActionValue[nextStateActionKey.concat("+",0)];


        if(stateActionValue[nextStateActionKey.concat("+",1)]  > stateActionValue[nextStateActionKey.concat("+",0)])
            prob = 1 - epsilonPolicy + epsilonPolicy/2;
        else
            prob = epsilonPolicy/2;

        summationPolicyStateAction += prob*stateActionValue[nextStateActionKey.concat("+",1)];


        delta =  reward + gamma*summationPolicyStateAction -
                            stateActionValue[stateActionKey.concat("+",currAction)];


        // accumulating traces E(S,A) -> E(S, A) + 1

        if(!(stateActionKey.concat("+",currAction) in eligibilityTrace))
            eligibilityTrace[stateActionKey.concat("+",currAction)] = 0;


        eligibilityTrace[stateActionKey.concat("+",currAction)] += 1;

        var i = 0;
        keys = Object.keys(stateActionValue);
        //console.log(keys.length);
        for( i = 0; i < keys.length; i++){
            stateValueKey = keys[i];

            stateActionValue[stateValueKey] += alpha*delta*eligibilityTrace[stateValueKey];

            if(parseInt(stateValueKey.charAt(stateValueKey.length - 1))== nextAction){
                eligibilityTrace[stateValueKey] = gamma*lambda*eligibilityTrace[stateValueKey];
            }else{
                eligibilityTrace[stateValueKey] = 0;
            }
        }

        //console.log(stateActionKey.concat("+",currAction) + " " +
        //    stateActionValue[stateActionKey.concat("+",currAction)]);
                //nextStateActionKey = nextStateActionKey.concat(stateActionKey, currAction);


        //console.log("Next action " + currAction);
        currState = nextState;
        currAction = nextAction;
        return currAction;
    }
}
