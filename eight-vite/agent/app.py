from flask import Flask, render_template, request, jsonify
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever

app = Flask(__name__)

# Initialize AI components
model = OllamaLLM(model="llama3.2")
template = """
You are an expert in answering questions about local restaurants based on customer reviews.
Here are some relevant reviews:
{reviews}
Question: {question}
Answer clearly and concisely.
"""
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    user_question = data.get("question")
    
    # Retrieve reviews
    docs = retriever.invoke(user_question)
    reviews_text = "\n\n".join(
        f"- {doc.page_content} (Rating: {doc.metadata.get('rating')})"
        for doc in docs
    )

    # Generate AI response
    result = chain.invoke({
        "reviews": reviews_text,
        "question": user_question
    })

    return jsonify({"answer": result})

if __name__ == '__main__':
    app.run(debug=True)