import { Scale, Types, AUTO } from 'phaser'

const config: Types.Core.GameConfig = {
  title: 'Phaser 3 With TypeScript, Rollup, Vite Template',
  type: AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }},
  },
  scale: {
    mode: Scale.ScaleModes.ENVELOP,
    width: 1280,
    height: 720,
    autoCenter: Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
    antialiasGL: false,
  },
}

export default config
