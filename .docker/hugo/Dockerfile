# Dockerfile
FROM node:lts-bullseye

# setting
RUN apt update && apt upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# instal golang
# RUN wget https://dl.google.com/go/go1.17.linux-amd64.tar.gz && \
#     tar -C /usr/local -xzf go1.17.linux-amd64.tar.gz
# ENV PATH $PATH:/usr/local/go/bin
# ENV GOPATH /usr/local/go
# RUN go install github.com/Ladicle/tcardgen@v0.0.0-20220108063857-a426c849a470

# Download and install hugo
ENV HUGO_VERSION 0.83.1
ENV HUGO_BINARY hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN curl -sL -o /tmp/hugo.deb \
    https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} && \
    dpkg -i /tmp/hugo.deb && \
    rm /tmp/hugo.deb && \
    mkdir /usr/share/blog

RUN npm install -g firebase-tools

# Expose default hugo port
EXPOSE 1313

# Automatically build site
ONBUILD ADD site/ /usr/share/blog
ONBUILD RUN hugo -d /usr/share/nginx/html/

# By default, serve site
# WORKDIR /src/blog
# ENV HUGO_BASE_URL http://localhost:1313
# CMD hugo server -b ${HUGO_BASE_URL} --bind=0.0.0.0
