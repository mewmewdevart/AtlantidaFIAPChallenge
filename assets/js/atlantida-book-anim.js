const PAGE_2_DATA = {
    title: "Capítulo I",
    subtitle: "O Despertar dos Abismos",
    content: [
        "As águas antigas guardavam colunas imensas e tecnologia que a humanidade jamais voltou a presenciar.",
        "Até que o dia da grande tempestade engoliu a ilha em um dia e uma noite..."
    ]
};

function injectPage2(containerSelector, data) {
    const container = document.querySelector(containerSelector);
    if (!container || !data) return;

    const fragment = document.createDocumentFragment();

    const header = document.createElement("div");
    header.className = "page-header";

    if (data.title) {
        const title = document.createElement("h2");
        title.className = "page-title";
        title.textContent = data.title;
        header.appendChild(title);
    }

    if (data.subtitle) {
        const subtitle = document.createElement("p");
        subtitle.className = "page-subtitle";
        subtitle.textContent = data.subtitle;
        header.appendChild(subtitle);
    }

    const divider = document.createElement("div");
    divider.className = "divider-dashed";

    const contentBlock = document.createElement("div");
    contentBlock.className = "page-content";

    const paragraphs = Array.isArray(data.content) ? data.content : [data.content];
    paragraphs.filter(Boolean).forEach(text => {
        const p = document.createElement("p");
        p.className = "page-text";
        p.textContent = text;
        contentBlock.appendChild(p);
    });

    const pageNum = document.createElement("span");
    pageNum.className = "page-num";
    pageNum.textContent = "2";

    fragment.append(header, divider, contentBlock, pageNum);

    container.innerHTML = "";
    container.appendChild(fragment);
}

function runBookIntro() {
    // injectPage2("#page-2-container", PAGE_2_DATA);

    const book = document.getElementById("book");
    const frontCover = document.getElementById("front-cover");
    const leaf1 = document.getElementById("leaf-1");

    if (!book || !frontCover || !leaf1 || typeof gsap === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        gsap.set(book, { xPercent: 0, opacity: 1 });
        gsap.set(frontCover, { rotateY: -180, zIndex: 2 });
        gsap.set(leaf1, { rotateY: -180, zIndex: 10 });
        return;
    }

    gsap.set(book, { xPercent: -25, opacity: 0 });
    gsap.set(frontCover, { rotateY: 0, zIndex: 30 });
    gsap.set(leaf1, { rotateY: 0, zIndex: 20 });

    const tl = gsap.timeline({
        defaults: { ease: "sine.inOut" }
    });

    tl.to(book, {
        opacity: 1,
        duration: 0.4
    })
        .to(book, {
            xPercent: 0,
            duration: 1.8
        }, 0.2)
        .to(frontCover, {
            rotateY: -180,
            duration: 1.8,
            onUpdate() {
                const rot = gsap.getProperty(frontCover, "rotateY");
                frontCover.style.zIndex = rot < -90 ? 2 : 30;
            }
        }, 0.2)
        .to(leaf1, {
            rotateY: -180,
            duration: 1.4,
            onUpdate() {
                const rot = gsap.getProperty(leaf1, "rotateY");
                leaf1.style.zIndex = rot < -90 ? 10 : 20;
            }
        }, 1.1);
}

document.addEventListener("DOMContentLoaded", runBookIntro);