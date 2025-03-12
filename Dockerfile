ARG BUILD_ENV=noci

#------------------------------------------------------------------------------
# Build Stage: build React application
#------------------------------------------------------------------------------
FROM node:20-alpine3.18 as build
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package*.json ./
COPY .husky .husky

# Install without modifying package.json.  `npm ci`, when the environment is
# set to production will not instll devDependencies (which are required for
# a typescript project).  The flag `--include=dev` should include them as well.
# `--no-audit` because will will run it manually later.
RUN npm install --include=dev --no-audit
RUN npm audit --include=dev --audit-level=high
COPY . .

RUN npm run lint
RUN npm run test
RUN npm run build

#------------------------------------------------------------------------------
# Build Stage: generate main application image
#------------------------------------------------------------------------------
FROM nginx:stable-alpine as app

COPY --from=build /usr/src/app/dist /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]


#------------------------------------------------------------------------------
# Build Stage: add build info to image (if exists)
#------------------------------------------------------------------------------
FROM app as build_ci
ONBUILD COPY build-info.txt /build/build-info.txt

FROM app as build_noci

FROM build_${BUILD_ENV}

ARG BRANCH
ARG BUILD_NUM
ARG COMMIT_HASH
ARG COMMIT_MSG
ARG COMMIT_AUTHOR
ARG CREATED
ARG SRC_REPO
ARG VERSION

LABEL com.gumband.image.build.number=$BUILD_NUM
LABEL com.gumband.image.build.url=https://bitbucket.org/deeplocal/$SRC_REPO/pipelines/results/$BUILD_NUM
LABEL com.gumband.image.created=$CREATED
LABEL com.gumband.image.vcs.branch=$BRANCH
LABEL com.gumband.image.vcs.commit=$COMMIT_HASH
LABEL com.gumband.image.vcs.commit.author=$COMMIT_AUTHOR
LABEL com.gumband.image.vcs.commit.msg=$COMMIT_MSG
LABEL com.gumband.image.vcs.commit.url=https://bitbucket.org/deeplocal/$SRC_REPO/commits/$COMMIT_HASH
LABEL com.gumband.image.vcs.source=https://bitbucket.org/deeplocal/$SRC_REPO
LABEL com.gumband.image.version=$VERSION
