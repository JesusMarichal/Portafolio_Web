// Herramientas del carrusel
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const SIMPLE = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';

const herramientas = [
    [
        { nombre: 'JavaScript', icono: 'javascript/javascript-original' },
        { nombre: 'TypeScript', icono: 'typescript/typescript-original' },
        { nombre: 'React', icono: 'react/react-original' },
        { nombre: 'Next.js', icono: 'nextjs/nextjs-original', oscuro: true },
        { nombre: 'Node.js', icono: 'nodejs/nodejs-original' },
        { nombre: 'NestJS', icono: 'nestjs/nestjs-original' },
        { nombre: 'Express', icono: 'express/express-original', oscuro: true },
        { nombre: 'Laravel', icono: 'laravel/laravel-original' },
        { nombre: 'PHP', icono: 'php/php-original' },
        { nombre: 'HTML', icono: 'html5/html5-original' },
        { nombre: 'CSS', icono: 'css3/css3-original' },
        { nombre: 'Tailwind', icono: 'tailwindcss/tailwindcss-original' },
        { nombre: 'React Native', icono: 'react/react-original' },
        { nombre: 'Flutter', icono: 'flutter/flutter-original' },
        { nombre: 'Dart', icono: 'dart/dart-original' },
        { nombre: 'Stripe', simple: 'stripe', color: '#635bff' },
        { nombre: 'Mercado Pago', simple: 'mercadopago', color: '#00b1ea' },
        { nombre: 'OneSignal', svg: 'bell' }
    ],
    [
        { nombre: 'Python', icono: 'python/python-original' },
        { nombre: 'Java', icono: 'java/java-original' },
        { nombre: 'Rust', icono: 'rust/rust-original', oscuro: true },
        { nombre: 'C++', icono: 'cplusplus/cplusplus-original' },
        { nombre: 'TensorFlow', icono: 'tensorflow/tensorflow-original' },
        { nombre: 'PostgreSQL', icono: 'postgresql/postgresql-original' },
        { nombre: 'MySQL', icono: 'mysql/mysql-original' },
        { nombre: 'Sequelize', icono: 'sequelize/sequelize-original' },
        { nombre: 'Docker', icono: 'docker/docker-original' },
        { nombre: 'Linux', icono: 'linux/linux-original' },
        { nombre: 'Nginx', icono: 'nginx/nginx-original' },
        { nombre: 'PM2', simple: 'pm2', color: '#2b037a' },
        { nombre: 'Google Cloud', icono: 'googlecloud/googlecloud-original' },
        { nombre: 'JWT', simple: 'jsonwebtokens', color: '#d63aff' },
        { nombre: 'Git', icono: 'git/git-original' },
        { nombre: 'GitHub', icono: 'github/github-original', oscuro: true }
    ]
];

function crearItem(h) {
    const item = document.createElement('div');
    item.className = 'tool';
    let icono;
    if (h.icono) {
        icono = `<img src="${DEVICON}${h.icono}.svg" alt="" loading="lazy"${h.oscuro ? ' class="invertir"' : ''}>`;
    } else if (h.simple) {
        icono = `<span class="mask" style="--icono:url(${SIMPLE}${h.simple}.svg);--color:${h.color}"></span>`;
    } else {
        icono = `<svg class="ic tool-svg"><use href="#i-${h.svg}"/></svg>`;
    }
    item.innerHTML = `${icono}<span>${h.nombre}</span>`;
    return item;
}

function montarCarrusel() {
    document.querySelectorAll('.carrusel-track').forEach(track => {
        const lista = herramientas[track.dataset.row];
        // Se duplica la lista para que el desplazamiento sea infinito
        [...lista, ...lista].forEach((h, i) => {
            const item = crearItem(h);
            if (i >= lista.length) item.setAttribute('aria-hidden', 'true');
            track.appendChild(item);
        });
    });
}

function menuMovil() {
    const btn = document.querySelector('.menu-btn');
    const header = document.querySelector('.header');
    btn.addEventListener('click', () => {
        const abierto = header.classList.toggle('abierto');
        btn.setAttribute('aria-expanded', abierto);
    });
    document.querySelectorAll('.nav-links a').forEach(a =>
        a.addEventListener('click', () => {
            header.classList.remove('abierto');
            btn.setAttribute('aria-expanded', false);
        })
    );
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });
}

function filtrosProyectos() {
    const botones = document.querySelectorAll('.filtros button');
    botones.forEach(b => b.addEventListener('click', () => {
        botones.forEach(x => x.classList.remove('activo'));
        b.classList.add('activo');
        document.querySelectorAll('.proyecto').forEach(p => {
            p.classList.toggle('oculto', b.dataset.filtro !== 'todos' && p.dataset.cat !== b.dataset.filtro);
        });
    }));
}

function animarAlScroll() {
    const elementos = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        elementos.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    elementos.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    montarCarrusel();
    menuMovil();
    filtrosProyectos();
    animarAlScroll();
    document.getElementById('anio').textContent = new Date().getFullYear();
});

window.addEventListener('load', function(){
    document.getElementById('loader').classList.add('oculto');
});
