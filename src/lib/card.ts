import { svg } from './icons';

export const esc = (s: any) =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const tones: Record<string, { label: string; icon: string; bg: string; fg: string }> = {
  doctor:    { label: 'طبيب',     icon: 'stethoscope', bg: 'bg-emerald-100', fg: 'text-brand' },
  pharmacy:  { label: 'صيدلية',   icon: 'pill',        bg: 'bg-emerald-100', fg: 'text-brand' },
  center:    { label: 'مركز طبي', icon: 'building',    bg: 'bg-sky-100',     fg: 'text-azure' },
  emergency: { label: 'طوارئ',    icon: 'ambulance',   bg: 'bg-red-100',     fg: 'text-alert' },
    nurse: { label: 'ممرض',          icon: 'heart-pulse', bg: 'bg-emerald-100', fg: 'text-brand' },
  physio:{ label: 'معالج فيزيائي', icon: 'activity',    bg: 'bg-sky-100',     fg: 'text-azure' },
};

const url = (p: any) => `/provider?id=${encodeURIComponent(p.id)}`;

export function listCard(p: any) {
  const t = tones[p.type] ?? tones.doctor;
  const tel = p.phone
    ? `<a href="tel:${esc(p.phone)}" class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white font-semibold py-2">${svg('phone', 16)} اتصال</a>` : '';
  const wa = p.whatsapp
    ? `<a href="https://wa.me/${esc(p.whatsapp)}" target="_blank" rel="noopener" class="flex-1 inline-flex items-center justify-center rounded-full border-2 border-brand text-brand font-semibold py-1.5">واتساب</a>` : '';
  const disc = p.has_discount
    ? `<span class="mt-2 inline-block rounded-full bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1">${esc(p.discount_text || 'يقدّم خصمًا')}</span>` : '';
  const sub = [p.specialty, p.title].filter(Boolean).join('، ');
  const where = [p.area, p.address].filter(Boolean).join('، ');
  return `<article class="bg-white border border-mint-line rounded-xl p-4">
    <div class="flex items-start gap-3">
      <span class="grid place-items-center size-12 shrink-0 rounded-full ${t.bg} ${t.fg}">${svg(t.icon, 24)}</span>
      <div class="min-w-0 grow">
        <div class="text-xs font-semibold ${t.fg}">${t.label}</div>
        <h2 class="font-bold text-lg leading-snug"><a href="${url(p)}">${esc(p.name)}</a></h2>
        ${sub ? `<div class="text-sm ${t.fg}">${esc(sub)}</div>` : ''}
        ${where ? `<div class="text-sm text-muted mt-0.5">${esc(where)}</div>` : ''}
        ${disc}
      </div>
      <a href="${url(p)}" aria-label="التفاصيل" class="text-muted">${svg('chevron-left', 20)}</a>
    </div>
    ${(tel || wa) ? `<div class="flex gap-2 mt-3">${tel}${wa}</div>` : ''}
  </article>`;
}

const dutyTones = [['bg-emerald-100', 'text-brand'], ['bg-sky-100', 'text-azure'], ['bg-red-100', 'text-alert']];

export function dutyCard(p: any, i = 0, note = '') {
  const [bg, fg] = dutyTones[i % dutyTones.length];
  const tel = p.phone
    ? `<a href="tel:${esc(p.phone)}" class="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-brand text-white font-semibold px-7 py-1.5">${svg('phone', 16)} اتصال</a>` : '';
  return `<article class="bg-white border border-mint-line rounded-xl p-3">
    <div class="flex items-center gap-3">
      <span class="grid place-items-center size-12 shrink-0 rounded-full ${bg} ${fg}">${svg('pill', 24)}</span>
      <div class="min-w-0 grow">
        <h3 class="font-bold truncate">${esc(p.name)}</h3>
        <p class="text-sm text-muted truncate">${esc(p.area || p.address || '')}</p>
        ${note ? `<p class="text-xs text-brand font-semibold">${esc(note)}</p>` : ''}
      </div>
      <a href="${url(p)}" aria-label="التفاصيل" class="text-muted">${svg('chevron-left', 20)}</a>
    </div>
    ${tel}
  </article>`;
}

export function featuredCard(p: any, i = 0) {
  const fg = i % 2 ? 'text-azure' : 'text-brand';
  const avatar = p.photo_url
    ? `<img src="${esc(p.photo_url)}" alt="" loading="lazy" class="size-16 rounded-full object-cover bg-mint">`
    : `<span class="grid place-items-center size-16 rounded-full bg-mint text-brand">${svg('user', 30)}</span>`;
  return `<article class="bg-white border border-mint-line rounded-xl p-4">
    <div class="flex items-center gap-3">
      ${avatar}
      <div class="min-w-0 grow">
        <h3 class="font-bold">${esc(p.name)}</h3>
        <p class="text-sm ${fg}">${esc(p.specialty || p.title || '')}</p>
      </div>
      <a href="${url(p)}" aria-label="التفاصيل" class="text-muted">${svg('chevron-left', 20)}</a>
    </div>
    <a href="${url(p)}" class="mt-3 mx-auto flex w-fit rounded-full bg-brand text-white font-semibold px-7 py-1.5">عرض التفاصيل</a>
  </article>`;
}

export function emergencyCard(p: any) {
  return `<article class="bg-alert-soft border border-alert-line rounded-xl p-4">
    <h2 class="font-bold text-lg text-alert">${esc(p.name)}</h2>
    ${p.address ? `<div class="text-sm text-muted mt-1">${esc(p.address)}</div>` : ''}
    ${p.phone ? `<a href="tel:${esc(p.phone)}" class="mt-3 flex items-center justify-center gap-2 rounded-full bg-alert text-white py-3 text-lg font-bold">${svg('phone', 20)} اتصل الآن <bdi dir="ltr">${esc(p.phone)}</bdi></a>` : ''}
  </article>`;
}