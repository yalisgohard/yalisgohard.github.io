gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".ellipse").forEach((layer) => {
  const speed = layer.dataset.speed;
  gsap.from(layer, {
    scrollTrigger: {
      trigger: layer,
      scroller: "main",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: speed * 100,
    duration: 1,
    ease: "none",
  });
});

gsap.utils.toArray(".card img").forEach((card, index) => {
  gsap.fromTo(
    card,
    {
      scale: 1.5,
    },
    {
      scrollTrigger: {
        trigger: ".conditions-container",
        scroller: "main",
        start: "top center",
        toggleActions: "restart none none none",
      },
      scale: 1,
      duration: 0.3,
      delay: index * 0.3,
    }
  );
});

document
  .querySelector("#rsvp form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    // demande si la personne est sûr de vouloir envoyer le formulaire
    if (this.querySelector("#check").checked) {
      alert("Génial on se voit bientôt!");
    } else {
      alert("Dommage, à une prochaine fois!");
    }
    this.submit();
  });
