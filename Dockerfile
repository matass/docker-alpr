FROM debian:sid

RUN apt-get update && apt-get install -y \
  openalpr \
  openalpr-daemon \
  openalpr-utils \
  libopenalpr-dev \
  curl \
  wget \
  libssl-dev \
  git-core \
  build-essential

RUN apt-get install -y nodejs-legacy npm

RUN mkdir /src

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install
RUN npm install supervisor -g

EXPOSE 3000

CMD npm start
