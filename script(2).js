// ================================
// SCRIPT JAVASCRIPT POUR SKILLFUND
// ================================

// Attendre que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // ANIMATION DES BARRES DE PROGRESSION
    // ================================
    
    // Trouver toutes les barres de progression sur la page
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Fonction pour animer une barre de progression
    function animateProgressBar(bar) {
        const targetWidth = bar.getAttribute('data-progress') + '%';
        bar.style.width = targetWidth;
    }
    
    // Observer quand les barres entrent dans la vue
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Appliquer l'observateur à toutes les barres
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    
    // ================================
    // ANIMATION DES CARTES AU SCROLL
    // ================================
    
    const cards = document.querySelectorAll('.campaign-card, .partner-card, .step');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour chaque carte
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialiser les cartes cachées
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
    
    
    // ================================
    // BOUTON "CONTRIBUER" - SIMULATION
    // ================================
    
    const contributeButtons = document.querySelectorAll('.btn-contribute');
    
    contributeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            button.textContent = '✓ Merci !';
            button.style.backgroundColor = '#4CAF50';
            
            // Trouver la barre de progression associée
            const card = button.closest('.campaign-card, .formation-detail');
            const progressBar = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');
            
            if (progressBar) {
                // Augmenter la progression de 5%
                let currentProgress = parseInt(progressBar.getAttribute('data-progress'));
                let newProgress = Math.min(currentProgress + 5, 100);
                
                progressBar.setAttribute('data-progress', newProgress);
                progressBar.style.width = newProgress + '%';
                
                if (progressText) {
                    progressText.textContent = newProgress + '% financé';
                }
                
                // Message de confirmation
                showNotification('Merci pour votre contribution ! 💙');
            }
            
            // Réinitialiser le bouton après 3 secondes
            setTimeout(() => {
                button.textContent = 'Contribuer';
                button.style.backgroundColor = '';
            }, 3000);
        });
    });
    
    
    // ================================
    // NOTIFICATION DE CONFIRMATION
    // ================================
    
    function showNotification(message) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.5s ease;
            font-weight: bold;
        `;
        
        // Ajouter l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Ajouter au document
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    
    // ================================
    // SMOOTH SCROLL POUR LES LIENS
    // ================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ================================
    // EFFET HOVER SUR LE LOGO
    // ================================
    
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    
    // ================================
    // COMPTEUR ANIMÉ (si présent)
    // ================================
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Observer pour démarrer l'animation quand visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
    
    
    console.log('✅ SkillFund est prêt !');
});
