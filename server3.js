const AWS = require("aws-sdk");
const http = require("http");
const port = 80;
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAW2V4FWBEJFYKFK7J",
  secretAccessKey: "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",
});



function incrementOnEachRequest() {
  let dynamodb = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "Counter",
    Key: { CounterId: 1 },

    UpdateExpression:
      "SET countItem = countItem + :increment ,updateddate = :datevalue",

    ExpressionAttributeValues: {
      ":increment": 1,

      ":datevalue": new Date().toString(),
    },

    ReturnValues: "UPDATED_NEW",
  };

  dynamodb.update(params, function (err, data) {
    if (err) {
      console.log(
        "Error while updating error - " + JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Updated successfully " + JSON.stringify(data));
    }
  });
}
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  incrementOnEachRequest();
  res.setHeader("Content-Type", "text/plain");

  const message = "This is Node JS Server 2";

  res.end(message);
});

server.listen(port, () => {
  console.log(`Server 2 running on 80`);
});
