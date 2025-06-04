FROM jenkins/jenkins:lts

USER root
# Docker CLIを使えるように
RUN apt-get update && apt-get install -y docker.io

USER jenkins
# 必要プラグインの自動インストール
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt