import ActionRepository from "./ActionRepository";
import Introduce from "../../../../native-bundle/src/actions/control/Introduce";
import Heartbeat from "../../../../native-bundle/src/actions/control/Heartbeat";
import Move from "../../../../native-bundle/src/actions/player/Move";

const actionRegistry = new ActionRepository();

actionRegistry.register(Introduce);
actionRegistry.register(Heartbeat);

actionRegistry.register(Move);

export default actionRegistry;