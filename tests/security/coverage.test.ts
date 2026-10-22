// Every table the API serves must be in TABLES, so firms-apart.test.ts tests it.
// A new table without its cross-firm cases fails here.
import { expect, it } from "vitest";
import { secretKey, TABLES, url } from "./seed";

it("every table the API serves has cross-firm tests", async () => {
  // New-style secret keys go in the apikey header only; legacy JWT keys also need Authorization.
  const headers: Record<string, string> = { apikey: secretKey };
  if (!secretKey.startsWith("sb_")) headers.Authorization = `Bearer ${secretKey}`;
  const response = await fetch(`${url}/rest/v1/`, { headers });
  expect(response.ok).toBe(true);
  const spec = (await response.json()) as { definitions?: Record<string, unknown> };
  expect(Object.keys(spec.definitions ?? {}).sort()).toEqual([...TABLES].sort());
});
