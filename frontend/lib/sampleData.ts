export interface SampleTopic {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  text: string;
}

export const SAMPLE_TOPICS: SampleTopic[] = [
  {
    id: "ai-edu",
    title: "Artificial Intelligence in Education",
    category: "Educational Technology & AI",
    readingTime: "1.2 min read",
    text: "Artificial Intelligence is rapidly reshaping modern education by providing personalized learning pathways that adapt to individual student paces, strengths, and weaknesses. Intelligent tutoring systems analyze patterns in student responses, delivering customized hints and instructional remediation in real time. Beyond individual instruction, generative AI tools assist educators in drafting curricula, automating administrative assessments, and identifying early indicators of academic struggle through predictive learning analytics. However, the integration of AI in academic environments also raises critical dilemmas regarding algorithmic bias, digital divide disparities, plagiarism detection, and the potential erosion of critical thinking skills. To maximize the pedagogical benefits while mitigating ethical hazards, educational institutions must develop comprehensive digital literacy frameworks, transparent data governance policies, and hybrid learning models that preserve the essential mentorship role of human teachers."
  },
  {
    id: "climate-change",
    title: "Climate Change & Global Ecosystems",
    category: "Environmental Science",
    readingTime: "1.1 min read",
    text: "Climate change represents one of the most urgent global challenges of the twenty-first century, driven primarily by anthropogenic greenhouse gas emissions from fossil fuel combustion, deforestation, and industrial agriculture. As atmospheric concentrations of carbon dioxide and methane reach unprecedented levels, the Earth's climate system undergoes profound destabilization, resulting in rising average temperatures, ocean acidification, and accelerated glacial retreat. These environmental disruptions intensify the frequency and severity of extreme weather events, including prolonged megadroughts, devastating wildfires, and catastrophic tropical storms. The socioeconomic consequences are acute, threatening agricultural food security, displacing vulnerable coastal populations, and straining international economic systems. Mitigating the worst impacts requires an aggressive global transition toward renewable energy sources, widespread adoption of sustainable circular economy practices, nature-based carbon sequestration, and binding international climate agreements."
  },
  {
    id: "computer-networks",
    title: "Computer Networks & Architecture",
    category: "Computer Science & Engineering",
    readingTime: "1.3 min read",
    text: "Computer networks form the foundational digital backbone of contemporary global communication, enabling disparate computing devices to share computational resources, exchange packetized information, and access distributed services. Governed by layered architectural models such as the OSI seven-layer framework and the ubiquitous TCP/IP protocol suite, modern networks standardize everything from physical signaling and data link framing to end-to-end transport reliability and application data serialization. Routing algorithms, packet switching, and IP addressing schemes ensure that data packets navigate complex interconnected autonomous systems efficiently and reliably. In recent years, network infrastructure has evolved dramatically with the advent of Software-Defined Networking (SDN), Cloud computing, Network Functions Virtualization (NFV), and high-throughput wireless technologies like 5G and Wi-Fi 6. Concurrently, the proliferation of sophisticated cyber threats has elevated network security—encompassing zero-trust architecture, robust public-key cryptography, firewalls, and intrusion prevention systems—to a mission-critical imperative."
  }
];
