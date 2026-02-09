interface PictureProps {
  src?: string;
  smSrc?: string;
  mdSrc?: string;
  className?: string;
  alt?: string;
}

export default function Picture({
  src,
  smSrc,
  mdSrc,
  className = "",
  alt = "",
}: PictureProps) {
  const smallSource = smSrc ?? src ?? "";
  const mediumSource = mdSrc ?? src ?? "";

  return (
    <picture>
      <source srcSet={mediumSource} media="(min-width:768px)" />
      <img className={className} src={smallSource} alt={alt} />
    </picture>
  );
}
