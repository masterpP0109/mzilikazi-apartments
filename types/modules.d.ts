// Ambient type declarations for missing package declaration files

declare module '@hookform/resolvers/zod' {
  import { Resolver } from 'react-hook-form';
  export function zodResolver<T extends Record<string, any>>(
    schema: any,
    schemaOptions?: any,
    resolverOptions?: any
  ): Resolver<T>;
}

declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type LucideIcon = React.FC<LucideProps>;
  export const ArrowRight: LucideIcon;
  export const Check: LucideIcon;
  export const X: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Menu: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Calendar: LucideIcon;
  export const Users: LucideIcon;
  export const Wifi: LucideIcon;
  export const Car: LucideIcon;
  export const Wind: LucideIcon;
  export const Coffee: LucideIcon;
  export const Tv: LucideIcon;
  const icons: Record<string, LucideIcon>;
  export default icons;
}
