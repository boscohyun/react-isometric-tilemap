import type { Config } from "https://deno.land/x/aleph/types.d.ts";

export default <Config> {
  basePath: Deno.env.get("BASE_PATH") ?? "/",
  framework: "react",
  ssr: false,
};
