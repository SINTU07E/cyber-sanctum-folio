import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Sintu Sharma — Cybersecurity Consultant | VAPT & AppSec" },
      {
        name: "description",
        content:
          "Cybersecurity consultant specializing in VAPT, Application Security, API Security, Mobile, Cloud & Product Security. 4+ years securing enterprise, banking and government systems.",
      },
      {
        name: "keywords",
        content:
          "Cybersecurity Consultant, Application Security Engineer, VAPT Engineer, Penetration Tester, Web Security, API Security, Cloud Security, Mobile Security, Security Consultant India, Product Security Engineer, OWASP, Ethical Hacker",
      },
      { property: "og:title", content: "Sintu Sharma — Cybersecurity Consultant" },
      {
        property: "og:description",
        content:
          "VAPT, AppSec, API, Mobile, Cloud & Product Security. Enterprise-grade offensive security engagements.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sintu Sharma — Cybersecurity Consultant" },
      {
        name: "twitter:description",
        content:
          "VAPT, AppSec, API, Mobile, Cloud & Product Security by Sintu Sharma.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sintu Sharma",
          jobTitle: "Cybersecurity Consultant",
          description:
            "Cybersecurity consultant specializing in VAPT across web, API, mobile, network, cloud and product security.",
          knowsAbout: [
            "Cybersecurity",
            "VAPT",
            "Application Security",
            "API Security",
            "Cloud Security",
            "Mobile Security",
            "Product Security",
            "OWASP",
            "Threat Modeling",
          ],
        }),
      },
    ],
  }),
});
