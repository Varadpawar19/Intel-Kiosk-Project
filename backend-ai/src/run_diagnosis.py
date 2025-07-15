import os
import json
from rule_engine import RuleEngine

# Base directory (project root)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Utility functions
def load_json(path):
    with open(path, 'r') as f:
        return json.load(f)

def load_summary(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def main():
    # Define paths
    vitals_path = os.path.join(BASE_DIR, "data", "vitals.json")
    summary_path = os.path.join(BASE_DIR, "data", "summary.txt")
    output_path = os.path.join(BASE_DIR, "outputs", "diagnosis_report.txt")
    config_path = os.path.join(BASE_DIR, "models", "rules_config.json")

    # Load inputs
    vitals = load_json(vitals_path)
    summary = load_summary(summary_path)
    symptoms = input("📝 Describe your symptoms: ")

    # Run rule engine
    engine = RuleEngine(vitals, summary, symptoms, config_path=config_path)
    results = engine.evaluate()

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Write report
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("📋 Doctor Diagnosis Report\n")
        f.write("=" * 35 + "\n\n")
        
        f.write("🔹 Vitals:\n")
        for k, v in vitals.items():
            f.write(f"   - {k}: {v}\n")

        f.write("\n🔹 Symptoms:\n")
        f.write(f"   - {symptoms}\n")

        f.write("\n🔹 Summary:\n")
        for line in summary.strip().split("\n"):
            f.write(f"   - {line.strip()}\n")

        f.write("\n🔹 AI Assumption:\n")
        if results:
            best = results[0]
            f.write(f"   - ⚠️ Suggested Condition: {best[0]}\n")
            f.write(f"   - Confidence Score: {best[1]}/5\n")
        else:
            f.write("   - ❗ No strong match found. Refer to doctor.\n")

        f.write("\n✅ AI-generated report to assist doctor, not replace.\n")

    print("✅ Report saved as diagnosis_report.txt")

if __name__ == "__main__":
    main()
