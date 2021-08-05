from collections import Counter

with open("corpus.txt", "r") as my_file:
    data = my_file.readlines()

for line in data:
    unigrams = line.split(" ")
    bigrams = zip(unigrams[:-1], unigrams[1:])
    unigram_counts = Counter(unigrams)
    bigram_counts = Counter(bigrams)
    top50_unigrams_with_counts = unigram_counts.most_common(50)
    top50_bigrams_with_counts = bigram_counts.most_common(50)
    top50_unigrams = [unigram[0] for unigram in top50_unigrams_with_counts]
    top50_bigrams = [bigram[0][0] + " " + bigram[0][1] for bigram in top50_bigrams_with_counts]
    print("Top 50 unigram list = " + str(top50_unigrams))
    print("Top 50 bigram list = " + str(top50_bigrams))
