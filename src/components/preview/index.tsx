import { PreviewCard } from '@/components/preview/preview-card';

export function PreviewPanel() {
  return (
    <aside className="w-full border-t md:border-t-0 md:w-[400px] md:border-l bg-muted/10 p-4 md:p-6 flex flex-col md:overflow-y-auto shrink-0">
      <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">미리보기</h2>
      <PreviewCard />
    </aside>
  );
}
