fetch('./scripts/faq.json')
    .then(result => result.json())
    .then(faqs => {
        //pull in skeleton
        const container = document.querySelector('.faq-container');

        //map the questions and the answers
        container.innerHTML = faqs.map(faq => `
        <div class="faq">
            <button class ="question">${faq.question}</button>
            <div class="answer">${faq.answer}</div>
        </div>
        `).join(``);
        //add click dropdown for questions
        document.querySelectorAll('.question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                answer.classList.toggle('active');
            });
        }); 
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form data
        const email = document.getElementById('email').value;
        const reason = document.getElementById('reason').value;
        const message = document.getElementById('message').value;

        // Here you can add code to send the form data to your server or an email service
        window.location.href = `mailto:infoppsv@princessproject.org?subject=Contact Form Submission&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    });