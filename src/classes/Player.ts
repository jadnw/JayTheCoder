import { Scene, GameObjects, Input, Physics } from 'phaser'

import Character from './Character'
import TextureKeys from '../consts/TextureKeys'
import AnimKeys from '../consts/AnimKeys'

export default class Player extends Character {
  private player: GameObjects.Sprite
  private keys: { [key: string]: Input.Keyboard.Key } = {
    W: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W),
    A: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A),
    S: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S),
    D: this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D),
  }

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)

    this.player = scene.add.sprite(0, 0, TextureKeys.Player)
    scene.anims.create({
      key: AnimKeys.WalkDown,
      frames: scene.anims.generateFrameNumbers(TextureKeys.Player, { frames: [0, 1, 2, 3]}),
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: AnimKeys.WalkUp,
      frames: scene.anims.generateFrameNumbers(TextureKeys.Player, { frames: [4, 5, 6, 7]}),
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: AnimKeys.WalkRight,
      frames: scene.anims.generateFrameNumbers(TextureKeys.Player, { frames: [8, 9, 10, 11]}),
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: AnimKeys.WalkLeft,
      frames: scene.anims.generateFrameNumbers(TextureKeys.Player, { frames: [12, 13, 14, 15]}),
      frameRate: 6,
      repeat: -1,
    })
    this.add(this.player)

    const body = this.body as Physics.Arcade.Body
    body.setBounce(1, 1)
    body.setCollideWorldBounds(true)
    body.setSize(this.player.width - 6, this.player.height / 6)
    body.setOffset((-this.player.width + 6) / 2, this.player.height / 3 )
  }

  update() {
    const body = this.body as Physics.Arcade.Body
    const speed = 80
    const speed2 = speed / Math.sqrt(2)

    const leftDown = this.keys.A?.isDown
    const rightDown = this.keys.D?.isDown
    const upDown = this.keys.W?.isDown
    const downDown = this.keys.S?.isDown
    const upLeftDown = this.keys.W?.isDown && this.keys.A?.isDown
    const upRightDown = this.keys.W?.isDown && this.keys.D?.isDown
    const downLeftDown = this.keys.S?.isDown && this.keys.A?.isDown
    const downRightDown = this.keys.S?.isDown && this.keys.D?.isDown

    if (upLeftDown) {
      this.player.anims.play(AnimKeys.WalkLeft, true)
      body.setVelocity(-speed2, -speed2)
    } else if (upRightDown) {
      this.player.anims.play(AnimKeys.WalkRight, true)
      body.setVelocity(speed2, -speed2)
    } else if (downLeftDown) {
      this.player.anims.play(AnimKeys.WalkLeft, true)
      body.setVelocity(-speed2, speed2)
    } else if (downRightDown) {
      this.player.anims.play(AnimKeys.WalkRight, true)
      body.setVelocity(speed2, speed2)
    } else if (leftDown) {
      this.player.anims.play(AnimKeys.WalkLeft, true)
      body.setVelocity(-speed, 0)
    } else if (rightDown) {
      this.player.anims.play(AnimKeys.WalkRight, true)
      body.setVelocity(speed, 0)
    } else if (upDown) {
      this.player.anims.play(AnimKeys.WalkUp, true)
      body.setVelocity(0, -speed)
    } else if (downDown) {
      this.player.anims.play(AnimKeys.WalkDown, true)
      body.setVelocity(0, speed)
    } else {
      body.setVelocity(0, 0)
      this.player.anims.currentAnim && this.player.anims.pause(this.player.anims.currentAnim.frames[0])
    }
  }
}
