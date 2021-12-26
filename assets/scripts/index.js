const bodyTag = document.querySelector('body');
const rgbTag = document.querySelector('#rgb');
const hexTag = document.querySelector('#hex');
const hslTag = document.querySelector('#hsl');
const msgTag = document.querySelector('p');

document.querySelector('button').addEventListener('click', function () {
   const {rgb, hex, hsl} = generateColor();
   bodyTag.style.backgroundColor = rgb;
   rgbTag.innerHTML = rgb;
   hexTag.innerHTML = hex;
   hslTag.innerHTML = hsl;
});

document.querySelectorAll('h2').forEach(tag => {
   tag.addEventListener('click', function () {
      navigator.clipboard.writeText(tag.innerHTML);
      generateMsg(tag);
   });
});

function generateMsg(tag) {
   msgTag.innerHTML = `${tag.innerHTML} Copied!`;
   msgTag.classList.add('active');

   setTimeout(function () {
      msgTag.classList.remove('active');
   }, 900);
}

function generateColor() {
   const r = Math.floor(Math.random() * 255);
   const g = Math.floor(Math.random() * 255);
   const b = Math.floor(Math.random() * 255);

   const rgb = generateRGB(r, g, b);
   const hex = generateHEX(r, g, b);
   const hsl = generateHSL(r, g, b);
   return {rgb, hex, hsl};
}

function generateRGB(r, g, b) {
   return `rgb(${r}, ${g}, ${b})`;
}

function generateHEX(r, g, b) {
   let h = r.toString(16);
   let e = g.toString(16);
   let x = b.toString(16);
   h = h.length < 2 ? `0${h}` : h;
   e = e.length < 2 ? `0${e}` : e;
   x = x.length < 2 ? `0${x}` : x;
   return `#${h}${e}${x}`;
}

function generateHSL(r, g, b) {
   (r /= 255), (g /= 255), (b /= 255);
   var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
   var h,
      s,
      l = (max + min) / 2;

   if (max == min) {
      h = s = 0;
   } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }
      h /= 6;
   }

   h = (h * 360).toFixed(0);
   s = (s * 100).toFixed(0);
   l = (l * 100).toFixed(0);

   return `hsl(${h}, ${s}%, ${l}%)`;
}
