/** Minimal multi-page PDF from plain text (WinAnsi / Helvetica). */

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 48;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 56;
const FONT_SIZE = 10;
const LINE_HEIGHT = 14;
const MAX_CHARS = 92;

function escapePdfLiteral(text: string): string {
  let out = '';
  for (const char of text) {
    const code = char.codePointAt(0) ?? 63;
    if (char === '\\' || char === '(' || char === ')') {
      out += `\\${char}`;
    } else if (code >= 32 && code <= 126) {
      out += char;
    } else if (code <= 255) {
      out += `\\${code.toString(8).padStart(3, '0')}`;
    } else {
      out += '?';
    }
  }
  return out;
}

function wrapLine(line: string): string[] {
  if (line.length <= MAX_CHARS) {
    return [line.length === 0 ? ' ' : line];
  }

  const chunks: string[] = [];
  let remaining = line;
  while (remaining.length > MAX_CHARS) {
    let breakAt = remaining.lastIndexOf(' ', MAX_CHARS);
    if (breakAt < MAX_CHARS / 2) {
      breakAt = MAX_CHARS;
    }
    chunks.push(remaining.slice(0, breakAt));
    remaining = remaining.slice(breakAt).trimStart();
  }
  if (remaining.length > 0) {
    chunks.push(remaining);
  }
  return chunks;
}

function buildPageContent(lines: string[]): string {
  const commands = [
    'BT',
    `/F1 ${FONT_SIZE} Tf`,
    `${MARGIN_X} ${PAGE_HEIGHT - MARGIN_TOP} Td`,
    `${LINE_HEIGHT} TL`,
  ];

  for (const line of lines) {
    commands.push(`(${escapePdfLiteral(line)}) Tj`);
    commands.push('T*');
  }

  commands.push('ET');
  return commands.join('\n');
}

function linesPerPage(): number {
  const usable = PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
  return Math.max(1, Math.floor(usable / LINE_HEIGHT));
}

/**
 * Builds a downloadable PDF blob from plain text (UTF-16 → WinAnsi where possible).
 */
export function buildSimpleTextPdf(text: string): Blob {
  const wrapped = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .flatMap((line) => wrapLine(line));

  const capacity = linesPerPage();
  const pages: string[][] = [];
  for (let i = 0; i < wrapped.length; i += capacity) {
    pages.push(wrapped.slice(i, i + capacity));
  }
  if (pages.length === 0) {
    pages.push([' ']);
  }

  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  const pageIds: number[] = [];
  let nextId = 3;
  for (let i = 0; i < pages.length; i += 1) {
    pageIds.push(nextId);
    nextId += 2;
  }
  const fontId = nextId;

  const kids = pageIds.map((id) => `${id} 0 R`).join(' ');
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>\nendobj\n`,
  );

  for (let i = 0; i < pages.length; i += 1) {
    const pageId = pageIds[i];
    const contentId = pageId + 1;
    const stream = `${buildPageContent(pages[i])}\n`;
    const streamBytes = new TextEncoder().encode(stream).length;

    objects.push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>\nendobj\n`,
    );
    objects.push(
      `${contentId} 0 obj\n<< /Length ${streamBytes} >>\nstream\n${stream}endstream\nendobj\n`,
    );
  }

  objects.push(
    `${fontId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n`,
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const object of objects) {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += object;
  }

  const xrefStart = new TextEncoder().encode(pdf).length;
  pdf += `xref\n0 ${offsets.length}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return new Blob([pdf], { type: 'application/pdf' });
}
