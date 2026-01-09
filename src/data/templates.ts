import type { Template } from '@/types/template';

export const basicTemplates: Template[] = [
  {
    title: '과제 평가',
    description: '과제를 평가하고 피드백을 제공합니다.',
    content: '{학생}의 과제를 평가해주세요:\n\n{과제 내용}',
    variables: [
      { name: '학생', description: '과제를 평가 받을 학생' },
      { name: '과제 내용', description: '평가할 과제의 내용' },
    ],
  },
  {
    title: '요약하기',
    description: '긴 텍스트를 요약합니다.',
    content: '다음 텍스트를 요약해주세요:\n\n{텍스트}',
    variables: [
      { name: '텍스트', description: '요약할 텍스트' },
    ],
  },
  {
    title: '번역하기',
    description: '텍스트를 번역합니다.',
    content: '{텍스트}를 {언어}로 번역해주세요:',
    variables: [
      { name: '텍스트', description: '번역할 텍스트' },
      { name: '언어', description: '번역할 언어' }
    ],
  },
  {
    title: '계산하기',
    description: '수식을 계산합니다.',
    content: '다음 수식을 계산해주세요:\n\n{수식}',
    variables: [
      { name: '수식', description: '계산할 수식' },
    ],
  },
];
