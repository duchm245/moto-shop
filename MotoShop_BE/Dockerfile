FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/motoshop-0.0.1-SNAPSHOT.jar app.jar
RUN mkdir -p /app/images
EXPOSE 8081
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
