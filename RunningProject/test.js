// var AWS = require('aws-sdk');

//Load Dynamo DB// 

AWS.config.update({
  region: "us-east-2",
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  // accessKeyId default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
});


//AWS.config = new AWS.Config();
//AWS.config.region = "us-east-2";
var dynamodb = new AWS.DynamoDB();
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

///install npm i lodash to sum 
// var lodash = require('lodash');
// lodash.config();


// load the meeeting text file into a variable, `content`
// this is the file that we created in the starter code from last week (week 1)
// load `content` into a cheerio object
// -----------------------------------------
// Create the document client interface for DynamoDB




// Get a single item with the getItem operation
//****

// async function logSingleItem(){
//     try {
//         var params = {
//             Key: {
//              "Activity_ID": {"N": "6058680263"},
//             },
//             TableName: "RunningTable",
//         };
//         var result = await dynamodb.getItem(params).promise()
//         console.log(JSON.stringify(result));
//     } catch (error) {
//         console.error(error);
//     }
// }
// logSingleItem()

// Use the query operation to get all song by artist Arturus Ardvarkian
// Use the DynamoDB client scan operation to retrieve all items of the table
//****
// async function scanForResults(){
//     try {
//         var params = {
//             TableName: "RunningTable"
//         };
//         var result = await dynamodb.scan(params).promise()
//         console.log(JSON.stringify(result))
//     } catch (error) {
//         console.error(error);
//     }
// }
// scanForResults()

/***/
// async function logSongsByArtistDdbDc(){
//     try {
//         var params = {
//             KeyConditionExpression: 'Activity_ID= :Activity_ID',
//             ExpressionAttributeValues: {
//              'Activity_ID': 6058680263
//             },
//             TableName: 'RunningTable'
//         };
//         var result = await ddbDocumentClient.query(params).promise()
//         console.log(JSON.stringify(result))
//     } catch (error) {
//         console.error(error);
//     }
// }
// logSongsByArtistDdbDc()
//**//
//Get an item from a table//
// var params = {
//   TableName : 'RunningTable',
//   Key: {
//   Activity_ID: 6058680263
//   }
// };

// var documentClient = new AWS.DynamoDB.DocumentClient();

// documentClient.get(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });




// Scan table for all items using the Document Client


// async function scanForResultsDdbDc(){
//     try {
//         var params = {
//             TableName: 'RunningTable'
//         };
//         var result = await ddbDocumentClient.scan(params).promise()
        
        ///----- TEEST--------//
        // console.log(result)
        // var arr = JSON.stringify(result)
        // console.log(result.length)
        // for (let value of Object.values(arr)) {
        // console.log(value.length);
        // }
        ///----- TEEST--------//


//     } catch (error) {
//         console.error(error);
//     }
// }
// scanForResultsDdbDc()


//test//

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "RunningTable",
    ProjectionExpression: "Activity_Date, Distance,Average_Speed",
    //----- if needed----
    // FilterExpression: "Distance between :' and :10",
    // ExpressionAttributeNames: {
    //     "#yr": "year",
    // },
    // ExpressionAttributeValues: {
    //     ":start_yr": 1950,
    //     ":end_yr": 1959 
    // }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the activities
        console.log("Scan succeeded.");

        data.Items.forEach(function(test) {
           console.log(
                // test.year + ": ",
                "Date: ",test.Activity_Date, " Distance:", test.Distance,"KM",test.Average_Speed,"min/km");
                
        });
                  
                      //Make an Array of the total distance // 
                      const getTotalDistance = data.Items.map(item => {
                          return  item.Distance;
                      })
                     console.log(getTotalDistance);
         
        let sum = 0;

        for (let i = 0; i < getTotalDistance.length; i++) {
            sum += getTotalDistance[i];
        }
        console.log(sum);
        
                 //Make array of total speed
          const getTotalAverageSpeed = data.Items.map(item => {
              return  item.Average_Speed;
          })
         console.log(getTotalAverageSpeed);
         const getBestSpeed = Math.min(...getTotalAverageSpeed) 
         
         //Sum the distance with lodash// 
        //  var sum = lodash.sum(getTotalDistance);
        // console.log(sum);
        
        //print to HTML// 
         document.getElementById("totalDistance").innerHTML = sum + " km";
         document.getElementById("bestSpeed").innerHTML = getBestSpeed.toFixed(2) + " minutes";
        //  document.getElementById("sketch-container").innerHTML = getBestSpeed.toFixed(2) + " minutes per KM ";
         
        // document.getElementById("totalDistance").innerHTML.write(sum);
      
        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
