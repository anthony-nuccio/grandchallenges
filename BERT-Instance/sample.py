from sentence_transformers import SentenceTransformer, util

# Load pre-trained SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast & efficient for similarity

# Example user bios
bio1 = "I love hiking, reading, and coding."
bio2 = "I enjoy outdoor activities and books."

# Convert bios into embeddings
embedding1 = model.encode(bio1, convert_to_tensor=True)
embedding2 = model.encode(bio2, convert_to_tensor=True)

# Compute cosine similarity
similarity_score = util.pytorch_cos_sim(embedding1, embedding2)

print(f"Similarity Score: {similarity_score.item()}")