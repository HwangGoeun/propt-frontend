export const PRESET_OPTIONS = [
  { value: 'markdown', label: '마크다운' },
  { value: 'json', label: 'JSON' },
  { value: 'table', label: '표' },
  { value: 'bullet_list', label: '리스트' },
  { value: 'csv', label: 'CSV' },
  { value: 'html', label: 'HTML' },
] as const;

export const PRESET_VALUES = PRESET_OPTIONS.map((opt) => opt.value);

export function getOutputTypeInstruction(
  outputType: string | null | undefined,
): string {
  if (!outputType) {
    return '';
  }

  const presetInstructions: Record<string, string> = {
    markdown: '응답을 마크다운 형식으로 작성해주세요.',
    json: '응답을 JSON 형식으로 작성해주세요.',
    table: '응답을 마크다운 표 형식으로 작성해주세요.',
    bullet_list: '응답을 불릿 리스트 형식으로 작성해주세요.',
  };

  if (outputType in presetInstructions) {
    return presetInstructions[outputType];
  }

  return `응답을 ${outputType} 형식으로 작성해주세요.`;
}

export function getOutputTypeLabel(outputType: string): string {
  const preset = PRESET_OPTIONS.find((opt) => opt.value === outputType);
  return preset?.label ?? outputType;
}
