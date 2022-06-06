import { Scene, GameObjects } from 'phaser'

export default class Character extends GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)

    scene.add.existing(this)
    scene.physics.add.existing(this)
  }
}
