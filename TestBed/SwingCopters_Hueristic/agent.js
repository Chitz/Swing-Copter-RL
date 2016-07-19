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
        epsilon = 0.1;
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
        // if distance from left hammer is negative, if flying left, then flip else stay
        if(currState.distanceFromLeftHammer < 0 && currState.movement == "Left")
            currAction = 1;
        else if(currState.distanceFromLeftHammer < 0 && currState.movement == "Right")
            currAction = 0;
        else if(currState.distanceFromRightHammer < 0 && currState.movement == "Right")
            currAction = 1;
        else if(currState.distanceFromRightHammer < 0 && currState.movement == "Left")
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) > Math.abs(currState.distanceFromLeftHammer &&
            currState.movement == "Left"))
            currAction = 1;
        else if(Math.abs(currState.distanceFromLeftHammer) > Math.abs(currState.distanceFromLeftHammer &&
            currState.movement == "Right"))
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) < Math.abs(currState.distanceFromLeftHammer &&
            currState.movement == "Right"))
            currAction = 1;
        else if(Math.abs(currState.distanceFromLeftHammer) < Math.abs(currState.distanceFromLeftHammer &&
            currState.movement == "Left"))
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) == Math.abs(currState.distanceFromLeftHammer))
            currAction = 0;


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
        // if distance from left hammer is negative, if flying left, then flip else stay
        currState = nextState;

        if(currState.distanceFromLeftHammer < 0 && currState.movement == "Left")
            currAction = 1;
        else if(currState.distanceFromLeftHammer < 0 && currState.movement == "Right")
            currAction = 1;
        else if(currState.distanceFromRightHammer < 0 && currState.movement == "Right")
            currAction = 0;
        else if(currState.distanceFromRightHammer < 0 && currState.movement == "Left")
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) > Math.abs(currState.distanceFromRightHammer &&
            currState.movement == "Left"))
            currAction = 1;
        else if(Math.abs(currState.distanceFromLeftHammer) > Math.abs(currState.distanceFromRightHammer &&
            currState.movement == "Right"))
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) < Math.abs(currState.distanceFromRightHammer &&
            currState.movement == "Right"))
            currAction = 1;
        else if(Math.abs(currState.distanceFromLeftHammer) < Math.abs(currState.distanceFromRightHammer &&
            currState.movement == "Left"))
            currAction = 0;
        else if(Math.abs(currState.distanceFromLeftHammer) == Math.abs(currState.distanceFromRightHammer))
            currAction = 0;

        //console.log("Next action " + currAction);
        return currAction;
    }
}
