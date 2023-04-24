var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["28ae5606-3722-4a23-9bdf-b6678dc6f339","fed91472-69c6-44a5-be2b-4bca2606518f"],"propsByKey":{"28ae5606-3722-4a23-9bdf-b6678dc6f339":{"name":"baby_robot_1","sourceUrl":null,"frameSize":{"x":240,"y":300},"frameCount":28,"looping":true,"frameDelay":12,"version":"tCtJb2.Et8bbIZYQDH42dFE6G55nT9U5","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1440,"y":1500},"rootRelativePath":"assets/28ae5606-3722-4a23-9bdf-b6678dc6f339.png"},"fed91472-69c6-44a5-be2b-4bca2606518f":{"name":"blue_shirt_ball_1","sourceUrl":null,"frameSize":{"x":125,"y":398},"frameCount":3,"looping":true,"frameDelay":12,"version":"H8HR3cHE_8iS_fVDfwjGi03AwydmJRdj","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":375,"y":398},"rootRelativePath":"assets/fed91472-69c6-44a5-be2b-4bca2606518f.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//declarando as variáveis do jogo
var player;
var computer;
var ball;

//criando os sprites
player= createSprite(380,200,10,100);
computer= createSprite(10,200,10,100);
ball= createSprite(200,200,10,10);

//definindo a cor dos sprites
player.shapeColor="blue";
computer.shapeColor="red";
ball.shapeColor="yellow";

//adicionando animação
//player.setAnimation("baby_robot_1");
//player.scale = 0.2
//player.mirrorX(-1);

//computer.setAnimation("baby_robot_1");
//computer.scale=0.3;



//início da função draw
function draw() {
  //definindo a cor do fundo
  background(220);
  
  //condições para movimentar a raquete do jogador
  if (keyDown("up")) {
    player.y=player.y-10;
  }
  
  if (keyDown("down")) {
    player.y=player.y+10;
  }
  
  //condição para iniciar o movimento da bola
  if(keyDown("space")){
     ball.velocityX=2;
     ball.velocityY=3;
  }
  
  //criando IA, fazendo a raquete do computador seguir a bola
  computer.y=ball.y;

  //criando as bordas
  createEdgeSprites();
  
  //fazendo a bola rebater nas bordas de cima e de baixo
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  
  //fazendo a bola rebater nas raquetes
  ball.bounceOff(computer);
  ball.bounceOff(player);
  
  //DRY - Don't Repeat Yourself
  //desenhando uma linha
  // line(200, 0, 200, 10);
  // line(200, 20, 200, 10+20);
  // line(200, 40, 200, 10+40);
  // line(200, 60, 200, 10+60);
  // line(200, 80, 200, 10+80);
  
  //          ||
  //          ||
  //          ||
  //         \  /
  //          \/
  
  //loop for
  
  
  //chamando a função para desenhar linhas
  drawnet();
  
  //condição para verificar se a bola saiu da tela e reinciar o jogo
  if(ball.x<0 || ball.x>400){
    resetball();
  }
  
  //verificando se a bola encostou nas raquetes
  if (ball.isTouching(player)|| ball.isTouching(computer) ) {
    //tocar um som
    playSound( "assets/category_hits/8bit_splat.mp3");
  }
  
  
  //desenhas os sprites na tela
  drawSprites();
}

//função para desenhar linhas
function drawnet(){ 
  //loop for para desenhar linhas
  for(var num=0;num<400;num=num+20){
    line(200,num,200,num+10);
  }
}

//função para reiniciar o jogo
function resetball(){
  ball.x=200;
  ball.y=200;
  ball.velocityY=0;
  ball.velocityX=0;
}


//E  AND &&
//OU OR  || 
//NÂO NOT !






// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
