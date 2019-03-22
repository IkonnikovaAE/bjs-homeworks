function setAlarm(time, callback) {
    return (now) => {
        now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        } else if (minutes < 10) {
            minutes = '0' + minutes;
        }
        now = hours + ':' + minutes;
        if (now === time) {
            callback();
        }
    }
}

function setDailyRhythm(wakeUpTime, bedTime) {
    let booleanStopperMorningAlarm = false;
    const goodMorning = setInterval(setAlarm(wakeUpTime, function() {
            alert('Доброе утро!');
            booleanStopperMorningAlarm = true;
            if (booleanStopperMorningAlarm) {
                clearInterval(goodMorning)
            }
        }, 1000));

    let booleanStopperEveningAlarm = false;
    const goodEvening = setInterval(setAlarm(bedTime, function () {
        alert('Доброй ночи!');
        booleanStopperEveningAlarm = true;
            if (booleanStopperEveningAlarm) {
                clearInterval(goodEvening)
            }
        }, 1000));
}

setDailyRhythm('22:00', '22:00');