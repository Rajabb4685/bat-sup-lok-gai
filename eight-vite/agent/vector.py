from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd

# Load CSV
df = pd.read_csv("realistic_restaurant_reviews.csv")

# Embedding model
embeddings = OllamaEmbeddings(model="mxbai-embed-large")

# Vector DB location
db_location = "./chroma_langchain_db"
add_documents = not os.path.exists(db_location)

if add_documents:
    documents = []
    ids = []

    for i, row in df.iterrows():
        content = (
            f"Restaurant: {row['business_name']}\n"
            f"Reviewer: {row['reviewer_name']}\n"
            f"Review: {row['review_text']}"
        )

        document = Document(
            page_content=content,
            metadata={
                "restaurant": row["business_name"],
                "rating": row["rating"],
                "date": row["review_date"]
            },
            id=str(i)
        )

        documents.append(document)
        ids.append(str(i))

# Create / load vector store
vector_store = Chroma(
    collection_name="restaurant_reviews",
    persist_directory=db_location,
    embedding_function=embeddings
)

# Add documents only once
if add_documents:
    vector_store.add_documents(documents=documents, ids=ids)

# Retriever
retriever = vector_store.as_retriever(
    search_kwargs={"k": 5}
)





# from langchain_ollama import OllamaEmbeddings
# from langchain_chroma import Chroma
# from langchain_core.documents import Document
# import os
# import pandas as pd

# df = pd.read_csv("realistic_restaurant_reviews.csv")
# embeddings = OllamaEmbeddings(model="mxbai-embed-large")

# db_location = "./chrome_langchain_db"
# add_documents = not os.path.exists(db_location)

# if add_documents:
#     documents = []
#     ids = []
    
#     for i, row in df.iterrows():
#         document = Document(
#             page_content=row["Title"] + " " + row["Review"],
#             metadata={"rating": row["Rating"], "date": row["Date"]},
#             id=str(i)
#         )
#         ids.append(str(i))
#         documents.append(document)
        
# vector_store = Chroma(
#     collection_name="restaurant_reviews",
#     persist_directory=db_location,
#     embedding_function=embeddings
# )

# if add_documents:
#     vector_store.add_documents(documents=documents, ids=ids)
    
# retriever = vector_store.as_retriever(
#     search_kwargs={"k": 5}
# )