!function(e){function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}var n={};i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="",i(i.s=0)}([function(e,i,n){"use strict";var t,a,o,r,l,s={},d={style:{font:"80px Arial",fill:"white"},map:{size:2e3}},p=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,"phaser-example",{preload:function(){this.load.image("unit","img/unit.png"),this.load.image("bullet","img/bullet.png"),this.load.image("killer","img/killers.png"),this.load.image("map","http://it-lab.space//pic/grid.png")},create:function(){l=io.connect(window.location.host),this.physics.startSystem(Phaser.Physics.ARCADE),this.time.advancedTiming=!0,this.time.desiredFps=28,this.time.slowMotion=0,o=this.add.tileSprite(0,0,d.map.size,d.map.size,"map"),this.world.setBounds(0,0,d.map.size,d.map.size),this.stage.backgroundColor="#242424",l.on("add_players",function(e){e=JSON.parse(e);for(var i in e)null==s[i]&&e[i].live&&c.addPlayer(i,e[i].x,e[i].y,e[i].name);a=!0}),l.on("add_player",function(e){e=JSON.parse(e),e.player.live&&c.addPlayer(e.id,e.player.x,e.player.y,e.player.name)}),l.on("player_rotation_update",function(e){e=JSON.parse(e),s[e.id].player.rotation=e.value}),l.on("player_position_update",function(e){e=JSON.parse(e),s[l.id].player.body.velocity.x=0,s[l.id].player.body.velocity.y=0,s[e.id].player.x+=e.x,s[e.id].player.y+=e.y}),l.on("player_fire_add",function(e){s[e]&&s[e].weapon.fire()}),this.input.onDown.add(function(){l.emit("shots_fired",l.id)}),l.on("clean_dead_player",function(e){e==l.id&&(a=!1),l.on("gameOver",function(e){var i=p.add.text(window.innerWidth/2,window.innerHeight/2,e,{font:"32px Arial",fill:"#ffffff",align:"center"});i.fixedToCamera=!0,i.anchor.setTo(.5,.5)}),s[e].player.kill()}),l.on("player_disconnect",function(e){s[e].player.kill()}),r=this.input.keyboard.createCursorKeys()},update:function(){1==a&&(s[l.id].player.rotation=this.physics.arcade.angleToPointer(s[l.id].player),l.emit("player_rotation",s[l.id].player.rotation),c.setCollisions(),c.characterController())},render:function(){p.debug.cameraInfo(p.camera,32,32)}}),c={addPlayer:function(e,i,n){t=p.add.sprite(i,n,"unit"),p.physics.arcade.enable(t),t.smoothed=!1,t.anchor.setTo(.5,.5),t.scale.set(.8),t.body.collideWorldBounds=!0,t.id=e;var a=p.add.weapon(30,"bullet");a.bulletKillType=Phaser.Weapon.KILL_WORLD_BOUNDS,a.bulletSpeed=500,a.fireRate=100,a.trackSprite(t,0,0,!0),s[e]={player:t,weapon:a},p.camera.follow(s[l.id].player)},bulletHitHandler:function(e,i){l.emit("player_killed",e.id),i.destroy()},setCollisions:function(){for(var e in s)for(var i in s)e!=i&&p.physics.arcade.collide(s[e].weapon.bullets,s[i].player,this.bulletHitHandler,null,this)},sendPosition:function(e){l.emit("player_move",JSON.stringify({id:l.id,character:e}))},characterController:function(){(p.input.keyboard.isDown(Phaser.Keyboard.A)||r.left.isDown)&&this.sendPosition("A"),(p.input.keyboard.isDown(Phaser.Keyboard.D)||r.right.isDown)&&this.sendPosition("D"),(p.input.keyboard.isDown(Phaser.Keyboard.W)||r.up.isDown)&&this.sendPosition("W"),(p.input.keyboard.isDown(Phaser.Keyboard.S)||r.down.isDown)&&this.sendPosition("S")}}}]);