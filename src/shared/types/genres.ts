import type { SchemaGenre } from "@shared/api/schema.ts";

export type SchemaGenresList = SchemaGenre[];
export type ResponseGenresList = {
  count: number,
  next: string,
  previous: string,
  results: SchemaGenresList | []
}