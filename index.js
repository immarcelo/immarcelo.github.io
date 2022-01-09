var BlackHole = function () {
    var rings = document.querySelectorAll('.ring');

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function mapRange(value, low1, high1, low2, high2) {
        return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
    }

    function getScrollPercentage() {
        const vh = document.body.offsetHeight - window.innerHeight;
        const st = window.scrollY;
        return (st * 100) / vh;
    }

    return {
        sortColors() {
            Array.prototype.forEach.call(rings, function (ring, i) {
                var h = randomIntFromInterval(0, 360);
                ring.style.backgroundColor = `hsl(${h}, 100%, 70%)`;
            });
        },
        action() {
            var s = mapRange(getScrollPercentage(), 0, 100, 1, 0.1);
            var o = getScrollPercentage() * 0.01;

            Array.prototype.forEach.call(rings, function (ring, i) {
                const shouldGoAway = getScrollPercentage() > 100 / (i + 1);
                ring.style.transform = `scale( ${s < 0 ? 0 : s - 0.2 * i})`;
                ring.style.opacity = shouldGoAway ? 0 : o / 1;
            });
        },
        setup() {
            this.sortColors();
            this.action();
        }
    };
};

var bg = new BlackHole();

bg.setup();

document.addEventListener('scroll', function (e) {
    bg.action();
});
document.addEventListener('click', function (e) {
    bg.sortColors();
});
