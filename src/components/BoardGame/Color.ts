export interface Color {
  get name(): string;
}

export class AbstractColor implements Color {
  private readonly colorName: string;

  constructor(name: string) {
    this.colorName = name;
  }

  public get name(): string {
    return this.colorName;
  }
}
