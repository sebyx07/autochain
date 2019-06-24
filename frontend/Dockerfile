FROM node:9.5.0
EXPOSE 4200 49152
WORKDIR /myapp

RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

RUN npm install -g @angular/cli@6.0.8
