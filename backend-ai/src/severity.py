import joblib
import pandas as pd
import os

symptom_keywords = [
    "chest_pain", "cough", "fever", "vomiting",
    "shortness_of_breath", "dizziness", "fatigue", "palpitations"
]

def get_symptom_text():
    return input("📝 Enter your symptoms (e.g., 'I have chest pain and vomiting'): ").lower()

def symptoms_to_vector(text):
    return {s: int(s.replace("_", " ") in text) for s in symptom_keywords}

vitals = {
    "bp_sys": 145,
    "bp_dia": 95,
    "pulse": 110,
    "spo2": 94,
    "temperature": 101.0,
    "age": 45,
    "bmi": 24.8,
    "gender_male": 1
}

def main():
    text = get_symptom_text()
    symptoms = symptoms_to_vector(text)
    input_data = {**vitals, **symptoms}
    df_input = pd.DataFrame([input_data])

    model_path = os.path.join("models", "severity_model.pkl")
    model = joblib.load(model_path)
    prediction = model.predict(df_input)[0]

    print("\n🔔 Predicted Severity Level:", prediction)

if __name__ == "__main__":
    main()
