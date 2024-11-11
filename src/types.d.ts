export interface Task {
  get id(): string;
  get text(): string;
  get completed(): boolean;
}
