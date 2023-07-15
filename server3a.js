const AWS = require("aws-sdk");
const http = require("http");
const port = 80;
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAW2V4FWBEJFYKFK7J",
  secretAccessKey: "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",
});

async function incrementOnEachRequest() {
  try {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: "Counter",
      Key: { CounterId: 1 },
      UpdateExpression:
        "SET countItem = countItem + :increment, updateddate = :datevalue",
      ExpressionAttributeValues: {
        ":increment": 1,
        ":datevalue": new Date().toString(),
      },
      ReturnValues: "UPDATED_NEW",
    };

    const data = await dynamodb.update(params).promise();
    console.log("Updated successfully " + JSON.stringify(data));
    return data.Attributes.countItem;
  } catch (err) {
    console.log("Error while updating error - " + JSON.stringify(err, null, 2));
    throw err;
  }
}

// Usage

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  try {
    const visits = await incrementOnEachRequest();
    const serverIP = require("ip").address();
    const message = `This is Node JS Server 3 - This site, Server IP: ${serverIP} has been visited ${visits} times`;
    res.end(message);
    console.log("Counter value:", visits);
  } catch (error) {
    console.error("Error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Server 3 running on 80`);
});