export interface TaskBody {
  get text(): string;
  get completed(): boolean;
}

export interface Identifiable {
  get id(): string;
}

export interface Task extends TaskBody, Identifiable {}
