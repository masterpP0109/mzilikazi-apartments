// Legacy compatibility: never publish development image labels or fake property photos.
interface Props {
  ariaLabel: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "4/3" | "16/9" | "3/2";
  className?: string;
  "data-placeholder"?: string;
}
export default function ImagePlaceholder(_props: Props) {
  void _props;
  return null;
}
