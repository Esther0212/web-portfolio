import { ChatTextIcon } from "@phosphor-icons/react/ssr";

import ContactForm from "@/components/ui/contact-form";
import { contact } from "@/data/contact";

export default function ContactScene() {
  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            {contact.heading}
          </h3>

          <p className="text-description mt-4">
            {contact.description}
          </p>
        </div>

        <ChatTextIcon
          size={25}
          className="shrink-0 text-primary"
          aria-hidden="true"
        />
      </div>

      <ContactForm />
    </div>
  );
}