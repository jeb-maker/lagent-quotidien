export const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getValue(obj, path) {
  const parts = path.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function render(template, ctx) {
  template = template.replace(
    /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (m, cond, body) => {
      const v = getValue(ctx, cond.trim());
      return v ? render(body, ctx) : '';
    }
  );

  template = template.replace(
    /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (m, name, body) => {
      const arr = getValue(ctx, name.trim());
      if (!Array.isArray(arr)) return '';
      return arr.map(item => {
        const itemCtx = (typeof item === 'object' && item !== null)
          ? { ...ctx, ...item, this: item }
          : { ...ctx, this: item };
        return render(body, itemCtx);
      }).join('');
    }
  );

  template = template.replace(/\{\{\{([^}]+)\}\}\}/g, (m, name) => {
    const v = getValue(ctx, name.trim());
    return v === null || v === undefined ? '' : String(v);
  });

  template = template.replace(/\{\{([^}#/][^}]*)\}\}/g, (m, name) => {
    const v = getValue(ctx, name.trim());
    return escapeHtml(v);
  });

  return template;
}

export const xmlEscape = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
