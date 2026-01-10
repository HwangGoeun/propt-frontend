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

export function getUniqueTitle(baseTitle: string, templates: { title: string }[]): string {
  const hasBaseTitle = templates.some((t) => t.title === baseTitle);

  if (hasBaseTitle) {
    const maxNumber = templates.reduce((max, t) => {
      if (t.title.startsWith(`${baseTitle} `)) {
        const match = t.title.match(new RegExp(`^${baseTitle} (\\d+)$`));
        if (match) {
          const num = parseInt(match[1], 10);

          return num > max ? num : max;
        }
      }
      return max;
    }, 0);

    return `${baseTitle} ${maxNumber + 1}`;
  }

  return baseTitle;
}
