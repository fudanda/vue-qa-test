<template>
<div class="cdiv">
    <canvas class="fireworks"></canvas>
</div>
</template>

<script>
import anime from 'animejs'

export default {
    data() {
        return {
            cn: '',
            ishow: false
        }
    },
    props: {
        particulecolor: {
            type: Array,
            default: function() {
                return ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C', '#000000']
            }
        },
        circlecolor: {
            type: String,
            default: '#000000'
        },
       circlenum:{
           type:Number,
           default:20
       }
    },
    mounted() {

        this.go()

    },
    beforeDestroy() {

    },
    methods: {
        go() {
            const self = this
            window.human = false;

            var canvasEl = document.querySelector('.fireworks');
            var ctx = canvasEl.getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            const numberOfParticules = this.circlenum;
            var pointerX = 0;
            var pointerY = 0;
            var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
            var colors = self.particulecolor

            function setCanvasSize() {
                canvasEl.width = window.innerWidth * 2;
                canvasEl.height = window.innerHeight * 2;
                canvasEl.style.width = window.innerWidth + 'px';
                canvasEl.style.height = window.innerHeight + 'px';
                canvasEl.getContext('2d').scale(2, 2);
            }

            function updateCoords(e) {
                pointerX = e.clientX || e.touches[0].clientX;
                pointerY = e.clientY || e.touches[0].clientY;
            }

            function setParticuleDirection(p) {
                var angle = anime.random(0, 360) * Math.PI / 180;
                var value = anime.random(50, 180);
                var radius = [-1, 1][anime.random(0, 1)] * value;
                return {
                    x: p.x + radius * Math.cos(angle),
                    y: p.y + radius * Math.sin(angle)
                }
            }

            function createParticule(x, y) {
                var p = {};
                p.x = x;
                p.y = y;
                p.color = colors[anime.random(0, colors.length - 1)];
                p.radius = anime.random(16, 32);
                p.endPos = setParticuleDirection(p);
                p.draw = function() {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }
                return p;
            }
            // function  createTriangle (x,y){
            //     const ct = {}
            //     ct.x1 = x+15
            //     ct.y1 = y+15
            //     ct.x2 = x*1.1
            //     ct.y2 = x+15
            //     ct.x3 = x
            //     ct.y3 = x*1.1+15
            //     ct.color = colors[anime.random(0, colors.length - 1)];
            //     ct.draw = function() {
            //         ctx.beginPath();
            //         ctx.moveTo(ct.x1, ct.y1);
            //         ctx.lineTo(ct.x2, ct.y2);
            //         ctx.lineTo(ct.x3, ct.y3);
            //         ctx.fillStyle= ct.color;
            //         ctx.closePath();
            //         ctx.fill();
            //     }
            //     return ct
            // }
            function createCircle(x, y) {
                var p = {};
                p.x = x;
                p.y = y;
                p.color = self.circlecolor;
                p.radius = 0.1;
                p.alpha = .5;
                p.lineWidth = 6;
                p.draw = function() {
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                    ctx.lineWidth = p.lineWidth;
                    ctx.strokeStyle = p.color;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
                return p;
            }
        //   function  createTriangle (x,y){
        //         const ct = {}
        //         ct.x1 = x+15
        //         ct.y1 = y+15
        //         ct.x2 = x*1.1
        //         ct.y2 = x+15
        //         ct.x3 = x
        //         ct.y3 = x*1.1+15
        //         ct.color = '#FBF38C'
        //         ct.type = 'stroke'
        //         ct.draw = function() {
        //             ctx.beginPath();
        //             ctx.moveTo(ct.x1, ct.y1);
        //             ctx.lineTo(ct.x2, ct.y2);
        //             ctx.lineTo(ct.x3, ct.y3);
        //             ctx.strokeStyle= ct.color;
        //             ctx.closePath();
        //             ctx.stroke();
        //         }
        //         return ct
        //     }

            function renderParticule(anim) {
                for (var i = 0; i < anim.animatables.length; i++) {
                    anim.animatables[i].target.draw();
                }
            }

            function animateParticules(x, y) {
                var circle = createCircle(x, y);
                // var c=createTriangle(x,y)
                var particules = [];
                // var Triangle = [];
                for (var i = 0; i < numberOfParticules; i++) {
                    particules.push(createParticule(x, y));
                }
                // for (var i = 0; i < numberOfParticules; i++) {
                //     Triangle.push(createTriangle(x, y));
                // }
                anime.timeline().add({
                        targets: particules,
                        x: function(p) {
                            return p.endPos.x;
                        },
                        y: function(p) {
                            return p.endPos.y;
                        },
                        radius: 0.1,
                        duration: anime.random(1200, 1800),
                        easing: 'easeOutExpo',
                        update: renderParticule
                    })
                    .add({
                        targets: circle,
                        radius: anime.random(80, 160),
                        lineWidth: 0,
                        alpha: {
                            value: 0,
                            easing: 'linear',
                            duration: anime.random(600, 800),
                        },
                        duration: anime.random(1200, 1800),
                        easing: 'easeOutExpo',
                        update: renderParticule,
                        offset: 0
                    }) 
            }

            var render = anime({
                duration: Infinity,
                update: function() {
                    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
                }
            });

            document.addEventListener(tap, function(e) {
                window.human = true;
                render.play();
                updateCoords(e);
                animateParticules(pointerX, pointerY);
            }, false);

            var centerX = window.innerWidth / 2;
            var centerY = window.innerHeight / 2;

            function autoClick() {
                if (window.human) return;
                animateParticules(
                    anime.random(centerX - 50, centerX + 50),
                    anime.random(centerY - 50, centerY + 50)
                );
                anime({
                    duration: 200
                }).finished.then(autoClick);
            }

            // autoClick();
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize, false);

        }
    }
}
</script>

<style>
.cdiv {
    z-index: 9999;
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.fireworks {
    pointer-events: none;
}
</style>
