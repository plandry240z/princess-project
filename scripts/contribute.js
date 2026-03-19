//mini nav 
document.querySelectorAll('.tabbtn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tabbtn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tabContent').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});



// fetch json
fetch('scripts/contribute.json')
    .then(res => {
        if (!res.ok) throw new Error('json is broken');
        return res.json();
    })
    .then(data => {
        buildVolunteer(data.volunteer);
        buildMoney(data.money);
        buildDress(data.dress);
    })
    .catch(err => console.error('json is broken', err));

//appends 
function appendItems(listId, items) {
    const list = document.getElementById(listId);
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item;
        list.appendChild(li);
    });
}

function appendParagraphs(divId, texts) {
    const div = document.getElementById(divId);
    texts.forEach(text => {
        const p = document.createElement('p');
        p.innerHTML = text;
        div.appendChild(p);
    });
}


// volunteer
function buildVolunteer(vol) {
    appendParagraphs('volunteerIntro', vol.intro);

    const faqList = document.getElementById('faqList');
    const left = document.createElement('div');
    left.classList.add('faqCol');
    const right = document.createElement('div');
    right.classList.add('faqCol');

    vol.faq.forEach((item, i) => {
        const div = document.createElement('div');
        div.classList.add('faqItem');

        const btn = document.createElement('button');
        btn.classList.add('faqQuestion');
        btn.textContent = item.q;

        const ans = document.createElement('div');
        ans.classList.add('faqAnswer');
        ans.textContent = item.a;

        btn.addEventListener('click', () => {
            ans.classList.toggle('active');
        });

        div.appendChild(btn);
        div.appendChild(ans);
        (i % 2 === 0 ? left : right).appendChild(div);
    });

    faqList.appendChild(left);
    faqList.appendChild(right);
}


//money
function buildMoney(money) {
    document.getElementById('moneyIntro').innerHTML = money.intro;
    appendItems('goodsList', money.goods);
}

//dress
function buildDress(dress) {
    appendParagraphs('dressIntro', dress.intro);
    appendItems('acceptList', dress.accept);
    appendItems('rejectList', dress.reject);

    document.getElementById('dressLocation').innerHTML = dress.location;

    const scheduleGrid = document.getElementById('scheduleGrid');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    dress.schedule.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate < today) return;

        const div = document.createElement('div');
        div.classList.add('schedule-item');
        div.innerHTML = '<span class="date">' + item.date + '</span><span class="time">' + item.time + '</span>';
        scheduleGrid.appendChild(div);
    });
}