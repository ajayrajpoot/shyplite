var express = require('express');
var app = express();

const cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send('cors problem fixed:)');
});

app.get('/test', function (req, res) {
    res.send('start');
})

app.get('/Arrary', function (req, res) {
    // Question 5: Call the above square Promise function with all numbers from 0-100
    // and ensure that the errors are not thrown
    // then print the following:
    // 1. Number of errors 
    // 2. The resultant array
    // 3. Number of objects in the resultant array

    try {
        // Question 1: Create an Array from 0...100 without using traditional For-loop
        var arr = Array.apply(null, { length: 100 }).map(function (val, i) {
            return i + 1;
        });
        console.info(arr);

        // Question 2: Create an Array of only even numbers from the above array
        var evenArr = [];
        arr.forEach(el => {
            if (el % 2 == 0)
                evenArr.push(el);
        });

        // Question 3: create an array of even squares using the previous array
        var SqrevenArr = [];
        arr.forEach(el => {
            if (el % 2 == 0)
                SqrevenArr.push(Math.pow(el, 2));
        });


        // Question 4: Sum of all the squares from the above array of Even Squares
        var SumSqrEvenArr = 0;
        arr.forEach(el => {
            if (el % 2 == 0)
                SumSqrEvenArr += (Math.pow(el, 2));
        });

        res.json({ Array: arr, evenArr: evenArr, SqrEvenArr: SqrevenArr, SumSqrEvenArr: SumSqrEvenArr });

    } catch (error) {
        res.json({ ErrorEx: error.message });
    }

})

// Create a function that returns a Promise which returns the 
// square of only even numbers and 
// throws an error if an odd number is passed

app.get('/squareEven', function (req, res) {
    var Number = req.query.Number;
    console.log("Number", Number)

    try {
        SqrPromise(Number).then(data => {
            console.log(">>>>", data)
            res.json({ square: "square of " + Number + " is " + data });
        }, error => {
            console.log(">>error>>", error)
            res.json({ Error: "Number is not Even" });
        })
    } catch (error) {
        res.json({ ErrorEx: error.message });
    }
})
function SqrPromise(Number) {
    return new Promise(function (resolve, reject) {
        if (Number % 2 == 0)
            resolve(Math.pow(Number, 2))
        else {
            throw new Error('Number is not Even');
            reject(0)
        }
    });

}


app.get('/tempHTML', function (req, res) {
    try {
        const button = "<button>Button</button>";
        var temp = `<!DOCTYPE html>
                <html lang='en'>
                    <head>
                        <title>Document</title>
                    </head>
                    <body>
                        ${button}
                    </body>
                </html>`

        res.send(temp);
    } catch (error) {
        res.json({ ErrorEx: error.message });
    }
})
// Q2: Create a function that returns a list element (<li>) HTML 
// use this function to create an ordered list HTML structure of numbers from 
// 1-30 without breaking the template string invocation i.e. usage of += is disallowed.

app.get('/createOL', function (req, res) {
    try {

        var ol = document.createElement('ol');
        ol.setAttribute('type', '1');
        Array.apply(null, { length: 30 }).map(function (val, i) {
            var li = document.createElement('li');
            li.innerHTML = li.innerHTML + i;
            ol.appendChild(li);
        });


        res.send(ol);
    } catch (error) {
        res.json({ ErrorEx: error.message });
    }
})

// Q3: Now only print the even numbers. Again, breaking the template string
// invocation is disallowed
app.get('/createOLEven', function (req, res) {
    try {
        var temp = "<ol type='1'>";
        Array.apply(null, { length: 30 }).map(function (val, i) {
            if (i % 2 == 0)
                temp += "<li>" + i + "</li>";
        });
        temp += "</ol>";

        res.send(temp);
    } catch (error) {
        res.json({ ErrorEx: error.message });
    }
})
// Q4: Create a promise that simulates a delay of 1-3s randomly. Create an array of 

app.get('/delayPromise', async function (req, res) {
    try {
        var arr = [];
        var tt = await Array.apply(null, { length: 100 }).map(function (val, i) {

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(i);
                }, Math.floor((Math.random() * 300)));
            }).then(data => {
                console.log(">>>>>>", data);
                arr.push("k");
                return data;
            })
        })

        res.json({ ttL: tt });
    } catch (error) {
        res.json({ ErrorEx: error.message });
    }
})


// 10 such promises. Only print the output when all promises have been resolved.



var server = app.listen(8080, function () {
    console.log("Server Create");
});
