function userScroll() {
    const navbar = document.querySelector('.navbar');
    const toTopBtn = document.querySelector('#to-top');

    if (window.scrollY > 50) {
        navbar.classList.add('navbar-sticky');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-sticky');
            toTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('navbar-sticky');
            toTopBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function incrementStats(counter) {
    const target = +counter.getAttribute('data-target');
    counter.innerText = 0;

    const updateCounter = () => {
        const c = +counter.innerText;
        const increment = target / 225;

        if (c < target) {
            counter.innerText = Math.ceil(c + increment);
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
}

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            incrementStats(entry.target);
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
});

document.querySelectorAll('.counter').forEach((counter) => {
    observer.observe(counter);
});

// Event listeners
document.addEventListener('DOMContentLoaded', userScroll);
document.querySelector('#to-top').addEventListener('click', scrollToTop);
