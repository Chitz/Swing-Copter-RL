/**
 * Created by ctewani on 5/1/16.
 */

agent = {
    init: function(){
        //currState = null;
        console.log("Agent Object Initialized");
        // stateValue dictionary

         action = { 0 : "Do Nothing",
                   1 : "Flip"
                };

        numActions = 2;
        epsilon = 0.1;
        gamma = 0.1;
        alpha = 0.5;
        initStateValueAction = 0;
        stateActionValue = {};
    },

    agent_start: function(state){
        //console.log(state);
        //console.log(" state Action Value Count " +  JSON.stringify(stateActionValue))
        //console.log("Agent Start " + "init State " + JSON.stringify(state)
        //   + " state Action Value Count " +  Object.keys(stateActionValue).length);
        currState = state;
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

        //if(reward == -1000){
        //    console.log("Got reward of -1000");
        //}
        //console.log("Curr action " + currAction);
        var stateActionKey = $.map(currState, function(value, key) { return value });

        stateActionKey = stateActionKey.join("+");
        //stateActionKey = stateActionKey.concat(stateActionKey, currAction);

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
            if(stateActionKey.concat("+",0) in stateActionValue){
                statAction_val_action_0 = stateActionValue[stateActionKey.concat("+",0)];
            }else{
                statAction_val_action_0 = stateActionValue[stateActionKey.concat("+",0)]
                    = initStateValueAction
            }

            // check for action -1
            if(stateActionKey.concat("+",1) in stateActionValue){
                statAction_val_action_1 = stateActionValue[stateActionKey.concat("+",1)];
            }else{
                statAction_val_action_1 = stateActionValue[stateActionKey.concat("+",1)]
                    = initStateValueAction
            }

            if(statAction_val_action_0 > statAction_val_action_1)
                nextAction = 0;
            else
                nextAction = 1;

        }

        //console.log(stateActionKey.concat("+",currAction) + " " +
        //    stateActionValue[stateActionKey.concat("+",currAction)]);
        var nextStateActionKey = $.map(nextState, function(value, key) { return value });

        nextStateActionKey = nextStateActionKey.join("+");
        //nextStateActionKey = nextStateActionKey.concat(stateActionKey, currAction);

        maxNextStateActionValue = -Number.MAX_VALUE;


        if(nextStateActionKey.concat("+",0) in stateActionValue){
                statAction_val_action_0 = stateActionValue[nextStateActionKey.concat("+",0)];
        }else{
            statAction_val_action_0 = stateActionValue[nextStateActionKey.concat("+",0)] =
            initStateValueAction;
        }

        // check for action -1
        if(nextStateActionKey.concat("+",1) in stateActionValue){
            statAction_val_action_1 = stateActionValue[nextStateActionKey.concat("+",1)];
        }else{
            statAction_val_action_1 = stateActionValue[nextStateActionKey.concat("+",1)] =
            initStateValueAction;
        }

        if(statAction_val_action_0 > statAction_val_action_1){
            maxNextStateActionValue = statAction_val_action_0;
        }else{
            maxNextStateActionValue = statAction_val_action_1;
        }

        stateActionValue[stateActionKey.concat("+",currAction)] += alpha * (reward + gamma*maxNextStateActionValue
                                                    - stateActionValue[stateActionKey.concat("+",currAction)]);


        //console.log("Next action " + currAction);
        currState = nextState;
        currAction = nextAction;
        return currAction;
    }
}