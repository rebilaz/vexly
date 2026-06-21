import type { ComponentType } from "react";

import type {
  ToolCalculatorConfig,
  ToolType,
} from "@/sanity/lib/outils";

import { MrrYoutubeTool } from "./MrrYoutubeTool";

export type OutilComponentProps = {
  config: ToolCalculatorConfig;
};

/**
 * Associe chaque valeur calculator.toolType de Sanity
 * à un composant React.
 */
export const outilRegistry: Partial<
  Record<ToolType, ComponentType<OutilComponentProps>>
> = {
  "mrr-youtube": MrrYoutubeTool,
};