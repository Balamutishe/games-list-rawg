import type { SchemaGame } from "@shared/api/schema.ts";

export type SchemaGamesList = SchemaGame[];
export type SchemaGamePlatforms = {
  platform: {
    id?: number;
    slug?: string;
    name?: string;
  };
  released_at?: string;
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}[];

export type ResponseGamesList = {
  count: number,
  next: string,
  previous: string,
  results: SchemaGamesList | []
}