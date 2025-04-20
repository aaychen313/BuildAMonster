class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.moveSpeed = 2;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        // set up key inputs
        my.keys = this.input.keyboard.addKeys({
            left: 'A', right: 'D', smile: 'S', fangs: 'F'
        });

        // Create the main body sprite
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // legs 
        const legOffsetX = 40, legOffsetY = 80;
        my.sprite.leg1 = this.add.sprite(this.bodyX - legOffsetX, this.bodyY + legOffsetY, 'monsterParts', 'leg_greenA.png');
        my.sprite.leg2 = this.add.sprite(this.bodyX + legOffsetX, this.bodyY + legOffsetY, 'monsterParts', 'leg_greenB.png');

        // arms 
        const armOffsetX = 90, armOffsetY = 40;
        my.sprite.arm1 = this.add.sprite(this.bodyX - armOffsetX, this.bodyY + armOffsetY, 'monsterParts', 'arm_greenC.png').setFlipX(true);
        my.sprite.arm2 = this.add.sprite(this.bodyX + armOffsetX, this.bodyY + armOffsetY, 'monsterParts', 'arm_greenC.png');

        // eye
        const eyeOffsetX = 20, eyeOffsetY = -40;
        my.sprite.eye = this.add.sprite(this.bodyX + eyeOffsetX, this.bodyY + eyeOffsetY, 'monsterParts', 'eye_yellow.png');

        // head accessories 
        const accOffsetX = 50, accOffsetY = -80;
        my.sprite.ear1 = this.add.sprite(this.bodyX - accOffsetX, this.bodyY + accOffsetY, 'monsterParts', 'detail_green_ear.png').setFlipX(true);
        my.sprite.ear2 = this.add.sprite(this.bodyX + accOffsetX, this.bodyY + accOffsetY, 'monsterParts', 'detail_green_ear.png');

        // mouths: smile and fangs
        const mouthOffsetX = 20, mouthOffsetY = 30;
        my.sprite.mouthSmile = this.add
            .sprite(this.bodyX + mouthOffsetX, this.bodyY + mouthOffsetY, 'monsterParts', 'mouth_closed_fangs.png');
        my.sprite.mouthFangs = this.add
            .sprite(this.bodyX + mouthOffsetX, this.bodyY + mouthOffsetY, 'monsterParts', 'mouthI.png')
            .setVisible(false);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        const keys = my.keys;

        // toggle mouth expressions
        if (keys.smile.isDown) {
            my.sprite.mouthSmile.setVisible(true);
            my.sprite.mouthFangs.setVisible(false);
        } else if (keys.fangs.isDown) {
            my.sprite.mouthSmile.setVisible(false);
            my.sprite.mouthFangs.setVisible(true);
        }

        // movement
        if (keys.left.isDown) {
            for (let part in my.sprite) {
                my.sprite[part].x -= this.moveSpeed;
            }
        } else if (keys.right.isDown) {
            for (let part in my.sprite) {
                my.sprite[part].x += this.moveSpeed;
            }
        }
       
    }

}