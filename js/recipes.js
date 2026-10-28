document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".read-more-btn");

    const audioContext = window.AudioContext
        ? new AudioContext()
        : null;

    function playSound() {
        if (!audioContext) return;

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
            const moreText = recipe.querySelector(".more-text");

            if (!moreText) return;

            const isHidden = moreText.style.display === "none";

            moreText.style.display = isHidden ? "block" : "none";
            button.textContent = isHidden ? "Read Less" : "Read More";

            playSound();
        });
    });
});
