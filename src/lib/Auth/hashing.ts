import * as bcrypt from "bcrypt";

const saltRounds = 10;

export default async function hashString(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(value, salt);
}

export async function compareHash(value: string, hashedValue: string): Promise<boolean> {
  return bcrypt.compare(value, hashedValue);
}
