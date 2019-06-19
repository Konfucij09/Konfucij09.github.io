 alert('Ты превосходно справляешься, мой друг! Но настало время активных действий! Мы посылаем на помощь самого сильного из наших воинов! Да начнется битва!');
 var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = 'fon.png';

var pugImg = new Image();
pugImg.src = 'pug.png';
var mushroomImg = new Image();
mushroomImg.src = 'mushroom.png';

var catImg = new Image();
catImg.src = 'cat.png';

var marioImg = new Image();
marioImg.src = 'mario1.png';

var bigcatImg = new Image();
bigcatImg.src = 'Chi1.png';

var music = new Audio();
music.src = 'aud.mp3';



var pug = {x:400, y:400};
var mushroom = [];
var cat = [];
var timer = 0;
var counter = 0;
var bigcat = {x:300, y:600};
var mario = {x:300, y:-100};

backgroundImg.onload = function () {
	game();
}
canvas.addEventListener("mousemove", function(event) {
	pug.x = event.offsetX;
	pug.y = event.offsetY;
});
function game() {
	update();
	render ();
	requestAnimationFrame(game);

}
function show(state){

					document.getElementById('window').style.display = state;						
			}
function update() {
	timer++;
	music.play();
	if (timer%50==0) {
		cat.push({
			x:bigcat.x+100,
			y:bigcat.y,
			dx:Math.random()*4,
			dy:Math.random()*4})
	};

	if (timer%150==0) {
		mushroom.push({
			x:400, 
			y:150, 
			dx:Math.random()*4,
			dy:Math.random()*4});

	};
	for(i in mushroom) {
		mushroom[i].x = mushroom[i].x+mushroom[i].dx;
		mushroom[i].y = mushroom[i].y+mushroom[i].dy;
			if (mushroom[i].x>=750 || mushroom[i].x<0) mushroom[i].dx =-mushroom[i].dx;
			if (mushroom[i].y>=850) mushroom.splice(i,1);
			if ((mushroom[i].x >= 350 && mushroom[i].x<=450)  && (mushroom[i].y>=600)) 
			alert('Pugs win!!');
			
			
	};
	for(i in cat) {
		cat[i].x = cat[i].x-cat[i].dx;
		cat[i].y = cat[i].y-cat[i].dy;
			if (cat[i].x<0|| cat[i].y>=750) cat[i].dx =-cat[i].dx;
			if (cat[i].y<0) cat.splice(i,1);
			if (Math.abs(cat[i].x- mario.x ) < 150 && Math.abs(cat[i].y - mario.y) < 150) 
			alert('Cats win!!');
			if (Math.abs(cat[i].x - pug.x) < 50 && Math.abs(cat[i].y - pug.y) < 50) 
			cat.splice(i,1);
			if (Math.abs(bigcat.x - pug.x) < 50 && Math.abs(bigcat.y - pug.y) < 50) 
			alert('Cats win!!');show();


	};

}
function render () {
	context.drawImage(backgroundImg,0,0,800,800);
	context.drawImage(pugImg,pug.x,pug.y, 80,80);
	context.drawImage(marioImg,300,0,300,300);
	context.drawImage(bigcatImg,bigcat.x,bigcat.y, 200,200);
	for(i in cat) context.drawImage(catImg,cat[i].x, cat[i].y, 80,80);
	for(i in mushroom) context.drawImage(mushroomImg,mushroom[i].x,mushroom[i].y,50,50);
}
