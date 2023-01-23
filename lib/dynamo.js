const AWS = require('aws-sdk');
var DynamoDB = new AWS.DynamoDB.DocumentClient({
 region: "ap-northeast-1"
});

exports.select = async (table, where) =>
{
    let query = {
      TableName: table
    };
    if(where.placeHolder)
    {
        query.KeyConditionExpression = where.KeyConditionExpression;
        query.ExpressionAttributeNames = where.ExpressionAttributeNames;
        query.ExpressionAttributeValues = where.ExpressionAttributeValues;
    }else{
        query.KeyConditionExpression = where;
    }
    
    var data = await DynamoDB.query(query).promise();
    return data.Items;
}

exports.put = async (table, param) =>
{
    // queryの実行
    var result = await DynamoDB.put({
        TableName: table, 
        Item: param
    }).promise();
}
