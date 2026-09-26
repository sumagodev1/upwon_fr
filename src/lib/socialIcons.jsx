// The footer's icon registry: the site's copy of the backend's
// SOCIAL_MEDIA_ICON_NAMES allowlist (modules/social-media-links/utils/icons.ts),
// which the admin panel's icon picker mirrors too.
//
// The API stores an icon as a NAME, not a file — the site draws these with
// lucide-react, which exports components rather than images — and this file
// turns the name back into a component, the way lib/erpIcons.js does for the
// ERP page. The keys below must match the backend list exactly: a name the
// backend accepts but this file does not know renders as HelpCircle rather
// than as nothing, so a missed name is visible instead of silent.
//
// Two names are not lucide icons. lucide-react 0.460 has no X (formerly
// Twitter) logo — its `X` is the close cross — and no WhatsApp logo, so both
// are drawn here as inline SVGs sized and coloured exactly like the lucide
// glyphs beside them (className in, fill="currentColor"). The WhatsApp path is
// the one components/shared/FloatingActions draws.

import {
  AtSign,
  Building2,
  Clock,
  Dribbble,
  Facebook,
  Github,
  Globe,
  Headset,
  HelpCircle,
  Instagram,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Rss,
  Send,
  Smartphone,
  Twitch,
  Twitter,
  Youtube,
} from 'lucide-react';

function XLogo({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsApp({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

// Same names, same order as SOCIAL_MEDIA_ICON_NAMES.
const ICONS = {
  MapPin,
  Mail,
  Phone,
  PhoneCall,
  Smartphone,
  Globe,
  Building2,
  Clock,
  Headset,
  AtSign,
  MessageCircle,
  Send,
  Link2,
  Linkedin,
  Twitter,
  XLogo,
  Facebook,
  Instagram,
  Youtube,
  WhatsApp,
  Github,
  Dribbble,
  Twitch,
  Rss,
};

/** The component for an allowlisted icon name; HelpCircle for anything else. */
export function socialIcon(name) {
  // An own-property check, so a stored 'constructor' or 'toString' cannot
  // resolve to something off Object.prototype.
  return (
    (typeof name === 'string' && Object.prototype.hasOwnProperty.call(ICONS, name) && ICONS[name]) ||
    HelpCircle
  );
}
