import {
  Award,
  Badge,
  BadgeCheck,
  Bell,
  Cloud,
  CreditCard,
  Eye,
  Flag,
  Globe,
  HeartPulse,
  Laptop,
  Monitor,
  Network,
  Plug,
  Puzzle,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users
} from 'lucide-react';

// Maps the legacy bootstrap-icons class names still stored as data in
// service.js / services.js to lucide-react components, so icons render as
// bundled SVGs instead of pulling the entire bootstrap-icons font over a CDN
// for a couple dozen glyphs.
const ICON_MAP = {
  'bi-shield-lock-fill': ShieldCheck,
  'bi-patch-check-fill': BadgeCheck,
  'bi-people-fill': Users,
  'bi-display-fill': Monitor,
  'bi-globe2': Globe,
  'bi-phone': Smartphone,
  'bi-diagram-3': Network,
  'bi-cloud': Cloud,
  'bi-plug': Plug,
  'bi-server': Server,
  'bi-laptop': Laptop,
  'bi-shield-check': ShieldCheck,
  'bi-heart-pulse': HeartPulse,
  'bi-credit-card': CreditCard,
  'bi-award': Award,
  'bi-person-check': UserCheck,
  'bi-flag': Flag,
  'bi-puzzle': Puzzle,
  'bi-eye': Eye,
  'bi-bell': Bell,
  'bi-graph-up': TrendingUp
};

const ServiceIcon = ({ name, size = 24, className }) => {
  const Icon = ICON_MAP[name] || Badge;
  return <Icon size={size} className={className} aria-hidden="true" />;
};

export default ServiceIcon;
