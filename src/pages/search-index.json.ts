import { getCollection } from 'astro:content';
import { TYPES, STACKS, url, withFiles } from '../data/site';

export async function GET() {
  const resources = await getCollection('resources');
  const guides = await getCollection('guides');
  const docs = [
    ...resources.map((e) => ({
      id: e.id,
      title: e.data.title,
      type: e.data.type,
      typeLabel: TYPES[e.data.type].one,
      summary: e.data.summary,
      stacks: e.data.stacks.map((s) => STACKS[s]).join(' '),
      body: `${e.data.whenToUse} ${e.data.run} ${(e.body ?? '').replace(/[#`*_>|-]/g, ' ').replace(/\s+/g, ' ').slice(0, 600)}`,
      featured: e.data.featured,
      url: url(`resources/${e.id}`),
    })),
    ...guides.map((g) => ({
      id: `guide-${g.id}`,
      title: g.data.title,
      type: 'guide',
      typeLabel: 'Guide',
      summary: g.data.summary,
      stacks: '',
      body: (g.body ?? '').replace(/[#`*_>|-]/g, ' ').replace(/\s+/g, ' ').slice(0, 600),
      featured: false,
      url: url(`guides/${g.id}`),
    })),
  ];
  return new Response(withFiles(JSON.stringify(docs)), { headers: { 'Content-Type': 'application/json' } });
}
