import createClient from 'openapi-fetch'
import type { paths } from "@shared/api/schema.ts"
import { baseUrl } from "@shared/api/apiConfig.ts"

export const client = createClient<paths>(
  {
    baseUrl: `${ baseUrl }`,
    headers: {
      'Content-Type': 'application/json',
    },
  } )