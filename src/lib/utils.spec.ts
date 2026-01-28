import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('단일 클래스를 반환해야 한다', () => {
      expect(cn('text-red-500')).toBe('text-red-500');
    });

    it('여러 클래스를 병합해야 한다', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
    });

    it('조건부 클래스를 처리해야 한다', () => {
      const isTrue = true;
      const isFalse = false;
      expect(cn('base-class', isTrue && 'conditional-class')).toBe(
        'base-class conditional-class',
      );
      expect(cn('base-class', isFalse && 'conditional-class')).toBe('base-class');
    });

    it('중복된 Tailwind 클래스를 병합해야 한다', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('빈 입력을 처리해야 한다', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
    });

    it('undefined와 null을 무시해야 한다', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
    });

    it('배열 입력을 처리해야 한다', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });

    it('객체 입력을 처리해야 한다', () => {
      expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe(
        'class1 class3',
      );
    });

    it('복잡한 Tailwind 클래스 충돌을 해결해야 한다', () => {
      expect(cn('px-4', 'py-2', 'px-8')).toBe('py-2 px-8');
      expect(cn('m-2', 'mx-4')).toBe('m-2 mx-4');
    });
  });
});
