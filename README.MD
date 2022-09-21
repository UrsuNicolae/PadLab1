# PAD Lab 1

# Technologies
- .NET 6
- Docker
- SQL Server
- Redis
- OpenId
- Cloudinary

# Architecture

![](https://github.com/UrsuNicolae/PadLab1/blob/main/PAD.png)

# Description

- Ocelot
  - GateWay for our application.
  - Implement request Cache-ing, Round-Robing load balancing
- Innstagram Clone
  - Clone of instagram which will be our main service
- Sql servers
  - Main db for each searvice
- Redis servers
  - Main cache service for each service
- Cloudinary
  - Blob storage for photos

# Feature to be implemented
- Service
  - SQL and NoSQL databases;
  - Task Timeouts;
  - Adapter with a unified interface to build DB calls based on DB type;
  - Status Endpoint
- Gateway
  -Load Balancing:  Round Robin
