var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

const fs = require('fs');
var data = fs.readFileSync('Run.json');
var myObject= JSON.parse(data);

var dynamodb = new AWS.DynamoDB();

var blogEntries = myObject;

class BlogEntry {
  constructor(Activity_ID, Activity_Date,Activity_Name, Elapsed_Time,Distance,Filename,Picture,Moving_Time,Max_Speed,Average_Speed,Elevation_Gain,
  Elevation_Loss,Elevation_Low,Elevation_High,Max_Grade,Average_Grade,Grade_Adjusted_Distance) 
  
  {
      
    this.Activity_ID = {};
    this.Activity_ID.N = Activity_ID.toString();
    
    this.Activity_Date = {};
    this.Activity_Date.S = Activity_Date.toDateString();

    
    this.Activity_Name = {};
    this.Activity_Name.S = Activity_Name;
    
    this.Elapsed_Time = {};
    this.Elapsed_Time.N = Elapsed_Time.toString();
    
    this.Distance = {};
    this.Distance.N = Distance.toString();
    
    this.Filename = {};
    this.Filename.S = Filename;
    
    this.Picture = {};
    this.Picture.S = Picture;
    
    this.Moving_Time = {};
    this.Moving_Time.N = Moving_Time.toString();
    
    this.Max_Speed = {};
    this.Max_Speed.N = Max_Speed.toString();
    
    this.Elevation_Gain = {};
    this.Elevation_Gain.N = Elevation_Gain.toString();
    
    this.Average_Speed = {};
    this.Average_Speed.N = Average_Speed.toString();
    
    this.Elevation_Loss = {};
    this.Elevation_Loss.N = Elevation_Loss.toString();
    
    this.Elevation_Low = {};
    this.Elevation_Low.N = Elevation_Low.toString();
    
    this.Elevation_High = {};
    this.Elevation_High.N = Elevation_High.toString();
     
    this.Max_Grade = {};
    this.Max_Grade.N = Max_Grade.toString();
    
    this.Average_Grade = {};
    this.Average_Grade.N = Average_Grade.toString();
    
    this.Grade_Adjusted_Distance = {};
    this.Grade_Adjusted_Distance.N = Grade_Adjusted_Distance.toString();
    
  }
}

/// insert data from CSV or excel word file

// blogEntries.push(new BlogEntry(0,
// 'Paris',
// 'Spring-Summer',
// 'Women',
// 'Ready-to-Wear',
// '2022',
// 'Amiri',
// 'Mike Amiri',
// 'Amiri often showed menswear and womenswear together on its runways in Paris, with women in longline seafoam suiting and boxy leather jackets slotting almost anonymously into Mike Amiri’s men’s lineup. The pandemic and its related lockdowns gave him a moment to reconsider exactly who the Amiri woman is and what she’d want to wear. The 22 looks shown here, for spring 2022, are no longer the addendum to a cool dude parade, but their own sure-footed proposition for how women should dress.'
// ));


// blogEntries.push(new BlogEntry(1,
// 'New York City',
// 'Fall-Winter',
// 'Women',
// 'Ready-to-Wear',
// '2020',
// 'Peter Do',
// 'Peter Do',
// 'Moda Operandi’s Lisa Aiken hosted a dinner for Peter Do a couple of weeks ago. The e-tailer had just launched its first Do trunk show and gathered other supporters to celebrate, but it was no ordinary fashion night out. First there was the location: a Taiwanese restaurant in Bushwick called Win Son—delicious. Then there was the karaoke party that accompanied dessert. Rare is the industry occasion when a designer belts out his favorite tune—in this case, The Backstreet Boys’s “As Long As You Love Me”—but Do is confident as hell, and determined to do things his own way, and he has good reason. Fall is his fourth collection, and he’s already landed 40 of the top stores globally.'
// ));



// blogEntries.push(new BlogEntry(2,
// 'London',
// 'Spring-Summer',
// 'Women',
// 'Ready-to-Wear',
// '2021',
// 'Christopher Kane',
// 'Christopher Kane',
// 'People’s true colors have been coming out this London Fashion Week. Now that the shows are out and what personal contact possible with designers reduced to carefully managed COVID-secure appointments, there is nevertheless a better opportunity for honest conversations and understanding where designers’ creativity stems from. In Christopher Kane’s case, it’s been reverting to painting with multicolored glitter as he did as a kid that’s got him back to who he is.'
// ));



// var params = [];
// // params.Item = myObject; 

// for (let i = 0; i >= myObject.length; i++) {
//   params.Item = myObject[i];
//   params.push(params.Item);

// }


 // Create a for loop function to get all data rows 
const params = myObject.map(myFunction);

function myFunction(value) {
  return value;
}
    console.log(params);


// push to dynamo db
 
params.TableName = "RunningTable";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

console.log(params);