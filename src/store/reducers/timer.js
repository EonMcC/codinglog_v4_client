import {ADD_TIMER_TIME} from "../actionTypes";

const addTimerTime = (state=0, action) => {
  switch(action.type){
    case ADD_TIMER_TIME:
      return action.time;
    default:
      return state;
  }
}

export default addTimerTime;