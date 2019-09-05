FROM ruby:2.6.3-slim
RUN apt-get update -qq && apt-get install -y curl git zsh build-essential
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -

RUN apt-get update -qq
RUN apt-get -y install yarn
RUN apt-get -y install nodejs

RUN mkdir /app
WORKDIR /app
ADD . /app
