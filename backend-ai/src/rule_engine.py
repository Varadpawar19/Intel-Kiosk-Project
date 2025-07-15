import json
import operator
import os

class RuleEngine:
    def __init__(self, vitals, summary, symptoms, config_path=None):
        self.vitals = vitals
        self.summary = summary.lower()
        self.symptoms = symptoms.lower()

        if config_path is None:
            config_path = os.path.join("..", "models", "rules_config.json")
        self.rules_config = self.load_rules(config_path)

        self.operators = {
            ">": operator.gt,
            "<": operator.lt,
            ">=": operator.ge,
            "<=": operator.le,
            "==": operator.eq
        }

    def load_rules(self, path):
        with open(path, "r") as f:
            return json.load(f)

    def evaluate(self):
        results = []
        for disease in self.rules_config:
            score = 0
            for rule in disease["rules"]:
                if rule["type"] == "vital":
                    val = self.vitals.get(rule["key"])
                    if val is not None and self.operators[rule["op"]](val, rule["value"]):
                        score += rule["score"]

                elif rule["type"] == "symptom":
                    if rule["key"] in self.symptoms:
                        score += rule["score"]

                elif rule["type"] == "summary":
                    if rule["key"] in self.summary:
                        score += rule["score"]

            if score > 0:
                results.append((disease["name"], score))

        return sorted(results, key=lambda x: x[1], reverse=True)
