interface BrandOverview {
  name?: string;
  logoUrl?: string;
  industry?: string;
  headquarters?: string;
  website?: string;
  founded?: string;
  ceo?: string;
  description?: string;
}

interface BrandHeroProps {
  brand: {
    overview?: BrandOverview;
  } | BrandOverview;
}

export function BrandHero({ brand }: BrandHeroProps) {
  const overview: BrandOverview =
    "overview" in brand ? brand.overview ?? {} : (brand as BrandOverview);

  const {
    name,
    logoUrl,
    industry,
    headquarters,
    website,
    founded,
    ceo,
    description,
  } = overview;

  return (
    <section className="space-y-2">
      <div>
        <h1 className="text-4xl font-semibold">{name ?? "Brand name"}</h1>
        {industry && (
          <p className="mt-1 text-gray-600 leading-relaxed">{industry}</p>
        )}
      </div>

      <div className="space-y-1 text-gray-600 leading-relaxed">
        {founded && <p>Founded: {founded}</p>}
        {headquarters && <p>Headquarters: {headquarters}</p>}
        {website && (
          <p>
            Website:{" "}
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
      </div>

      {description && (
        <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
      )}
    </section>
  );
}