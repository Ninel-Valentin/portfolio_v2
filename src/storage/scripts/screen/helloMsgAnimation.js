import Consts from "../utils/Consts";

export default function ApplyTypingAnimation() {
    const target = document.querySelector('p[data-select="welcomeMsg"] span[data-select="targetMsg"]');
    // Start timeout for recursive loop
    setTimeout(AppendText, Consts.helloMessageTickSpeed, '', 'Hello', target);
}

function AppendText(currentText, targetText, targetObject) {
    if (currentText != targetText) {
        const nextText = targetText.substring(0, currentText.length + 1);
        targetObject.innerText = nextText;

        if (nextText != targetText)
            // Set timeout for next letter
            setTimeout(AppendText, Consts.helloMessageTickSpeed, nextText, targetText, targetObject);
        else
            // Show the 'press to continue' element
            document.querySelector('p[data-select="continueMsg"]').setAttribute('data-visible', true);
    }
}