import { useState } from 'react';
import {
  ChevronDown,
  Building2,
  User,
  Phone,
  Share2,
  Palette,
  LayoutList,
  Image as ImageIcon,
} from 'lucide-react';
import FormField from './FormField.jsx';
import ImageUploadField from './ImageUploadField.jsx';
import ThemePicker from './ThemePicker.jsx';
import SectionsEditor from './SectionsEditor.jsx';
import GalleryEditor from './GalleryEditor.jsx';

function Group({ title, icon: Icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="flex items-center gap-2 font-display text-base font-semibold text-ink-800">
          <Icon size={17} className="text-brass-500" />
          {title}
        </span>
        <ChevronDown size={18} className={`text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 space-y-4">{children}</div>}
    </div>
  );
}

export default function CardForm({ card, onChange }) {
  function set(patch) {
    onChange({ ...card, ...patch });
  }

  return (
    <div className="divide-y divide-ink-100">
      <Group title="Identity" icon={Building2} defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <ImageUploadField label="Logo" value={card.logo} onChange={(v) => set({ logo: v })} />
          <ImageUploadField label="Profile picture" value={card.profilePicture} onChange={(v) => set({ profilePicture: v })} shape="circle" />
        </div>
        <FormField label="Company / business name" value={card.companyName} onChange={(v) => set({ companyName: v })} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Owner / representative" value={card.ownerName} onChange={(v) => set({ ownerName: v })} />
          <FormField label="Designation" value={card.designation} onChange={(v) => set({ designation: v })} />
        </div>
        <FormField label="Business description" value={card.description} onChange={(v) => set({ description: v })} textarea />
        <FormField label="Working hours" value={card.workingHours} onChange={(v) => set({ workingHours: v })} placeholder="Mon–Fri, 9am–6pm" />
      </Group>

      <Group title="Contact" icon={Phone}>
        <FormField label="Phone" value={card.phone} onChange={(v) => set({ phone: v })} placeholder="+91 98765 43210" />
        <FormField label="WhatsApp number" value={card.whatsapp} onChange={(v) => set({ whatsapp: v })} placeholder="+91 98765 43210" />
        <FormField label="WhatsApp opening message" value={card.whatsappMessage} onChange={(v) => set({ whatsappMessage: v })} />
        <FormField label="Email address" value={card.email} onChange={(v) => set({ email: v })} type="email" />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Email subject (optional)" value={card.emailSubject} onChange={(v) => set({ emailSubject: v })} />
          <FormField label="Email body (optional)" value={card.emailBody} onChange={(v) => set({ emailBody: v })} />
        </div>
        <FormField label="Website" value={card.website} onChange={(v) => set({ website: v })} placeholder="https://" />
        <FormField label="Physical address" value={card.address} onChange={(v) => set({ address: v })} textarea rows={2} />
        <FormField label="Google Maps link (optional)" value={card.mapsUrl} onChange={(v) => set({ mapsUrl: v })} placeholder="https://maps.google.com/..." />
      </Group>

      <Group title="Social profiles" icon={Share2}>
        <FormField label="LinkedIn" value={card.linkedin} onChange={(v) => set({ linkedin: v })} placeholder="https://linkedin.com/in/..." />
        <FormField label="GitHub" value={card.github} onChange={(v) => set({ github: v })} placeholder="https://github.com/..." />
        <FormField label="Facebook" value={card.facebook} onChange={(v) => set({ facebook: v })} />
        <FormField label="Instagram" value={card.instagram} onChange={(v) => set({ instagram: v })} />
        <FormField label="X (Twitter)" value={card.twitter} onChange={(v) => set({ twitter: v })} />
        <FormField label="YouTube" value={card.youtube} onChange={(v) => set({ youtube: v })} />
        <FormField label="Telegram (@handle)" value={card.telegram} onChange={(v) => set({ telegram: v })} placeholder="@yourhandle" />
      </Group>

      <Group title="Theme & design" icon={Palette}>
        <ThemePicker value={card.theme} onChange={(theme) => set({ theme })} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Accent color</label>
            <input type="color" value={card.accentColor} onChange={(e) => set({ accentColor: e.target.value })} className="w-full h-9 rounded-lg border border-ink-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Font</label>
            <select value={card.font} onChange={(e) => set({ font: e.target.value })} className="w-full h-9 rounded-lg border border-ink-200 px-2 text-sm">
              <option value="inter">Inter (clean sans)</option>
              <option value="fraunces">Fraunces (editorial serif)</option>
            </select>
          </div>
        </div>
      </Group>

      <Group title="Info sections" icon={LayoutList}>
        <SectionsEditor sections={card.sections} onChange={(sections) => set({ sections })} />
      </Group>

      <Group title="Gallery" icon={ImageIcon}>
        <GalleryEditor gallery={card.gallery} onChange={(gallery) => set({ gallery })} />
      </Group>
    </div>
  );
}
