import { 
  mode,
  setPlayWithEngine 
} from "../modules/index.js";

export function checkMode(){
  if (mode === "pwc"){
    setPlayWithEngine(true);
  }
}
