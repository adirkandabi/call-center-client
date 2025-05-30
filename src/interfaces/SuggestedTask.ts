import type Tag from "./Tag";

export default interface SuggestedTask {
  _id: string;
  title: string;
  tags: Tag[];
}
