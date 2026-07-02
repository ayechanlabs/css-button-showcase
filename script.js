const buttonData = {
    "effect-fade": {
        htmlPath: "./components/fade-effect/fade-effect.html",
        cssPath: "./components/fade-effect/fade-effect.css"
    },
    "slide-center-left": {
        htmlPath: "./components/slide-effect/slide-center-left.html",
        cssPath: "./components/slide-effect/slide-center-left.css"
    },
    "slide-center-right": {
        htmlPath: "./components/slide-effect/slide-center-right.html",
        cssPath: "./components/slide-effect/slide-center-right.css"
    },
    "slide-center-bottom": {
        htmlPath: "./components/slide-effect/slide-center-bottom.html",
        cssPath: "./components/slide-effect/slide-center-bottom.css"
    },
    "slide-center-top": {
        htmlPath: "./components/slide-effect/slide-center-top.html",
        cssPath: "./components/slide-effect/slide-center-top.css"
    },
    "slide-left-top": {
        htmlPath: "./components/slide-effect/slide-left-top.html",
        cssPath: "./components/slide-effect/slide-left-top.css"
    },
    "slide-right-top": {
        htmlPath: "./components/slide-effect/slide-right-top.html",
        cssPath: "./components/slide-effect/slide-right-top.css"
    },
    "slide-left-bottom": {
        htmlPath: "./components/slide-effect/slide-left-bottom.html",
        cssPath: "./components/slide-effect/slide-left-bottom.css"
    },
    "slide-right-bottom": {
        htmlPath: "./components/slide-effect/slide-right-bottom.html",
        cssPath: "./components/slide-effect/slide-right-bottom.css"
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
        displayHeader.classList.remove('fade-in-down');
        showcaseContainer.classList.remove('fade-in-up');

        const [htmlResponse, cssResponse] = await Promise.all([
            fetch(data.htmlPath),
            fetch(data.cssPath)
        ]);

        const htmlCode = await htmlResponse.text();
        const cssCode = await cssResponse.text();

        buttonSpace.innerHTML = htmlCode;
        styleTag.innerHTML = cssCode;

        codeBlock.textContent = `${htmlCode}\n\n/* CSS Code */\n${cssCode}`;

        Prism.highlightElement(codeBlock);

        void displayHeader.offsetWidth;
        void showcaseContainer.offsetWidth;

        displayHeader.classList.add('fade-in-down');
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