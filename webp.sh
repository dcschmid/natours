find ./img -type f -name '*.jpg' | xargs -P 8 -I {} sh -c 'cwebp -q 75 $1 -o "${1%}.webp"' _ {} \;
