# Dockerfile
FROM peaceiris/hugo:v0.146.4-full

# setting
RUN apt update && apt upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Expose default hugo port
EXPOSE 1313

# Automatically build site
ONBUILD ADD site/ /usr/share/blog
ONBUILD RUN hugo -d /usr/share/nginx/html/

# By default, serve site
# WORKDIR /src/blog
# ENV HUGO_BASE_URL http://localhost:1313
# CMD hugo server -b ${HUGO_BASE_URL} --bind=0.0.0.0
