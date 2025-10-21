# From repoB, pull from repoA
cd /path/to/repoB
git remote add source /path/to/repoA
git fetch source
git merge source/main