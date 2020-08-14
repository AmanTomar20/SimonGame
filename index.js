var gameState=0;
var btnArr=['green','red','yellow','blue']
var dataArr=[]
var level
var j //read from start

var init=()=>{
    if(!gameState){
        $(document).keypress(()=>{
            gameState=1;
            dataArr=[]
            level=0
            j=0
            nextLevel()
        })
    }
}

init()
var nextLevel=()=>{
    level++;
    $('#level-title').text("Level "+level)
    var num=Math.floor(4*Math.random())
    dataArr.push(btnArr[num])
    j=0
    setTimeout(()=>{
        $('#'+btnArr[num]).fadeIn(100).fadeOut(300).fadeIn(100)
        produceSound(num)
    },500)
}

var produceSound=(num)=>{
    var audio
    audio=new Audio('sounds/'+btnArr[num]+'.mp3')
    audio.play()
}

var clickEffect=(num)=>{
    const $color=$('.'+btnArr[num])
    $color.addClass('pressed')
    setTimeout((sel)=>{
        sel.removeClass('pressed')
    },500,$color)
}


$('.btn').on('click',function (){
    if(gameState){
        num=btnArr.findIndex((btn)=>{
            return btn===this.classList[1]
        })
        clickEffect(num)
        produceSound(num)
        if(this.classList[1]!==dataArr[j]){
            console.log(this.classList[1])
            console.log(dataArr)
            console.log('j: '+j)
            gameOver()
            return
        }
        else if(j<dataArr.length-1){
            ++j;
        }
        else{
            setTimeout(()=>{
                nextLevel()
            },1000)
        }
            
    }    
})

var gameOver=()=>{
    $('#level-title').text('Game Over, Press a key for new game')
    gameState=0
}
