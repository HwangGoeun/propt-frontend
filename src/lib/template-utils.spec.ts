import { describe, expect, it } from 'vitest';

import { extractVariablesFromPrompt, getUniqueTitle } from './template-utils';

describe('template-utils', () => {
  describe('extractVariablesFromPrompt', () => {
    it('단일 변수를 추출해야 한다', () => {
      const result = extractVariablesFromPrompt('Hello {name}!');

      expect(result).toEqual([{ name: 'name', description: null }]);
    });

    it('여러 변수를 추출해야 한다', () => {
      const result = extractVariablesFromPrompt('Hello {name}, welcome to {place}!');

      expect(result).toEqual([
        { name: 'name', description: null },
        { name: 'place', description: null },
      ]);
    });

    it('변수가 없으면 빈 배열을 반환해야 한다', () => {
      const result = extractVariablesFromPrompt('Hello world!');

      expect(result).toEqual([]);
    });

    it('중복 변수도 모두 추출해야 한다', () => {
      const result = extractVariablesFromPrompt('{name} said hi to {name}');

      expect(result).toEqual([
        { name: 'name', description: null },
        { name: 'name', description: null },
      ]);
    });

    it('빈 문자열에서 빈 배열을 반환해야 한다', () => {
      const result = extractVariablesFromPrompt('');

      expect(result).toEqual([]);
    });

    it('중첩된 중괄호는 처리하지 않아야 한다', () => {
      const result = extractVariablesFromPrompt('{{nested}}');

      expect(result).toEqual([{ name: '{nested', description: null }]);
    });

    it('공백이 포함된 변수명도 추출해야 한다', () => {
      const result = extractVariablesFromPrompt('{user name}');

      expect(result).toEqual([{ name: 'user name', description: null }]);
    });

    it('여러 줄 텍스트에서 변수를 추출해야 한다', () => {
      const result = extractVariablesFromPrompt('Line 1: {var1}\nLine 2: {var2}');

      expect(result).toEqual([
        { name: 'var1', description: null },
        { name: 'var2', description: null },
      ]);
    });
  });

  describe('getUniqueTitle', () => {
    it('동일한 제목이 없으면 기본 제목을 반환해야 한다', () => {
      const templates = [{ title: 'Other Template' }];

      const result = getUniqueTitle('New Template', templates);

      expect(result).toBe('New Template');
    });

    it('동일한 제목이 있으면 숫자를 붙여야 한다', () => {
      const templates = [{ title: 'New Template' }];

      const result = getUniqueTitle('New Template', templates);

      expect(result).toBe('New Template 1');
    });

    it('숫자가 붙은 제목이 있으면 다음 숫자를 사용해야 한다', () => {
      const templates = [
        { title: 'New Template' },
        { title: 'New Template 1' },
        { title: 'New Template 2' },
      ];

      const result = getUniqueTitle('New Template', templates);

      expect(result).toBe('New Template 3');
    });

    it('중간 숫자가 빠져도 최대 숫자 + 1을 사용해야 한다', () => {
      const templates = [
        { title: 'New Template' },
        { title: 'New Template 5' },
      ];

      const result = getUniqueTitle('New Template', templates);

      expect(result).toBe('New Template 6');
    });

    it('빈 템플릿 배열에서 기본 제목을 반환해야 한다', () => {
      const result = getUniqueTitle('New Template', []);

      expect(result).toBe('New Template');
    });

    it('유사한 제목 패턴을 구분해야 한다', () => {
      const templates = [
        { title: 'Template' },
        { title: 'Template New' },
        { title: 'Template 1' },
      ];

      const result = getUniqueTitle('Template', templates);

      expect(result).toBe('Template 2');
    });

    it('잘못된 숫자 패턴은 무시해야 한다', () => {
      const templates = [
        { title: 'Template' },
        { title: 'Template abc' },
        { title: 'Template 1x' },
      ];

      const result = getUniqueTitle('Template', templates);

      expect(result).toBe('Template 1');
    });
  });
});
