fetch('./scripts/faq.json')
    .then(result => result.json())
    .then(faqs => {
        //pull in skeleton
        const container = document.querySelector('.faq');

        //map the questions and the answers
        container.innerHTML = faqs.map(faq => `
        <div class="faq">
            <button class ="question">${faq.question}</button>
            <div class="answer">${faq.answer}</div>
        </div>
        `).join(``);
    });