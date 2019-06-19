alert('Твоя цель-150 очков за 20 секунд');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = '../img/fon.png';

var donutImg = new Image();
donutImg.src = '../img/donut.png';

var iceImg = new Image();
iceImg.src = '../img/ice.png';

var cakeImg = new Image();
cakeImg.src = '../img/cake.png';

var pugImg = new Image();
pugImg.src = '../img/pug.png';

var catImg = new Image();
catImg.src = '../img/cat.png';

var music = new Audio();
music.src = '../music/aud.mp3';

canvas.addEventListener("mousemove", function(event) {
	pug.x = event.offsetX;
	pug.y = event.offsetY;
})

var donut = [];
var ice = [];
var cake = [];
var cat = [];
var timer = 0;
var counter = 0;
var pug = {x:400, y:400};

backgroundImg.onload = function () {
	game();
}

function game() {
	update();
	render ();
	requestAnimationFrame(game);

}
function update() {
	timer++;
	music.play();
	if (timer%10==0) {
		donut.push({
			x:Math.random()*800, 
			y:-1500, 
			dx:Math.random()*4,
			dy:Math.random()*4});

		ice.push({
			x:Math.random()*800, 
			y:-450, 
			dx:Math.random()*2,
			dy:Math.random()*2});

		cake.push({
			x:Math.random()*750, 
			y:-2550, 
			dx:Math.random()*7,
			dy:Math.random()*7})
	}
	if (timer%250==0) {
		cat.push({
			x:Math.random()*750, 
			y:-550, 
			dx:Math.random()*2-1,
			dy:Math.random()*2})
	}
	for(i in donut) {
		donut[i].x = donut[i].x+donut[i].dx;
		donut[i].y = donut[i].y+donut[i].dy;
			if (donut[i].x>=750 || donut[i].x<0) donut[i].dx =-donut[i].dx;
			if (donut[i].y>=850) donut.splice(i,1);
			if (Math.abs(donut[i].x- pug.x ) < 50 && Math.abs(donut[i].y - pug.y) < 50) { 
			donut.splice(i,1);
			counter = counter+3;
		}
	} 
	for(i in ice) {
		ice[i].x = ice[i].x+ice[i].dx;
		ice[i].y = ice[i].y+ice[i].dy;
			if (ice[i].x>=750 || ice[i].x<0) ice[i].dx =-ice[i].dx;
			if (ice[i].y>=850) ice.splice(i,1);
			if (Math.abs(ice[i].x - pug.x) < 50 && Math.abs(ice[i].y - pug.y) < 50) {
			ice.splice(i,1);
			counter = counter+1;
		}
	} 
	 for(i in cake) {
		cake[i].x = cake[i].x+cake[i].dx;
		cake[i].y = cake[i].y+cake[i].dy;
			if (cake[i].x>=750 || cake[i].x<0) cake[i].dx =-cake[i].dx;
			if (cake[i].y>=850) cake.splice(i,1);
			if (Math.abs(cake[i].x - pug.x) < 50 && Math.abs(cake[i].y - pug.y) < 50) {
			cake.splice(i,1);
			counter = counter+2;
		}	
	}
	for(i in cat) {
		cat[i].x = cat[i].x+cat[i].dx;
		cat[i].y = cat[i].y+cat[i].dy;
			if (cat[i].x>=750 || cat[i].x<0) cat[i].dx =-cat[i].dx;
			if (cat[i].y>=850) cat.splice(i,1);
			if (Math.abs(cat[i].x - pug.x) < 60 && Math.abs(cat[i].y - pug.y) < 60) {
				music.pause();
				alert('Game over! Your score: '+counter+'  Yout time: '+Math.floor(timer/60)+ 'Start again');
				//document.getElementById('window').style.display='block';
				location.reload();

			}

			//alert('Game over! Your score: '+counter+'  Yout time: '+(timer/60)+ 'Start again');
			//TODO:всплыающее окно с выходом в глвное меню location.reload();
			
	}	
	if(timer>=1200 && counter<150) {music.pause();alert('You loose!');location.reload();}
	if (timer>=1200 && counter>=150) {music.pause();alert('You win!');window.location.href="../views/level2.html";}
	
}
function render () {
	context.drawImage(backgroundImg,0,0,800,800);
	context.drawImage(pugImg,pug.x,pug.y, 80,80);
	for(i in cat) context.drawImage(catImg,cat[i].x, cat[i].y, 80,80);
	for(i in donut) context.drawImage(donutImg,donut[i].x,donut[i].y,50,50);
	for(i in ice) context.drawImage(iceImg,ice[i].x, ice[i].y,50,50);
	for(i in cake) context.drawImage(cakeImg,cake[i].x, cake[i].y,50,50);
	context.fillStyle ="black";
	context.font ="30px Verdana";
	context.fillText("Score:"+counter, 20, 30);
	context.fillText("Time: "+(timer/60), 630, 30);
}
