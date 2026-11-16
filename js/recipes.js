document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".read-more-btn");
    let audioContext = null;

    function playSound() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        // Создаём AudioContext только по пользовательскому клику
        if (!audioContext) {
            audioContext = new AudioCtx();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = 660;
        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.15
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const recipe = button.closest(".recipe");
            if (!recipe) return;

            const moreText = recipe.querySelector(".more-text");
            if (!moreText) return;

            const isHidden = window.getComputedStyle(moreText).display === "none";

            moreText.style.display = isHidden ? "block" : "none";
            button.textContent = isHidden ? "Read Less" : "Read More";

            playSound();
        });
    });
});