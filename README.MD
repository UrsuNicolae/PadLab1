# PAD Lab 1

# Technologies
- .NET 6
- Docker
- SQL Server
- Redis

# Architecture

![](https://github.com/UrsuNicolae/PadLab1/blob/main/PADArchitecture2.png)

# Description

- Ocelot
  - GateWay for our application.
  - Implement request Cache-ing, Round-Robing load balancing
- TeaAPI
  - Service for retrival of all available teas from db
- CoffeAPI
  - Service for retrival of all available coffes from db
- Sql servers
  - Main db for each searvice
- Redis servers
  - Main cache service for each service

  

