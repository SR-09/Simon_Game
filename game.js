var gamePattern=[];
var c=0;
var i=1;
var buttonColours=["red", "blue", "green", "yellow"];
var gameProgress=false;
var heading="Press A Key to Start";


$(document).on("keypress",function(event)
{
    if(!gameProgress && event.key)
    {
        level();
        nextseq();
        gameProgress=true;
    }
});

function level()
{
    $("h1").text("level"+" "+i);
    i++;
}


function nextseq()
{
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    sounds(randomChosenColour);
}

function sounds(Colour)
{
    console.log(Colour);
    switch(Colour)
    {
        case "red":
            var track1=new Audio("./sounds/red.mp3");
            track1.play();
            var effect1=$("#red");
            blink(effect1);
            break;
    
        case "blue":
            var track2=new Audio("./sounds/blue.mp3");
            track2.play();
            var effect2=$("#blue");
            blink(effect2);
            break;

        case "yellow":
            var track3=new Audio("./sounds/yellow.mp3");
            track3.play();
            var effect3=$("#yellow");
            blink(effect3);
            break;

        case "green":
            var track4=new Audio("./sounds/green.mp3");
            track4.play();
            var effect4=$("#green");
            blink(effect4);
            break;

        default:
            var track5=new Audio("./sounds/wrong.mp3");
            track5.play();
            var flash=$("body");
            flash.addClass("game-over");
            setTimeout(function(){
                flash.removeClass("game-over");
            },200);
            break;
    }
}

function blink(effect)
{
    effect.addClass("pressed");
    setTimeout(function()
    {
        effect.removeClass("pressed");
    },100);
}

$(".btn").on("click",function()
{
    var clickedelement=$(this).attr("id");
    console.log('Clicked Element:', clickedelement);
    sounds(clickedelement);
    check(clickedelement);
});

function check(element)
{
    console.log('Element:',element);
    if(element == gamePattern[c])
    {
        if(c + 1 == gamePattern.length)
        {
            c=0;
            setTimeout(function(){
                level();
                nextseq();
            },1000);

        }
        else
        {
            c++;
        }
    }
    else
    {
        gamePattern.length=0;
        $("h1").text("Game Over, Press Any Key to Restart");
        sounds("wrong");
        gameProgress=false;
        i=1;
    }
}



