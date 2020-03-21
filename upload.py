import requests
import os

f = []
for (dirpath, dirnames, filenames) in os.walk('./dataset/'):
    f.extend(filenames)

print(f)