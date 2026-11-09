import Chip from "@/components/ui/chip";
import StackPreview from "@/components/ui/stack-preview";
import { stack, stackPreviewItems } from "@/data/stack";

type StackSceneProps = {
  full?: boolean;
};

export default function StackScene({ full = false }: StackSceneProps) {
  if (!full) {
    return <StackPreview items={stackPreviewItems} />;
  }

  return (
    <div className="stack-categories">
      {stack.map((category) => (
        <section key={category.id} aria-labelledby={`stack-${category.id}`}>
          <h2 id={`stack-${category.id}`} className="text-eyebrow">
            {category.title}
          </h2>

          <ul aria-label={category.title} className="stack-chip-list mt-5">
            {category.items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
