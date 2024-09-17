(function(Scratch) {
  'use strict';
  
  const renderer = Scratch.renderer;
  const gl = renderer.gl;
  
  const Drawable = renderer.exports.Drawable;
  Drawable.prototype.drawR = 1;
  Drawable.prototype.drawG = 1;
  Drawable.prototype.drawB = 1;
  Drawable.prototype.depthMask = true;
  
  const decimalToRgb = (decimal) => {
	  const a = (decimal >> 24) & 0xFF;
	  const r = (decimal >> 16) & 0xFF;
	  const g = (decimal >> 8) & 0xFF;
	  const b = decimal & 0xFF;
	  return { r: r, g: g, b: b, a: a > 0 ? a : 255 };
  }
  
  const oldDrawThese = renderer._drawThese;
  renderer._drawThese = function (drawables, drawMode, projection, opts = {}) {
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendColor(1, 1, 1, 1);
    
    const drawableList = drawables.map(i => this._allDrawables[i]);
    const oldGetVisible = Symbol();
    for (const drawable of drawableList) {
      // renderer calls getVisible for each drawable before drawing it
      drawable[oldGetVisible] = drawable.getVisible;
      drawable.getVisible = function() {
	    gl.blendFunc(gl.CONSTANT_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendColor(+this.drawR, +this.drawG, +this.drawB, 1);
        return this[oldGetVisible].call(this);
      }
    }
    
    oldDrawThese.call(this, drawables, drawMode, projection, opts);
    
    for (const drawable of drawableList) {
      drawable.getVisible = drawable[oldGetVisible];
      delete drawable[oldGetVisible];
    }
    
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendColor(1, 1, 1, 1);
  };
  
  class LBdrawtest {
    getInfo() {
      return {
        id: 'rgbchannelssprite',
        name: 'RGB Channels Sprite Edition',
        menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMyIgaGVpZ2h0PSIzMyIgdmlld0JveD0iMCwwLDMzLDMzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIzLjUsLTE2My41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI0LDE4MGMwLC04LjgzNjU2IDcuMTYzNDQsLTE2IDE2LC0xNmM4LjgzNjU2LDAgMTYsNy4xNjM0NCAxNiwxNmMwLDguODM2NTYgLTcuMTYzNDQsMTYgLTE2LDE2Yy04LjgzNjU2LDAgLTE2LC03LjE2MzQ0IC0xNiwtMTZ6IiBmaWxsPSIjYWFhYWFhIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzMuOTAyMDQsMTgxLjQ4NjkyYzAsLTQuNDE4MjggMy41ODE3MiwtOCA4LC04YzQuNDE4MjgsMCA4LDMuNTgxNzIgOCw4YzAsNC40MTgyOCAtMy41ODE3Miw4IC04LDhjLTQuNDE4MjgsMCAtOCwtMy41ODE3MiAtOCwtOHoiIGZpbGw9IiMwMDAwZmYiIHN0cm9rZT0iIzNjMDBmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjMxLjk2MjQ1LDE3OS40NDEzNWMwLC00LjQxODI4IDMuNTgxNzIsLTggOCwtOGM0LjQxODI4LDAgOCwzLjU4MTcyIDgsOGMwLDQuNDE4MjggLTMuNTgxNzIsOCAtOCw4Yy00LjQxODI4LDAgLTgsLTMuNTgxNzIgLTgsLTh6IiBmaWxsPSIjMDBmZjAwIiBzdHJva2U9IiMwMGZmM2QiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzAuMjI1OSwxNzcuNjIwOThjMCwtNC40MTgyOCAzLjU4MTcyLC04IDgsLThjNC40MTgyOCwwIDgsMy41ODE3MiA4LDhjMCw0LjQxODI4IC0zLjU4MTcyLDggLTgsOGMtNC40MTgyOCwwIC04LC0zLjU4MTcyIC04LC04eiIgZmlsbD0iI2ZmMDAwMCIgc3Ryb2tlPSIjZmYzZDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPgo=',
        blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC40MjYxNCIgaGVpZ2h0PSIyMC42MTU5NCIgdmlld0JveD0iMCwwLDIwLjQyNjE0LDIwLjYxNTk0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjcyNTksLTE2OS4xMjA5OCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIzMy45MDIwNCwxODEuNDg2OTJjMCwtNC40MTgyOCAzLjU4MTcyLC04IDgsLThjNC40MTgyOCwwIDgsMy41ODE3MiA4LDhjMCw0LjQxODI4IC0zLjU4MTcyLDggLTgsOGMtNC40MTgyOCwwIC04LC0zLjU4MTcyIC04LC04eiIgZmlsbD0iIzAwMDBmZiIgc3Ryb2tlPSIjM2MwMGZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0yMzEuOTYyNDUsMTc5LjQ0MTM1YzAsLTQuNDE4MjggMy41ODE3MiwtOCA4LC04YzQuNDE4MjgsMCA4LDMuNTgxNzIgOCw4YzAsNC40MTgyOCAtMy41ODE3Miw4IC04LDhjLTQuNDE4MjgsMCAtOCwtMy41ODE3MiAtOCwtOHoiIGZpbGw9IiMwMGZmMDAiIHN0cm9rZT0iIzAwZmYzZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzMC4yMjU5LDE3Ny42MjA5OGMwLC00LjQxODI4IDMuNTgxNzIsLTggOCwtOGM0LjQxODI4LDAgOCwzLjU4MTcyIDgsOGMwLDQuNDE4MjggLTMuNTgxNzIsOCAtOCw4Yy00LjQxODI4LDAgLTgsLTMuNTgxNzIgLTgsLTh6IiBmaWxsPSIjZmYwMDAwIiBzdHJva2U9IiNmZjNkMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+Cg==',
        color1: '#aaaaaa',
        color2: '#888888',
        color3: '#888888',
        blocks: [
          {
            opcode: 'enabledCheck',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get [COLOR] channel',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                menu: 'COLOR_MENU'
              }
            }
          },
          {
            opcode: 'draw',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set colors to red: [R]green:[G]blue:[B]',
            arguments: {
              R: {
                type: Scratch.ArgumentType.NUMBER
              },
              G: {
                type: Scratch.ArgumentType.NUMBER
              },
              B: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'draw_r',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set red to [R]',
            arguments: {
              R: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'draw_g',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set green to [G]',
            arguments: {
              G: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'draw_b',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set blue to [B]',
            arguments: {
              B: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'change_r',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change red by [R]',
            arguments: {
              R: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'change_g',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change green by [G]',
            arguments: {
              G: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'change_b',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change blue by [B]',
            arguments: {
              B: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'set_tint',
            blockType: Scratch.BlockType.COMMAND,
            text: 'tint sprite to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR
              }
            }
          },
          {
            opcode: 'drawOneColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'only draw [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                menu: 'COLOR_MENU'
              }
            }
          },
          {
            opcode: 'drawDepth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'enable depth mask?[DRAW]',
            hideFromPalette: true,
            arguments: {
              DRAW: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'clearEffects',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear color effects',
          }
        ],
        menus: {
          COLOR_MENU: {
            acceptReporters: true,
            items: ['red', 'green', 'blue']
          }
        }
      };
    }
    
    getDrawable(util) {
      return renderer._allDrawables[util.target.drawableID];
    }

    enabledCheck({COLOR}, util) {
      const dr = this.getDrawable(util);
	  if (COLOR == "red")
	  {
		  return dr.drawR;
	  }
	  else if (COLOR == "green")
	  {
		  return dr.drawG;
	  }
	  else if (COLOR == "blue")
	  {
		  return dr.drawB;
	  }
    }

    draw({R, G, B}, util) {
      const dr = this.getDrawable(util);
      dr.drawR = R;
      dr.drawG = G;
      dr.drawB = B;
      Scratch.vm.renderer.dirty = true;
    }
	
	draw_r({R}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawR = R;
	  Scratch.vm.renderer.dirty = true;
	}
	
	draw_g({G}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawG = G;
	  Scratch.vm.renderer.dirty = true;
	}
	
	draw_b({B}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawB = B;
	  Scratch.vm.renderer.dirty = true;
	}

	change_r({R}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawR += R;
	  Scratch.vm.renderer.dirty = true;
	}
	
	change_g({G}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawG += G;
	  Scratch.vm.renderer.dirty = true;
	}
	
	change_b({B}, util) {
	  const dr = this.getDrawable(util);
	  dr.drawB += B;
	  Scratch.vm.renderer.dirty = true;
	}
	
	set_tint({COLOR}, util) {
		const dr = this.getDrawable(util);
		const rgb = decimalToRgb(COLOR)
		console.log(COLOR)
		dr.drawR = rgb["r"];
		dr.drawG = rgb["g"];
		dr.drawB = rgb["b"];
		Scratch.vm.renderer.dirty = true;
	}

    drawOneColor({COLOR}, util) {
      const dr = this.getDrawable(util);
      dr.drawR = COLOR == 'red';
      dr.drawG = COLOR == 'green';
      dr.drawB = COLOR == 'blue';
      Scratch.vm.renderer.dirty = true;
    }

    drawDepth({DRAW}, util) {
      const dr = this.getDrawable(util);
      dr.depthMask = DRAW;
      Scratch.vm.renderer.dirty = true;
    }

    clearEffects(_args, util) {
      const dr = this.getDrawable(util);
      dr.drawR = 1;
      dr.drawG = 1;
      dr.drawB = 1;
      dr.depthMask = true;
      Scratch.vm.renderer.dirty = true;
    }
  }

  Scratch.extensions.register(new LBdrawtest());
})(Scratch);