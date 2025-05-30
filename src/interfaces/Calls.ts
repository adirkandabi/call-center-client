import type Tag from "./Tag";

export default interface Call {
  _id: string;
  title: string;
  tag: Tag[];
}
