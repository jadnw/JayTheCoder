import { Scene } from 'phaser'

import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class Loading extends Scene {
  constructor() {
    super(SceneKeys.Loading)
  }

  preload() {
    this.load.path = 'assets/'

    this.load.image('tiles', 'tilesets/tiles.png')
    this.load.tilemapTiledJSON('outside', 'tilemaps/outside.json')
    this.load.spritesheet(TextureKeys.Player, 'characters/player.png', { frameWidth: 16, frameHeight: 32 })
  }

  create() {
    this.scene.start(SceneKeys.Game)
  }
}
