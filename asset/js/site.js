gsap.utils.toArray(".comparisonSection").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "center center",
				end: () => "+=" + section.offsetWidth, 
				scrub: true,
				pin: true,
        anticipatePin: 1
			},
			defaults: {ease: "none"}
		});
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
	  // ...and the image the opposite way (at the same time)
	  .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
});


gsap.to(".animated-path", {
	duration: 3,
	repeat: -1,
	yoyo: true,
	ease: "power1.inOut",
	attr: {
		d: "M600 50C650 90 700 180 690 260C680 340 630 420 620 490C610 560 640 640 600 680C560 720 480 700 410 710C340 720 280 760 220 740C160 720 100 650 80 590C60 530 90 480 100 420C110 360 90 300 80 240C70 180 60 110 100 70C140 30 220 30 290 30C360 30 420 10 480 20C540 30 600 10 600 50Z"
	}
});


document.addEventListener("DOMContentLoaded", function () {
	const videos = document.querySelectorAll(".video-content");
  
	videos.forEach(video => {
	  video.addEventListener("click", function () {
		if (!document.fullscreenElement) {
		  video.requestFullscreen();
		} else {
		  document.exitFullscreen();
		}
	  });
	});
  });
  