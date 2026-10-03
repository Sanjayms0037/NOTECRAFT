"""Academic Test Cases Runner for Smart Study Notes Generator.
Executes the three required academic paragraphs through the Python AI engine,
measures exact metrics, and prints structured JSON and markdown reports.
"""

import sys
import json
import time
from pathlib import Path

# Add backend to sys.path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir / "backend"))

from app.summarizer import run_summarization
from app.text_utils import count_words, calculate_reduction

TEST_CASES = [
    {
        "id": "TC-01",
        "topic": "Artificial Intelligence in Education",
        "text": (
            "Artificial Intelligence is rapidly reshaping modern education by providing personalized "
            "learning pathways that adapt to individual student paces, strengths, and weaknesses. "
            "Intelligent tutoring systems analyze patterns in student responses, delivering customized "
            "hints and instructional remediation in real time. Beyond individual instruction, generative "
            "AI tools assist educators in drafting curricula, automating administrative assessments, "
            "and identifying early indicators of academic struggle through predictive learning analytics. "
            "However, the integration of AI in academic environments also raises critical dilemmas "
            "regarding algorithmic bias, digital divide disparities, plagiarism detection, and the "
            "potential erosion of critical thinking skills. To maximize the pedagogical benefits while "
            "mitigating ethical hazards, educational institutions must develop comprehensive digital "
            "literacy frameworks, transparent data governance policies, and hybrid learning models "
            "that preserve the essential mentorship role of human teachers."
        )
    },
    {
        "id": "TC-02",
        "topic": "Climate Change",
        "text": (
            "Climate change represents one of the most urgent global challenges of the twenty-first century, "
            "driven primarily by anthropogenic greenhouse gas emissions from fossil fuel combustion, "
            "deforestation, and industrial agriculture. As atmospheric concentrations of carbon dioxide "
            "and methane reach unprecedented levels, the Earth's climate system undergoes profound "
            "destabilization, resulting in rising average temperatures, ocean acidification, and accelerated "
            "glacial retreat. These environmental disruptions intensify the frequency and severity of extreme "
            "weather events, including prolonged megadroughts, devastating wildfires, and catastrophic "
            "tropical storms. The socioeconomic consequences are acute, threatening agricultural food "
            "security, displacing vulnerable coastal populations, and straining international economic "
            "systems. Mitigating the worst impacts requires an aggressive global transition toward renewable "
            "energy sources, widespread adoption of sustainable circular economy practices, nature-based "
            "carbon sequestration, and binding international climate agreements."
        )
    },
    {
        "id": "TC-03",
        "topic": "Computer Networks",
        "text": (
            "Computer networks form the foundational digital backbone of contemporary global communication, "
            "enabling disparate computing devices to share computational resources, exchange packetized "
            "information, and access distributed services. Governed by layered architectural models such as "
            "the OSI seven-layer framework and the ubiquitous TCP/IP protocol suite, modern networks "
            "standardize everything from physical signaling and data link framing to end-to-end transport "
            "reliability and application data serialization. Routing algorithms, packet switching, and "
            "IP addressing schemes ensure that data packets navigate complex interconnected autonomous "
            "systems efficiently and reliably. In recent years, network infrastructure has evolved dramatically "
            "with the advent of Software-Defined Networking (SDN), Cloud computing, Network Functions "
            "Virtualization (NFV), and high-throughput wireless technologies like 5G and Wi-Fi 6. Concurrently, "
            "the proliferation of sophisticated cyber threats has elevated network security—encompassing "
            "zero-trust architecture, robust public-key cryptography, firewalls, and intrusion prevention "
            "systems—to a mission-critical imperative."
        )
    }
]

def run_all_tests():
    results = []
    print("=" * 80)
    print("RUNNING ACADEMIC TEST SUITE (Python + Hugging Face Transformers)")
    print("=" * 80)

    for tc in TEST_CASES:
        print(f"\n[Executing] {tc['id']}: {tc['topic']}")
        orig_count = count_words(tc["text"])
        t0 = time.time()
        output = run_summarization(tc["text"])
        duration = round(time.time() - t0, 3)

        result_entry = {
            "test_case": tc["id"],
            "topic": tc["topic"],
            "original_text": tc["text"],
            "original_word_count": output["original_word_count"],
            "generated_summary": output["summary"],
            "summary_word_count": output["summary_word_count"],
            "reduction_percentage": output["reduction_percentage"],
            "key_points": output["key_points"],
            "model": output["model"],
            "latency_seconds": duration
        }
        results.append(result_entry)

        print(f" -> Original Words: {output['original_word_count']}")
        print(f" -> Summary Words:  {output['summary_word_count']}")
        print(f" -> Reduction:      {output['reduction_percentage']}%")
        print(f" -> Model:          {output['model']}")
        print(f" -> Latency:        {duration}s")
        print(f" -> Summary:        {output['summary'][:100]}...")

    # Save results to JSON file for documentation & PPT generator
    docs_dir = root_dir / "docs"
    docs_dir.mkdir(exist_ok=True)
    with open(docs_dir / "academic_test_records.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print("\n" + "=" * 80)
    print(f"SUCCESS: All {len(results)} test cases recorded in docs/academic_test_records.json")
    print("=" * 80)

if __name__ == "__main__":
    run_all_tests()
