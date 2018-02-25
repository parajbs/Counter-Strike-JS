/**
  The sprite abstraction class for parsing and rendering a sprite.
**/
import { SpriteParser } from './SpriteParser';
import { SpriteRender } from './SpriteRender';

export const Sprite = function Sprite(gl, data) {
  // If data has a header field it means that it's an already
  // parsed JSON representation. If not we need to parse it
  let sprite = data.header === undefined ? SpriteParser.parse(data) : data;
  let spriteRender;
  this.render = function() {
    if (!spriteRender) {
      spriteRender = new SpriteRender(gl, sprite);
    }
    spriteRender.render();
  };

  this.subSprite = function(x, y, w, h) {
    let subsprite: any = {};
    subsprite.header = sprite.header;
    subsprite.frames = Array(sprite.frames.length);
    let width = sprite.header.maxWidth;
    for (let i = 0; i < sprite.frames.length; ++i) {
      let frame = sprite.frames[i];
      let imageData = new Uint8Array(4 * w * h);

      // The first pixel in our new image
      let start = 4 * (width * y + x);
      let n = start;
      // Loop through each row containing part of the image we need
      for (let j = 0; j != h; ++j) {
        // Grab the subarray of the row we need
        let row = frame.imageData.subarray(n, 4 * w + n);
        imageData.set(row, 4 * j * w);
        // Advance to the next row in the image
        n += 4 * width;
      }
      // Create a new frame in the subsprite
      subsprite.frames[i] = {
        group: frame.group,
        originX: frame.originX,
        originY: frame.originY,
        width: w,
        height: h,
        imageData: imageData
      };
    }

    return new Sprite(gl, subsprite);
  };
};