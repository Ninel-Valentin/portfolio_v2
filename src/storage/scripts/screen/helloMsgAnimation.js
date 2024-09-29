import Consts from "../utils/Consts";

export default function ApplyTypingAnimation() {
    const target = document.querySelector('p[data-select="welcomeMsg"] span[data-select="targetMsg"]');
    // Start recursive loop
    AppendText('', 'Hello world!', target);
}

function AppendText(currentText, targetText, targetObject) {
    setTimeout(() => {
        if (currentText != targetText) {
            const nextText = targetText.substring(0, currentText.length + 1);
            targetObject.innerText = nextText;

            if (nextText != targetText)
                // Start next letter iteration
                AppendText(nextText, targetText, targetObject);
            else {
                // Show the 'press to continue' element
                let continueMsg = document.querySelector('p[data-select="continueMsg"]');
                if(continueMsg)
                    continueMsg.setAttribute('data-visible', true);
            }
        }
    }, Consts.helloMessageTickSpeed);
}