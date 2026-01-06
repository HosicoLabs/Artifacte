export default function Picture({
  smSrc = "",
  mdSrc = "",
  className = "",
  alt = "",
}) {
  return (
    <picture>
      <source srcSet={mdSrc} media="(min-width:768px)" />
      <img className={className} src={smSrc} alt={alt} />
    </picture>
  );
}
