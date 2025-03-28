let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click',()=>{
    menu.classList.add('menu-open')
})

menu.addEventListener('click',()=>{
    menu.classList.remove('menu-open')
})

overlay.addEventListener('click',()=>{
    menu.classList.remove('menu-open')
})


class FormSubmit{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }
    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject(){
        const formObject = {}
        const fields = this.form.querySelectorAll("[name]")
        fields.forEach((field)=>{
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }
/*
    onSubmission(event){
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }*/

    onSubmission(event){
        // Obtém o botão de envio dentro do formulário
        event.preventDefault(); // Impede o envio do formulário
        const submitButton = event.target.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true; // Desativa o botão
            submitButton.innerText = "Enviando..."; // Altera o texto
        }
    }

    // Função para verificar se algum campo do formulário está vazio
    checkFormFields() {
        const formData = this.getFormObject(); // Obtém os dados do formulário

        // Itera sobre o objeto para verificar se algum campo está vazio
        for (const field in formData) {
            if (field === "phone") {
                continue; // Pula para o próximo campo sem verificar
            }
            if (formData.hasOwnProperty(field)) {
                if (!formData[field].trim()) { // Verifica se o campo está vazio ou apenas com espaços
                    return false; // Retorna false se encontrar algum campo vazio
                }
            }
        }
        return true; // Retorna true se todos os campos estiverem preenchidos
    }

    async sendForm(event){

        try{
            this.onSubmission(event);
            if (!this.checkFormFields()) {
                return; // Impede o envio se algum campo estiver vazio
            }
            await fetch(this.url,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        }
        catch(error){
            this.displayError();
            throw new Error(error);
        }
    }

    init(){
        if(this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem</h1>",
});

formSubmit.init()