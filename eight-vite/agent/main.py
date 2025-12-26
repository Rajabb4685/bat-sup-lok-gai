from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever

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

while True:
    print("\n\n-------------------------------")
    question = input("Ask your question (q to quit): ")
    print("\n\n")

    if question.lower() == "q":
        break

    docs = retriever.invoke(question)

    # Convert Documents → readable text
    reviews = "\n\n".join(
        f"- {doc.page_content} (Rating: {doc.metadata.get('rating')})"
        for doc in docs
    )

    result = chain.invoke({
        "reviews": reviews,
        "question": question
    })

    print(result)



# from langchain_ollama.llms import OllamaLLM
# from langchain_core.prompts import ChatPromptTemplate
# from vector import retriever

# model = OllamaLLM(model="llama3.2")

# template = """
# You are an exeprt in answering questions about a pizza restaurant

# Here are some relevant reviews: {reviews}

# Here is the question to answer: {question}
# """
# prompt = ChatPromptTemplate.from_template(template)
# chain = prompt | model

# while True:
#     print("\n\n-------------------------------")
#     question = input("Ask your question (q to quit): ")
#     print("\n\n")
#     if question == "q":
#         break
    
#     reviews = retriever.invoke(question)
#     result = chain.invoke({"reviews": reviews, "question": question})
#     print(result)