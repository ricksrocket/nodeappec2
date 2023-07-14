const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAW2V4FWBEJFYKFK7J",
  secretAccessKey: "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",
});

// Create the table
const createTableParams = {
  TableName: "Counter",
  KeySchema: [{ AttributeName: "CounterId", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "CounterId", AttributeType: "N" }, // Use 'S' for string attribute type
  ],

  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },

  BillingMode: "PROVISIONED",
};

function insertInitialValue() {
  let docClient = new AWS.DynamoDB.DocumentClient();

  var input = {
    CounterId: 1,
    countItem: 1,
    createddate: new Date().toString(),
    updateddate: new Date().toString(),
  };

  var params = {
    TableName: "Counter",
    Item: input,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Error while saving - " + JSON.stringify(err, null, 2));
    } else {
      console.log("Counter Item Inserted Successfully", data);
    }
  });
}

// const dynamodb = new AWS.DynamoDB();
// dynamodb.createTable(createTableParams, (err, data) => {
//   if (err) {
//     console.error('Error creating table:', err);
//   } else {
//     console.log('Table created successfully:', data);
//   }
// });

insertInitialValue();
