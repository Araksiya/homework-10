function MilitaryResource(type, health, image, distance) {
    this.type = type;
    this.health = health;
    this.maxHealth = health;
    this.distance = 0;
    this.maxDistance = distance;
    this.image = image;
 }
 MilitaryResource.prototype.isReadyToMove = function() {
    return this.maxDistance >  this.distance;
};

MilitaryResource.prototype.isReadyToFight = function() {
   return this.health >  0;
};

MilitaryResource.prototype.restore = function() {
   this.health = this.maxHealth;
   this.distance = 0;
};

MilitaryResource.prototype.clone = function() {
    return new MilitaryResource(this.type, this.health, this.image, this.distance);
};

function Squad (resources) {
    this.resources = resources && resources.length ?
        resources.map(function(resources){
            return resources;
        })  :  [];
};

Squad.prototype.isReadyToMove = function(){
    return this.resources.every(function(resource) {
        return resource.isReadyToMove();
    })
};

Squad.prototype.isReadyToFight = function()   {
    return this.resources.every(function(resource){
        return resource.isReadyToFight();
    })
};

Squad.prototype.getReadyToMoveResources = function(){
    return this.resources.filter(function(resource) {
        return resource.isReadyToMove();
    })
};

Squad.prototype.restore = function() {
    return this.resource.forEach(function(resource){
        return resource.restore();
    })
};

Squad.prototype.combineResources = function(defaultResources){
    return this.defaultResources.sort(function() {
        return .5 - Math.random();
   });
};

Squad.prototype.clone = function () {
    return new Squad (this.resources.map(function(resources){
        return resources.clone();
    }));
};

    
  var Unicorn = new MilitaryResource("Unicorn", 100, "images/unicorn.png", 200);
  var Dragon = new MilitaryResource("Dragon", 50, "images/monster.png", 90);
  var King = new MilitaryResource("King", 200, "images/king.png", 50 );
  var UnicornClone = Unicorn.clone();

  var Throne = [];
  Throne.push(Unicorn, Dragon, King);
  var gameOfThrones  = new Squad(Throne);

console.log(Throne);
console.log(gameOfThrones);

function Cards() {
    for(var key in Throne) {
        document.getElementById('game').innerHTML += '<div class="card"></div>';
        document.getElementById('game').lastChild.innerHTML += '<div class="health"></div>';
        document.getElementById('game').lastChild.innerHTML += '<div class="stamina"></div>';
        document.getElementById('game').lastChild.innerHTML += '<h2 class="character">' + Throne[key].type + '</h2>';
        document.getElementById('game').lastChild.innerHTML += '<div class="image"></div>';
        document.getElementById('game').lastChild.innerHTML += '<img src="' + Throne[key].image + '"class ="image" width="170" height="170" alt="">';
    }
}

Cards();

console.log("ready to move: ", gameOfThrones.isReadyToMove());
console.log("ready to fight: ", gameOfThrones.isReadyToFight());
console.log("resources, ready to move: ", gameOfThrones.getReadyToMoveResources());
console.log("cloned squad: ", gameOfThrones.clone());
  

