To invoke get doctor function:
-   sls invoke local --function getDoctor  --data '{ "pathParameters": {"id":"648b576b40466c9137e9fb79"}}'

To invoke create doctor function:
-   sls invoke local --function createDoctor --path mocks/createDoctor-event.json

To connect to mongosh:
-   mongosh "mongodb+srv://burak-test.wzyfh.mongodb.net/" --apiVersion 1 --username burak

When you connect, use the following command to see the connections (you can't run it in serverless mongodb cluster):
-   db.currentOp(true).inprog.forEach(function(d){if(d.client)print(d.client, d.connectionId)})

Here is the number of connection explanation.
https://www.mongodb.com/community/forums/t/poolsize-connection-count/113029

The connection pool is on a per-mongod/mongos basis, so when connecting to a 3-member replica there will be three connection pools (one per mongod), each with a maxPoolSize of 1. Additionally, there is a required monitoring connection for each node as well, so you end up with (maxPoolSize+1)*number_of_nodes TCP connections, or (1+1)*3=6 total TCP connections in the case of a 3-member replica set.


