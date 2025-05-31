export default interface CallTask {
  _id: string;
  title: string;
  callId: string;
  status: "Open" | "In Progress" | "Completed";
  isSuggested: boolean;
  suggestedTaskId: string | null;
}
