// 
var runneragey = [];
var runnergenderx = [];
var runneryr = [];
// yx variables
// var selector = d3.select(sample);

//function getData()
d3.json('/api').then((data) => {

    data.forEach(element => {
        if (element.Year == "2015" && element.Gender == "M") {
            runneragey.push(element.Age);
            runnergenderx.push(element.Gender);
            runneryr.push(element.Year);
        }

        // push next element into varaiable
    });


        
})
console.log(runneragey);
console.log(runnergenderx);
console.log(runneryr);
// build chart here
//
    
//     
  



