import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
let playCurrentTime = 0;

function setPlayTime(startTime) {
    player.setCurrentTime(startTime).then(function(seconds) {
    }).catch(function (error) {
        console.log(error.name)
        switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});
}

player.on('play', function(event) {
    console.log('played the video!');
});


player.getVideoTitle().then(function(title) {
    console.log('title:', title)
});

addEventListener('beforeunload', (event) => {
    localStorage.setItem('videoplayer-current-time', playCurrentTime);
});
    
window.onload = (event) => {
    playCurrentTime = localStorage.getItem('videoplayer-current-time');
    if (playCurrentTime) {
    setPlayTime(playCurrentTime);
    };
};

// Оскільки цей скрипт записує playCurrentTime тільки один раз під час виходу-перезавантаження,
//_.throttle можна використати тільки тут, хоч він і не потрібен (це працює, ящо шо).
// player.on("timeupdate", _.throttle(function (event) {
//         playCurrentTime = event.seconds;
//         console.log('playCurrentTime', playCurrentTime);
//     }, 1000)
// );
player.on("timeupdate", function (event) {
        playCurrentTime = event.seconds;
        console.log('playCurrentTime', playCurrentTime);
    }
);
