# OpenAI-Style Markdown Enhancement Plan

## Current Status ✅
- Next.js + TypeScript ✅
- Tailwind CSS ✅  
- shadcn/ui with "new-york" style ✅
- Stone color palette ✅
- Dark mode support ✅

## Missing Components (OpenAI Standard)

### 1. Typography Plugin
```bash
npm install @tailwindcss/typography
```

### 2. ReactMarkdown Plugins
```bash
npm install remark-gfm rehype-highlight
```

### 3. Updated Message Component
```jsx
// Enhanced message.tsx with OpenAI-style prose
<div className="prose prose-stone dark:prose-invert max-w-none">
  <ReactMarkdown 
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
  >
    {message.content[0].text as string}
  </ReactMarkdown>
</div>
```

## Visual Impact
- Headers with proper hierarchy
- Styled lists and tables  
- Code syntax highlighting
- Beautiful blockquotes
- Professional typography
- Perfect dark mode

## Implementation Order
1. Install typography plugin
2. Update Tailwind config
3. Enhance message component
4. Test with NWSL data responses
5. Fine-tune styling if needed

This keeps you 100% aligned with OpenAI's design philosophy while dramatically improving markdown rendering.