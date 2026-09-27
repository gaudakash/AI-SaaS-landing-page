import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaGoogle } from "react-icons/fa6";

const columns = [
  { title: "Useful Links", links: ["About", "Services", "Team", "Prices"] },
  {
    title: "Help",
    links: [
      "Customer Support",
      "Terms & Conditions",
      "Privacy Policy",
      "Contact Us",
    ],
  },
];

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGoogle, href: "#", label: "Google" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4">
        {/* about */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            We're a team of designers, engineers, and innovators building AI
            tools that empower anyone to turn imagination into stunning
            visuals—faster, smarter, and effortlessly.
          </p>
        </div>

        {/* link columns */}
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {c.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="transition hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact */}
        <div>
          <h3 className="text-lg font-semibold text-primary">
            Connect With Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              Mumbai Maharashtra
              <br /> 400070, IND
            </li>
            <li>
              <a href="tel:+919324365583" className="hover:text-foreground">
                +91 9324365583 (Whatsapp)
              </a>
            </li>
            <li>
              <a
                href="mailto:username@mail.com"
                className="hover:text-foreground"
              >
                akashgauda16@mail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-8 w-8 place-items-center rounded-full border border-primary/60 text-primary transition hover:bg-primary hover:text-white"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
