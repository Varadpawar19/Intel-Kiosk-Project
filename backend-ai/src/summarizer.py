import os

# Set base path to project root
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

VISIT_DIR = os.path.join(BASE_DIR, "data", "visits")
SUMMARY_FILE = os.path.join(BASE_DIR, "data", "summary.txt")

# Keywords to extract significant information
KEY_CONDITIONS = [
    "diabetes", "hypertension", "cardiac", "stroke",
    "asthma", "allergic", "allergy", "surgery", "bypass", "cancer"
]
KEY_TERMS = [
    "metformin", "amlodipine", "cardiologist", "ecg",
    "tmt", "hba1c", "sinus tachycardia"
]

def extract_relevant_lines(text):
    lines = text.split('\n')
    relevant = []
    for line in lines:
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in KEY_CONDITIONS + KEY_TERMS):
            relevant.append(line.strip())
    return relevant

def generate_summary():
    if not os.path.exists(VISIT_DIR):
        print(f"❌ Visit directory not found: {VISIT_DIR}")
        return

    all_notes = []

    # Read all visit files
    for filename in sorted(os.listdir(VISIT_DIR)):
        if filename.endswith(".txt"):
            with open(os.path.join(VISIT_DIR, filename), "r", encoding="utf-8") as file:
                content = file.read()
                notes = extract_relevant_lines(content)
                all_notes.extend(notes)

    # Remove duplicates and keep order
    seen = set()
    unique_notes = []
    for note in all_notes:
        if note not in seen:
            seen.add(note)
            unique_notes.append(note)

    # Ensure data directory exists
    os.makedirs(os.path.dirname(SUMMARY_FILE), exist_ok=True)

    # Write summary
    with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
        f.write(" Patient Summary:\n\n")
        for note in unique_notes:
            f.write(f"- {note}\n")

    print(f"✅ Summary generated in '{SUMMARY_FILE}'.")

if __name__ == "__main__":
    generate_summary()
