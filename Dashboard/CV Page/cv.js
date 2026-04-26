/* cv.js — GSAP scroll-reveal & interactions for cv.html */
(function () {
  'use strict';

  // Wait for GSAP & ScrollTrigger
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── PAGE LOAD SEQUENCE ── */
    const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    loadTl
      .to('.cv-header', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15
      })
      .to('.cv-col--right .cv-section:first-child', {
        opacity: 1,
        y: 0,
        duration: 0.75
      }, '-=0.4')
      .to('.cv-col--left .cv-section:first-child', {
        opacity: 1,
        y: 0,
        duration: 0.75
      }, '-=0.5');

    /* ── SCROLL REVEALS — all .cv-reveal elements ── */
    const reveals = gsap.utils.toArray('.cv-reveal:not(.cv-header):not(.cv-col .cv-section:first-child)');

    reveals.forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    });

    /* ── TIMELINE ITEMS — staggered per item ── */
    gsap.utils.toArray('.cv-timeline__item').forEach(function (item, i) {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        delay: i * 0.07,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true
        }
      });
    });

    /* ── PROJECT CARDS — staggered grid ── */
    gsap.to('.cv-projects-grid .cv-project-card', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cv-projects-grid',
        start: 'top 85%',
        once: true
      }
    });

    /* ── SKILL BARS ── */
    document.querySelectorAll('.cv-skill-bar__fill').forEach(function (bar) {
      var targetWidth = bar.dataset.width + '%';
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 92%',
        once: true,
        onEnter: function () {
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.3,
            ease: 'power3.out',
            delay: 0.15
          });
        }
      });
    });

    /* ── EDUCATION & CERT ITEMS — stagger ── */
    gsap.utils.toArray('.cv-edu-item, .cv-cert-item').forEach(function (item, i) {
      gsap.from(item, {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true
        }
      });
    });

    /* ── PILL STAGGER ── */
    gsap.utils.toArray('.cv-pills').forEach(function (group) {
      var pills = group.querySelectorAll('.cv-pill');
      gsap.from(pills, {
        opacity: 0,
        scale: 0.85,
        stagger: 0.04,
        duration: 0.4,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: group,
          start: 'top 92%',
          once: true
        }
      });
    });

    /* ── AMBIENT MOUSE PARALLAX on orbs ── */
    document.addEventListener('mousemove', function (e) {
      var xPct = (e.clientX / window.innerWidth  - 0.5) * 22;
      var yPct = (e.clientY / window.innerHeight - 0.5) * 16;
      gsap.to('.cv-orb--1', { x: xPct,          y: yPct,          duration: 1.8, ease: 'power2.out' });
      gsap.to('.cv-orb--2', { x: -xPct * 0.55,  y: -yPct * 0.55, duration: 2.4, ease: 'power2.out' });
    });

  }); // DOMContentLoaded
}());
