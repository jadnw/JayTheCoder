import { Scene } from 'phaser'

import SceneKeys from '../consts/SceneKeys'

import Player from '../classes/Player'

export default class GameScene extends Scene {
  private player!: Player
  private overlapsLayer!: Phaser.Tilemaps.TilemapLayer
  private overlapedTiles!: Phaser.Tilemaps.Tile[]

  constructor() {
    super(SceneKeys.Game)
  }

  create() {
    const map = this.make.tilemap({ key: 'outside' })
    const tileset = map.addTilesetImage('farm', 'tiles', 16, 16)
    map.createLayer('Ground', tileset)

    const collidesLayer = map.createLayer('Collides', tileset)
    collidesLayer.setCollisionByProperty({ collides: true })

    this.player = new Player(this, this.scale.width / 2, this.scale.height / 2)

    this.overlapsLayer = map.createLayer('Overlaps', tileset)
    const borderLayer = map.createLayer('Border', tileset)
    this.overlapsLayer.setCollisionByProperty({ collides: true })
    borderLayer.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.player, borderLayer)
    this.physics.add.collider(this.player, collidesLayer)

    this.initCamera()
  }

  update() {
    this.player.update()
    const tile = this.overlapsLayer.getTileAtWorldXY(this.player.x, this.player.y)

    if (tile) {
      this.overlapsLayer.alpha = 0.4
    } else {
      this.overlapsLayer.alpha = 1
    }
  }

  private initCamera() {
    this.cameras.main.setSize(this.scale.width, this.scale.height)
    this.cameras.main.setZoom(3)
    this.cameras.main.startFollow(this.player)
  }
}
