import { describe, expect, it } from 'vitest';

import {
  getOutputTypeInstruction,
  getOutputTypeLabel,
  PRESET_OPTIONS,
  PRESET_VALUES,
} from './output-type-utils';

describe('output-type-utils', () => {
  describe('PRESET_OPTIONS', () => {
    it('6개의 프리셋 옵션이 있어야 한다', () => {
      expect(PRESET_OPTIONS).toHaveLength(6);
    });

    it('각 옵션이 value와 label을 가져야 한다', () => {
      PRESET_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
      });
    });

    it('markdown 옵션이 있어야 한다', () => {
      const markdown = PRESET_OPTIONS.find((opt) => opt.value === 'markdown');
      expect(markdown).toBeDefined();
      expect(markdown?.label).toBe('마크다운');
    });

    it('json 옵션이 있어야 한다', () => {
      const json = PRESET_OPTIONS.find((opt) => opt.value === 'json');
      expect(json).toBeDefined();
      expect(json?.label).toBe('JSON');
    });
  });

  describe('PRESET_VALUES', () => {
    it('모든 프리셋 값을 포함해야 한다', () => {
      expect(PRESET_VALUES).toContain('markdown');
      expect(PRESET_VALUES).toContain('json');
      expect(PRESET_VALUES).toContain('table');
      expect(PRESET_VALUES).toContain('bullet_list');
      expect(PRESET_VALUES).toContain('csv');
      expect(PRESET_VALUES).toContain('html');
    });

    it('6개의 값이 있어야 한다', () => {
      expect(PRESET_VALUES).toHaveLength(6);
    });
  });

  describe('getOutputTypeInstruction', () => {
    it('null일 때 빈 문자열을 반환해야 한다', () => {
      expect(getOutputTypeInstruction(null)).toBe('');
    });

    it('undefined일 때 빈 문자열을 반환해야 한다', () => {
      expect(getOutputTypeInstruction(undefined)).toBe('');
    });

    it('빈 문자열일 때 빈 문자열을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('')).toBe('');
    });

    it('markdown에 대한 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('markdown')).toBe(
        '응답을 마크다운 형식으로 작성해주세요.',
      );
    });

    it('json에 대한 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('json')).toBe(
        '응답을 JSON 형식으로 작성해주세요.',
      );
    });

    it('table에 대한 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('table')).toBe(
        '응답을 마크다운 표 형식으로 작성해주세요.',
      );
    });

    it('bullet_list에 대한 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('bullet_list')).toBe(
        '응답을 불릿 리스트 형식으로 작성해주세요.',
      );
    });

    it('프리셋이 아닌 값에 대한 기본 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('csv')).toBe(
        '응답을 csv 형식으로 작성해주세요.',
      );
    });

    it('사용자 정의 값에 대한 지시문을 반환해야 한다', () => {
      expect(getOutputTypeInstruction('custom-format')).toBe(
        '응답을 custom-format 형식으로 작성해주세요.',
      );
    });
  });

  describe('getOutputTypeLabel', () => {
    it('markdown의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('markdown')).toBe('마크다운');
    });

    it('json의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('json')).toBe('JSON');
    });

    it('table의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('table')).toBe('표');
    });

    it('bullet_list의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('bullet_list')).toBe('리스트');
    });

    it('csv의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('csv')).toBe('CSV');
    });

    it('html의 라벨을 반환해야 한다', () => {
      expect(getOutputTypeLabel('html')).toBe('HTML');
    });

    it('프리셋에 없는 값은 그대로 반환해야 한다', () => {
      expect(getOutputTypeLabel('custom-type')).toBe('custom-type');
    });
  });
});
