/** Fills `{name}` placeholders of a content string: `format('{a} banner', { a: 'X' })`. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}

export type TemplatePart = { text: string } | { token: string }

/**
 * Splits a content string at `{token}` placeholders so components can put markup (a link, an
 * icon) at the token positions: `splitTemplate('a {b} c')` -> text 'a ', token 'b', text ' c'.
 */
export function splitTemplate(template: string): TemplatePart[] {
  const parts: TemplatePart[] = []
  let last = 0
  for (const match of template.matchAll(/\{(\w+)\}/g)) {
    if (match.index > last) parts.push({ text: template.slice(last, match.index) })
    parts.push({ token: match[1] })
    last = match.index + match[0].length
  }
  if (last < template.length) parts.push({ text: template.slice(last) })
  return parts
}
