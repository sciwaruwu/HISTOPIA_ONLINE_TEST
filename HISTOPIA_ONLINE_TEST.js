function GetWeight(x) 
{
  if(x == null || x === "" || x === undefined || x === "undefined") return 0;
  
  return x.charCodeAt(0) - 96;
}

function CheckWeightedStrings(x, y) 
{
  var val = 0;
  var prevAlphabet = '';
  var weights = [];
  var bools = [];

  for(var a = 0; a < x.length; a++)
  {    
    var currAlphabet = x[a];
    var weight = GetWeight(currAlphabet);

    if(prevAlphabet !== currAlphabet) val = 0;

    prevAlphabet = currAlphabet;
    val += weight;
    
    if(!weights.includes(val)) weights.push(val);
  }

  for(var b = 0; b < y.length; b++)
  {
    var num = y[b];
    bools.push(weights.includes(num) ? "Yes" : "No")
  }

  return bools;
}

console.log(CheckWeightedStrings('abbcccd',[1, 3, 9, 8]))

---------------------------------------------------------------------------------


function BalancedBrackets(x)
{
    var openBrackets = ["[","{","("];
    var closeBrackets = ["]","}",")"];
    var stack = [];
    var validStack = true;
    
    for(var a = 0; a < x.length; a++)
    {
        var str = x[a];

        if(openBrackets.includes(str) || closeBrackets.includes(str))
        {
            if(stack.length == 0 && closeBrackets.includes(str)) validStack = false;

            if(validStack)
            {
                if(openBrackets.includes(str)) stack.push(str);
            
                if(closeBrackets.includes(str))
                {
                    var indexCloseBrackets = closeBrackets.indexOf(str);
                    var indexOpenBrackets = openBrackets.indexOf(stack[stack.length-1]);

                    if(indexCloseBrackets == indexOpenBrackets) stack.pop();
                }
            }
        }
    }
    
    return stack.length == 0 && validStack;
}

console.log(BalancedBrackets("{ ( ( [ ] ) [ ] ) [ ] }"));

--------------------------------------------------------------------------------

var starts = [];
var ends = [];
var index  = 0;
var head = [];
var tail = [];
var alreadyPalindrome = false;
var resetInit = false;

function HighestPalindrome(x, y)
{
    if(parseInt(x) == "NaN" || parseInt(x) == NaN || parseInt(x).toString().length != x.length) return -1;
    
    var k = false;
    
    if(resetInit)
    {
        index = 0;
        starts = [];
        ends = [];
        index  = 0;
        head = [];
        tail = [];
        resetInit = false;
    }
    
    if(index < Math.floor(x.split('').length/2))
    {
        if(x[index] != x[(x.length-1) - index])
        {
            starts.push(x[index]);
            ends.push(x[(x.length-1) - index]);
            
            tail.push(x[(x.length-1) - index] > x[index] ? x[(x.length-1) - index] : x[index]);
        }
        else
        {
            if(alreadyPalindrome && y >= 2)
            {
                head.push(9);
                tail.push(9);
                
                if(x[index] < 9) y -= 2;
            }
            else
            {
                head.push(x[index]);
                tail.push(x[(x.length-1) - index]);
            }
        }
        
        if(y > 0 && !alreadyPalindrome)
        {
            if(starts[starts.length - 1] >= ends[ends.length - 1]) 
            {
                head.push(starts[starts.length - 1]);
                starts.pop();
                k = true;
            }
            if(ends[ends.length - 1] > starts[starts.length - 1]) 
            {
                head.push(ends[ends.length - 1]);
                ends.pop();
                k = true;
            }
            if(k) y--;
        }
        
        index++;
        return HighestPalindrome(x, y);
    }
    else
    {
        var p = head.join("");
        var r = y == 1 ? 9 : x[Math.floor(x.length/2)];
        var s = tail.reverse().join("");
        var n = x.length % 2 == 0 ? p.concat(s) : p.concat(r).concat(s);

        if(y == 1 && x[Math.floor(x.length/2)] < 9 && x.length % 2 != 0) y = 0;

        if(n == x || y > 0)
        {
            if(y % 2 != 0 && x.length % 2 == 0)
            {
                return -1;
            }
            else
            {
                resetInit = true;
                alreadyPalindrome = true;
                return HighestPalindrome(n, y);
            }
        }
        else
        {
            return n;
        }
    }
    
}

console.log(HighestPalindrome("1132514511",3));
