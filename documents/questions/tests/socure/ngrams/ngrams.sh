echo "Top 50 unigrams"
cat corpus.txt | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | tr ' ' '\n' | sort | uniq -c | sort -rn | head -n 50

echo "Top 50 bigrams"
cat corpus.txt | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]' | sed 's/,//' | sed G | tr ' ' '\n' > tmp.txt
tail -n+2 tmp.txt > tmp2.txt
paste -d ' ' tmp.txt tmp2.txt | grep -v -e "^ " | grep -v -e " $" | sort | uniq -c | sort -rn | head -n 50

