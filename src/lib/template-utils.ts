import type { TemplateVariable } from '@/types/template';

const VARIABLE_REGEX = /\{([^}]+)\}/g;

export function extractVariablesFromPrompt(text: string) {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  const detectedVariables = matches.map(match => match[1]);

  const extractedVariables = detectedVariables.map(
    (variable): TemplateVariable => ({
      name: variable,
      description: null,
    })
  );

  return extractedVariables;
}
