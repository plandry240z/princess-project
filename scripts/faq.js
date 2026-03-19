fetch('./scripts/faq.json')
    .then(result => result.json())
    .then(faqs => {
        //pull in skeleton
        const container = document.querySelector('.faq-container');

        //group by type
        const groupedFaqs = faqs.reduce((acc, faq) => {
            if (!acc[faq.type]) {
                acc[faq.type] = [];
            }
            acc[faq.type].push(faq);
            return acc;
        }, {});

        //split into left and right (appointment type questions on one side and other types on the other side)
        const left = document.createElement('div');
        left.classList.add('faq-split');
        const right = document.createElement('div');
        right.classList.add('faq-split');
        for (const type in groupedFaqs) {
            const side = type === 'appointments' ? left : right;
            const header = document.createElement('h2');
            header.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            side.appendChild(header);

            groupedFaqs[type].forEach(faq => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq');

                const question = document.createElement('button');
                question.classList.add('question');
                question.textContent = faq.question;
                faqItem.appendChild(question);

                const answer = document.createElement('div');
                answer.classList.add('answer');
                answer.textContent = faq.answer;
                faqItem.appendChild(answer);

                question.addEventListener('click', () => {
                    answer.classList.toggle('active');
                });

                side.appendChild(faqItem);
            });

            container.appendChild(left);
            container.appendChild(right);
        }
    })
    .catch(error => console.error('Error loading FAQs:', error));

// Handle contact form submission

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form data
        const email = document.getElementById('email').value;
        const reason = document.getElementById('reason').value;
        const message = document.getElementById('message').value;

       // Create mailto link
       window.location.href = `mailto:infoppsv@princessproject.org?subject=Contact Form Submission&body=Email: ${email}%0D%0AReason: ${reason}%0D%0AMessage: ${message}`;
});