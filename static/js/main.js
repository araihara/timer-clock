document.addEventListener('DOMContentLoaded', () => {
    // --- タブ切り替え機能 ---
    window.openTab = (evt, tabName) => {
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = 'none';
        }

        const tabLinks = document.getElementsByClassName('tab-link');
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].className = tabLinks[i].className.replace(' active', '');
        }

        document.getElementById(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    };
    // 初期状態で最初のタブを開く
    document.querySelector('.tab-link').click();

    // --- タイマー機能 ---
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    const startTimerBtn = document.getElementById('start-timer');
    const stopTimerBtn = document.getElementById('stop-timer');
    const resetTimerBtn = document.getElementById('reset-timer');

    const advancedToggle = document.getElementById('advanced-toggle');
    const advancedButtons = document.getElementById('advanced-buttons');
    const add1MinBtn = document.getElementById('add-1-min');
    const add3MinBtn = document.getElementById('add-3-min');
    const add5MinBtn = document.getElementById('add-5-min');

    let timerInterval = null;
    let totalSeconds = 0;

    function updateTimerDisplay() {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        timerHours.textContent = h.toString().padStart(2, '0');
        timerMinutes.textContent = m.toString().padStart(2, '0');
        timerSeconds.textContent = s.toString().padStart(2, '0');
    }

    function startTimer() {
        if (timerInterval) return; // 既に開始している場合は何もしない

        totalSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);

        if (totalSeconds <= 0) return;

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();

            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('タイマーが終了しました！');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        stopTimer();
        hoursInput.value = 0;
        minutesInput.value = 0;
        secondsInput.value = 0;
        totalSeconds = 0;
        updateTimerDisplay();
    }

    function addTime(minutes) {
        let currentMinutes = parseInt(minutesInput.value);
        currentMinutes += minutes;
        minutesInput.value = Math.min(59, currentMinutes); // 分の上限を59とする
    }

    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
    resetTimerBtn.addEventListener('click', resetTimer);

    advancedToggle.addEventListener('change', () => {
        advancedButtons.classList.toggle('hidden', !advancedToggle.checked);
    });

    add1MinBtn.addEventListener('click', () => addTime(1));
    add3MinBtn.addEventListener('click', () => addTime(3));
    add5MinBtn.addEventListener('click', () => addTime(5));

    // 入力値が変更されたらディスプレイにも反映させる（任意）
    [hoursInput, minutesInput, secondsInput].forEach(input => {
        input.addEventListener('input', () => {
             totalSeconds = parseInt(hoursInput.value) * 3600 + parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
             updateTimerDisplay();
        });
    });

    // 初期表示を更新
    updateTimerDisplay();

    // --- ストップウォッチ機能 ---
    const stopwatchHours = document.getElementById('stopwatch-hours');
    const stopwatchMinutes = document.getElementById('stopwatch-minutes');
    const stopwatchSeconds = document.getElementById('stopwatch-seconds');
    const stopwatchMilliseconds = document.getElementById('stopwatch-milliseconds');

    const startStopwatchBtn = document.getElementById('start-stopwatch');
    const pauseStopwatchBtn = document.getElementById('pause-stopwatch');
    const resetStopwatchBtn = document.getElementById('reset-stopwatch');

    let stopwatchInterval = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;

    function updateStopwatchDisplay() {
        const time = elapsedTime;
        const h = Math.floor(time / 3600000);
        const m = Math.floor((time % 3600000) / 60000);
        const s = Math.floor((time % 60000) / 1000);
        const ms = Math.floor((time % 1000) / 10);

        stopwatchHours.textContent = h.toString().padStart(2, '0');
        stopwatchMinutes.textContent = m.toString().padStart(2, '0');
        stopwatchSeconds.textContent = s.toString().padStart(2, '0');
        stopwatchMilliseconds.textContent = ms.toString().padStart(2, '0');
    }

    function startStopwatch() {
        if (isRunning) return;
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10); // 10ミリ秒ごとに更新
    }

    function pauseStopwatch() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(stopwatchInterval);
    }

    function resetStopwatch() {
        isRunning = false;
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        updateStopwatchDisplay();
    }

    startStopwatchBtn.addEventListener('click', startStopwatch);
    pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
    resetStopwatchBtn.addEventListener('click', resetStopwatch);

    // 初期表示
    updateStopwatchDisplay();
});
