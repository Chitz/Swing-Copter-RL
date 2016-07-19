/**
 * Created by ctewani on 5/1/16.
 */

stateActionValue = {};

agent = {
    init: function(){
        //currState = null;
        // console.log("Agent Object Initialized");
        // stateValue dictionary

         action = { 0 : "Do Nothing",
                   1 : "Flip"
                };

        numActions = 2;
        epsilon = 0.5;
      gamma = 1;
      alpha = 0.5;
        initStateValueAction = 0;
    },

    agent_start: function(state){
        //console.log(state);
        //console.log(" state Action Value Count " +  JSON.stringify(stateActionValue))
        //console.log("Agent Start " + "init State " + JSON.stringify(state)
        //   + " state Action Value Count " +  Object.keys(stateActionValue).length);
        currState = state;
        //currAction = 0;
        //var stateActionKey = $.map(currState, function(value, key) { return value });

        //stateActionKey = stateActionKey.join("+");
        //stateActionKey = stateActionKey.concat(stateActionKey, currAction)

        //console.log();

        // random action
        if(Math.random() < epsilon){
            currAction = 0;
        }else{
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
        // var stateActionKey = $.map(currState, function(value, key) { return value });
        //
        // stateActionKey = stateActionKey.join("+");
        // //stateActionKey = stateActionKey.concat(stateActionKey, currAction);

        //console.log();

        // random action
       if(Math.random() < epsilon){
            nextAction = 0;
        }else{
            nextAction = 1;

        }

        //console.log("Next action " + currAction);
        currState = nextState;
        currAction = nextAction;
        return currAction;
    }
}
