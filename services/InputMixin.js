const InputMixin = {
    //mounted()
    let inputText = document.querySelectorAll('input.login-register-input');
    for (let i = 0; i < inputText.length; i++) {
        let inputLabel = document.getElementById(`${inputText[i].id}-label`);
        inputText[i].addEventListener('blur', () => {
            if (inputText[i].value) {
                inputLabel.style.color = '#807E8C'
                inputLabel.style.top = '10px'
                inputLabel.style.fontSize = '10px'
            } else {
                inputLabel.attributeStyleMap.delete('color')
                inputLabel.attributeStyleMap.delete('top')
                inputLabel.attributeStyleMap.delete('font-size')
            }
        });
    }

    document.querySelectorAll(".input-container input").forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            inputElement.parentElement.removeAttribute('data-error')
            inputElement.parentElement.removeAttribute('data-error-empty')
        });
    });

    //methods()
    const setErrorAttribute = (element, errorString) => {
        let targetedElement = document.getElementById(element)
        if (!targetedElement.value) {
            targetedElement.parentElement.setAttribute('data-error-empty', errorString)
            return
        }
        targetedElement.parentElement.setAttribute('data-error', errorString)
    },
    const removeErrorAttribute = (element) => {
        let targetedElement = document.getElementById(element)
        targetedElement.parentElement.removeAttribute('data-error')
        targetedElement.parentElement.removeAttribute('data-error-empty')
    },
    const removeAllErrorAttribute = () => {
        document.querySelectorAll(".input-container input").forEach((inputElement) => {
            inputElement.parentElement.removeAttribute('data-error');
            inputElement.parentElement.removeAttribute('data-error-empty');
        });
    }

    // const testAutoFill = async(input) => {
    //     await new Promise(() => {
    //         setTimeout(() => {
    //             input.style.fontSize = '12px'
    //             document.getElementById(`${input.id}-label`).style.color = '#807E8C'
    //             document.getElementById(`${input.id}-label`).style.top = '10px'
    //             document.getElementById(`${input.id}-label`).style.fontSize = '10px'
                
    //         }, 10)
    //     })
    // },

}

export { InputMixin }