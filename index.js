function makeResponse(result)
{
    return {
        statusCode: 200,
        headers:{},
        body: JSON.stringify(result),
        isBase64Encoded: false
    };
}

function errorResourceRoute(event)
{
    let result = {
        "command" : event.pathParameters.Command,
        "message" : "not found"
    };
    
    return {
        statusCode: 404,
        headers:{},
        body: JSON.stringify(result),
        isBase64Encoded: false
    };
}

exports.handler = async (event) => {
    var param = {};
    var result = "";
    
    console.log(event);
    
    try
    {
        if(event.httpMethod == "POST")
        {
            var data = event.body;
            if(event.isBase64Encoded)
            {
                data = Buffer.from(data, 'base64').toString('ascii');
                data = decodeURIComponent(data);
                data = data.replace("payload=","");
            }
            
            try {
                param = JSON.parse(data);
            } catch (e)
            {
                param = data;
            }
        
            console.log(param);
        }
        
        param.ID = event.pathParameters.ID;
        param.Env = event.pathParameters.Env;
        let Command = event.pathParameters.Command;
        let Method = event.httpMethod;
        
        console.log(Command);
        
        //パス別に処理分け
        switch(Command)
        {
            case "CreateUser":
                if(Method != "POST") return errorResourceRoute(event);
                {
                let user = require("model/user.js");
                result = await user.Register(param.Name);
                }
                break;
                
            case "GetUser":
                if(Method != "GET") return errorResourceRoute(event);
                
                {
                let user = require("model/user.js");
                result = await user.GetUser(param.ID);
                }
                break;
                
            default:
                result = Command;
                break;
        };
    }
    catch(e)
    {
        console.log(e);
        
        const response = {
            statusCode: 400,
            "ok": false,
            body: e.message,
        };
        return response;
    }
    
    return makeResponse(result);
};
