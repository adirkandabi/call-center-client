import type CallTask from "./CallTask";
import type SuggestedTask from "./SuggestedTask";
import type Tag from "./Tag";

export default interface Call {
  _id: string;
  title: string;
  tags: Tag[];
  suggestedTasks: SuggestedTask[];
  callTasks: CallTask[];
}
