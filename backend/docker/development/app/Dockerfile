FROM ruby:2.5.0

RUN apt-get update && apt-get install -y \
	libpq-dev \
	sudo \
        vim

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN bundle install

# Create host user
RUN useradd -m -s /bin/bash --uid 1000 hostuser && echo "hostuser:hostuser" | chpasswd
RUN adduser hostuser sudo

