const buttonData = {
    "effect-fade": {
        path: "./components/fade-effect/fade-effect.html"
    },
    "slide-center-left": {
        path: "./components/slide-effect/slide-center-left.html"
    },
    "slide-center-right": {
        path: "./components/slide-effect/slide-center-right.html"
    },
    "slide-center-bottom": {
        path: "./components/slide-effect/slide-center-bottom.html"
    },
    "slide-center-top": {
        path: "./components/slide-effect/slide-center-top.html"
    },
    "slide-left-top": {
        path: "./components/slide-effect/slide-left-top.html"
    },
    "slide-right-top": {
        path: "./components/slide-effect/slide-right-top.html"
    },
    "slide-left-bottom": {
        path: "./components/slide-effect/slide-left-bottom.html"
    },
    "slide-right-bottom": {
        path: "./components/slide-effect/slide-right-bottom.html"
    },
    "rotate-left-bottom-n90": {
        path: "./components/rotate-effect/rotate-left-bottom-n90.html"
    },
    "rotate-left-top-n90": {
        path: "./components/rotate-effect/rotate-left-top-n90.html"
    },
    "rotate-right-bottom-p90": {
        path: "./components/rotate-effect/rotate-right-bottom-p90.html"
    },
    "rotate-right-top-p90": {
        path: "./components/rotate-effect/rotate-right-top-p90.html"
    }
};

const styleTag = document.createElement('style');
document.head.appendChild(styleTag);

const navButtons = document.querySelectorAll('.nav-btn, .sub-nav-btn'),
buttonSpace = document.getElementById('button-space'),
codeBlock = document.getElementById('code-block'),
copyButton = document.getElementById('copy-btn'),
displayHeader = document.querySelector('.display-container header'),
showcaseContainer = document.getElementById('showcase-container');

console.log(navButtons);

async function updateShowcase(effectKey) {
    const data = buttonData[effectKey];

    if (!data) return;

    try {
        // displayHeader.classList.remove('fade-in-down');
        showcaseContainer.classList.remove('fade-in-up');

        const response = await fetch(data.path);
        const combinedCode = await response.text();

        buttonSpace.innerHTML = combinedCode;

        codeBlock.textContent = combinedCode;
        Prism.highlightElement(codeBlock);

        void displayHeader.offsetWidth;
        void showcaseContainer.offsetWidth;

        // displayHeader.classList.add('fade-in-down');
        showcaseContainer.classList.add('fade-in-up');
    } 
    catch (error) {
        console.error('Error updating showcase:', error);
        buttonSpace.innerHTML = `<p>Error loading effect. Please try again later.</p>`;
    }
}

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const targetEffect = e.target.getAttribute('data-target');
        updateShowcase(targetEffect);
    });
});

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1500);
    });
});

updateShowcase('effect-fade');