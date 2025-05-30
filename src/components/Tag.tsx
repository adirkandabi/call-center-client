import type TagType from "../interfaces/Tag";

export default function Tag({ _id, title }: TagType) {
  return (
    <div className="tag-item" key={_id}>
      <p>{title}</p>
    </div>
  );
}
