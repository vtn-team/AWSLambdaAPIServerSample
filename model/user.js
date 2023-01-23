const DB = require("lib/dynamo.js");
const UUID = require("lib/uuid.js");

const tableName = "User";

exports.GetUser = async (uuid) => {
    
    // queryの実行
    var result = await DB.select(tableName, {
      placeHolder: true,
      KeyConditionExpression: "#ID = :ID",
      ExpressionAttributeNames: {"#ID": "uuid"},
      ExpressionAttributeValues: {":ID": uuid }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};

exports.Register = async (name) =>
{
    var uuid = UUID.v4();
    var user = {
        uuid: uuid,
        name: name,
        level: 1,
    };
    
    // queryの実行
    var result = await DB.put(tableName, user);

    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
};