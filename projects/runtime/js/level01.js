var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:100},
                {type: 'sawblade',x:500,y:groundY},
                {type: 'laser',x:100,y:200},
                {type: 'enemy',x:400,y:groundY-10},
                {type: 'enemy',x:800,y:groundY-100},
                {type: 'enemy',x:1200,y:groundY-50},
                {type: 'trophy',x:400,y:groundY-50}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i]
            if (gameItem.type === 'sawblade') {
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'laser') {
                createLaser(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'enemy') {
                createEnemy(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'trophy') {
                createTrophy(gameItem.x, gameItem.y)
             }
        }
        function createLaser(x,y) {
            var damageFromObstacle = 10;
            var hitZoneSize = 25;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/Laser2.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        function createEnemy() {
             var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'blue');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                console.log('Halle has hit the enemy')
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        function createTrophy() {
            var enemy =  game.createGameItem('enemy',25);
            var blueSquare = draw.rect(50,50,'blue');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(blueSquare);
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                console.log('The trophy has hit Halle');
                game.changeIntegrity(-10);
                console.log('Halle has hit the trophy')
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        // ONLY EDIT ABOVE HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}