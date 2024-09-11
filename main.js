var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 824;


var img2 = new Image();
img2.src = 'humen.png';

var img3 = new Image();
img3.src = '2back.jpg';

var dino = {
    x : 10,
    y : 579,
    //w 와 h 가 히팅 박스 핵심 이라보면될듯..
    width : 45,
    height : 45,
    draw(){

        //힛팅박스
        //ctx.fillStyle = 'blue' ;
        //ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(img2,this.x,this.y,80,80);
        //2개의 좌표 와 2개의 크기
    }
}

var 이동속도 = 5;

var 키상태 = {};

// 키 다운 이벤트 리스너
document.addEventListener('keydown', function(e) {
    키상태[e.code] = true;
    if (e.code === 'Space') {
        점프중 = true;
    }
});

// 키 업 이벤트 리스너
document.addEventListener('keyup', function(e) {
    키상태[e.code] = false;
});



dino.draw();

var img1 = new Image();
img1.src = 'enemy.png';

class Enemy {
    constructor(){
        this.x = 1000;
        this.y = 580;
        this.width = 60;
        this.height = 60;
    }
    draw(){

        //힛팅박스
        //ctx.fillStyle = 'red' ;
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1,this.x,this.y,80,80);
    }
}

var enemy = new Enemy();
//클래스 사용법중 하나 ??
enemy.draw();

/*
< 1초에 60번 실행할코드 >

function 프레임마다실행할거(){
    requestAnimationFrame(프레임마다실행할거)

}
프레임마다실행할거();

*/

var timer = 0;
var enemy여러개 = [];
var 점프timer = 0;
var animation;


function 프레임마다실행할거(){
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    //이것만 넣으면 되는가?
    render();

    if(timer % 130 === 0){
        var enemy = new Enemy();
        enemy여러개.push(enemy);
    }

    enemy여러개.forEach((a,i,o)=>{

        //장애물 끝에 x 좌표 1 닿으면 뜻임. 1이하면 떨어진다?
        if(a.x<1){
            점수++;
            o.splice(i,1)
        }

        a.x-=3;

        충돌하냐(dino,a);

        a.draw();
    })

    //안에 안넣어서 안나오는거였음..
    점수표시();    

    //점프기능

    if(점프중 == true){
        dino.y-=3;
        점프timer++;
    }
    
    //점프 바닥설정하기

    if(점프중 == false){
        if(dino.y < 579){
            dino.y+=3;    
        }        
    }

    //점프력 이라고 생각하면 될꺼같음.
    if(점프timer > 40 ){
        점프중 = false;
        점프timer = 0
    }

        // 방향키에 따라 Dino 이동
        if (키상태['ArrowLeft']) {
            dino.x -= 이동속도; // 왼쪽 이동
            if (dino.x < 0) dino.x = 0; // 경계 체크
        }
        if (키상태['ArrowRight']) {
            dino.x += 이동속도; // 오른쪽 이동
            if (dino.x + dino.width > canvas.width) {
                dino.x = canvas.width - dino.width; // 경계 체크
            }
        }
    
    dino.draw();
}


프레임마다실행할거();

//충동확인

function 충돌하냐(dino,enemy){
    var x축차이 = enemy.x - (dino.x + dino.width);
    var y축차이 = enemy.y - (dino.y + dino.height);

    if (x축차이 < 0 && x축차이 + enemy.width > 0 && y축차이 < 0 && y축차이 + enemy.height > 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        render(); //배경 랜더 없으면, 배경삭제됨...ㄷㄷ..

        ctx.fillStyle = 'red';
        ctx.font = '60px Arial';
        ctx.fillText('게임 오버', canvas.width / 2 - 100, canvas.height / 2);

        cancelAnimationFrame(animation)
    }
}

var 점프중 = false;
document.addEventListener('keydown', function(e){
    if ( e.code === 'Space'){
        점프중 = true;
    }
})

function render(){
ctx.drawImage(img3, 0 , 0, canvas.width, canvas.height );
};

render();

var 점수 = 0;

function 점수표시() {
    ctx.fillStyle = 'red';
    ctx.font = '34px Arial';
    ctx.fillText('점수: ' + 점수, 10, 45);
}

