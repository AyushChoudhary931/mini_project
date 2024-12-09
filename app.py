from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:

        data = request.json
        inputs = np.array(data['inputs']).reshape(1, -1) 
        
        
        probability = model.predict_proba(inputs)[0][1]
        
        return jsonify({
            'status': 'success',
            'probability_class_1': round(probability, 4)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True)