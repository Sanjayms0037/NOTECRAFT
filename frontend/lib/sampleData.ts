export interface SampleTopic {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  text: string;
}

export const SAMPLE_TOPICS: SampleTopic[] = [
  {
    id: "ai-society",
    title: "AI in Modern Society",
    category: "Technology & Society",
    readingTime: "1 min read",
    text: "Artificial intelligence is rapidly transforming knowledge work by providing adaptive workflows that augment human capability across research, writing, and analysis. Modern language models identify patterns across vast corpora in seconds, delivering structured insights and drafts in real time. Beyond task automation, generative systems assist knowledge workers in organizing information, managing administrative workflows, and distilling complex documentation. However, organizational adoption also introduces essential considerations regarding data privacy, accuracy verification, intellectual property, and cognitive dependency. To maximize productivity while avoiding critical oversights, organizations must establish responsible AI frameworks, clear editorial standards, and workflows that keep human judgment at the center of final decision-making."
  },
  {
    id: "climate-systems",
    title: "Global Climate Systems",
    category: "Science & Environment",
    readingTime: "1 min read",
    text: "Global climate systems are undergoing measurable shifts driven primarily by greenhouse gas concentrations from energy generation, transport, and industrial manufacturing. As atmospheric levels of carbon dioxide and methane climb, atmospheric and oceanic heat dynamics produce cascading environmental changes, from changing precipitation patterns and ocean thermal expansion to shifting agricultural growing seasons. These systemic shifts directly impact global supply chains, municipal infrastructure resilience, and water resource planning. Building systemic resilience requires accelerated investment in grid modernization, clean energy generation, sustainable agricultural practices, and data-driven disaster preparedness across both public and private sectors."
  },
  {
    id: "cloud-networks",
    title: "Cloud Networks & Infrastructure",
    category: "Engineering & Cloud",
    readingTime: "1 min read",
    text: "Modern cloud networks form the computational foundation of global digital services, allowing distributed systems to share compute, store data redundantly, and deliver low-latency experiences worldwide. Built on standardized protocol layers, modern distributed architecture automates traffic routing, elastic resource allocation, and failover protection across multi-region availability zones. In recent years, infrastructure engineering has evolved toward serverless runtimes, edge compute, and software-defined networking, reducing operational friction. Concurrently, zero-trust security architectures, automated cryptography key rotation, and granular access control have become indispensable requirements to defend against sophisticated threat vectors."
  }
];
