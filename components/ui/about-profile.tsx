import Image from "next/image";

const facts = [
  { label: "Based in", value: "Cagayan de Oro, Philippines" },
  { label: "Specialization", value: "Full-stack development" },
  { label: "Current goal", value: "Growing as a software developer" },
];

export default function AboutProfile() {
  return (
    <div className="about-profile">
      <div className="about-photo">
        <Image
          src="/about/esther-beuthel-eblacas-picture.png"
          alt="Esther Beuthel Eblacas"
          fill
          sizes="(max-width: 359px) calc(100vw - 3rem), 320px"
          className="object-contain"
        />
      </div>

      <dl className="mt-6">
        {facts.map(({ label, value }) => (
          <div
  key={label}
  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-4"
>
  <dt className="whitespace-nowrap font-display text-xs uppercase text-muted-foreground">
    {label}
  </dt>

  <dd className="text-right text-sm">{value}</dd>
</div>
        ))}
      </dl>
    </div>
  );
}