const loader = document.getElementById('loader-wrapper');

function createLemon() {
    // Only create lemons if the loader is actually visible
    if (!loader || getComputedStyle(loader).opacity === "0" || loader.style.display === 'none') return;
    
    const lemon = document.createElement('div');
    lemon.classList.add('lemon-slice');
    lemon.style.left = Math.random() * 90 + "vw";
    const duration = Math.random() * 2 + 3; 
    lemon.style.animation = `fallAndFloat ${duration}s ease-in-out forwards`;
    loader.appendChild(lemon);
    setTimeout(() => lemon.remove(), duration * 1000);
}

function createBubble() {
    if (!loader || getComputedStyle(loader).opacity === "0" || loader.style.display === 'none') return;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 10 + 5 + "px";
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = Math.random() * 2 + 2 + "s";
    loader.appendChild(bubble);
    setTimeout(() => bubble.remove(), 4000);
}

function startLoader() {
    // 1. If intro already played this session, vanish immediately
    if (sessionStorage.getItem('introPlayed')) {
        loader.style.display = 'none';
        return;
    }

    // 2. Otherwise, run the animations
    loader.style.animation = 'preloaderFadeOut 0.8s forwards 5.5s';

    const lemonInterval = setInterval(createLemon, 800);
    const bubbleInterval = setInterval(createBubble, 150);

    setTimeout(() => {
        clearInterval(lemonInterval);
        clearInterval(bubbleInterval);
        sessionStorage.setItem('introPlayed', 'true');
    }, 5500);
}

// Initialize on page load
startLoader();

// Fix for the "Back" button (BFCache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted || sessionStorage.getItem('introPlayed')) {
        loader.style.display = 'none';
    }
});
