// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions for membership fee LP
    initScrollAnimations();
    initNavigation();
    initPaymentForm();
    initUsageChart();
    initFAQAccordion();
    initBankTransferAccordion();
    initSmoothScrolling();
    initMobileNavigation();
});

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll(
        '.greeting-item, .facility-item, .voice-item, .value-item, .video-message, .team-photo'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Staggered animation for tradition values
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 90, 160, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
}

// Payment Form functionality for membership fee
function initPaymentForm() {
    // Auto-renewal buttons
    const membershipAutoRenewalBtn = document.getElementById('membershipAutoRenewalBtn');
    const supportAutoRenewalBtn = document.getElementById('supportAutoRenewalBtn');
    
    // Single payment buttons
    const membershipSingleBtn = document.getElementById('membershipSingleBtn');
    const supportSingleBtn = document.getElementById('supportSingleBtn');

    // Membership auto-renewal
    if (membershipAutoRenewalBtn) {
        membershipAutoRenewalBtn.addEventListener('click', () => {
            showPaymentModal('membership-auto', '年会費自動継続', 5000);
        });
    }

    // Support auto-renewal
    if (supportAutoRenewalBtn) {
        supportAutoRenewalBtn.addEventListener('click', () => {
            showSupportAmountModal('support-auto', '応援会費自動継続');
        });
    }

    // Membership single payment
    if (membershipSingleBtn) {
        membershipSingleBtn.addEventListener('click', () => {
            showPaymentModal('membership-single', '年会費単年決済', 5000);
        });
    }

    // Support single payment
    if (supportSingleBtn) {
        supportSingleBtn.addEventListener('click', () => {
            showSupportAmountModal('support-single', '応援会費単年決済');
        });
    }

    // Bank transfer button is handled separately in initBankTransferAccordion
}

// Show payment modal for membership fee
function showPaymentModal(type, typeName, amount) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 60px rgba(44, 90, 160, 0.3);
    `;

    let message = '';
    let color = '#2c5aa0';
    
    if (type === 'membership-auto') {
        color = '#ff6b35';
        message = `
            <div style="color: ${color}; font-size: 1.2rem; margin-bottom: 15px;">
                ✓ 推奨：年会費の自動継続
            </div>
            <p style="margin-bottom: 20px;">
                年会費 ${amount.toLocaleString()}円の自動継続手続きを開始いたします。<br>
                一度のお手続きで、毎年自動で会費納入が完了します。
            </p>
            <p style="margin-bottom: 30px; color: #666; font-size: 0.9rem;">
                実際のサイトでは、ここでクレジットカード決済画面に遷移します。<br>
                ※ いつでも停止可能です
            </p>
        `;
    } else if (type === 'membership-single') {
        message = `
            <div style="color: ${color}; font-size: 1.2rem; margin-bottom: 15px;">
                年会費の単年決済
            </div>
            <p style="margin-bottom: 20px;">
                年会費 ${amount.toLocaleString()}円の単年決済手続きを開始いたします。<br>
                今年度分のみのお支払いとなります。
            </p>
            <p style="margin-bottom: 30px; color: #666; font-size: 0.9rem;">
                実際のサイトでは、ここでクレジットカード決済画面に遷移します。
            </p>
        `;
    }

    modalContent.innerHTML = `
        <h3 style="color: #2c5aa0; margin-bottom: 20px;">${typeName}</h3>
        ${message}
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button onclick="this.closest('.payment-modal').remove()" 
                    style="padding: 12px 25px; background: #ccc; color: #333; border: none; border-radius: 25px; cursor: pointer;">
                戻る
            </button>
            <button onclick="this.closest('.payment-modal').remove(); alert('決済画面への遷移機能は実装時に追加されます');" 
                    style="padding: 12px 25px; background: #2c5aa0; color: white; border: none; border-radius: 25px; cursor: pointer;">
                手続きを続ける
            </button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Show support amount selection modal
function showSupportAmountModal(type, typeName) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 60px rgba(44, 90, 160, 0.3);
    `;

    const isAuto = type.includes('auto');
    const autoText = isAuto ? '（自動継続）' : '';

    modalContent.innerHTML = `
        <h3 style="color: #ff6b35; margin-bottom: 20px;">応援会費${autoText}</h3>
        <p style="margin-bottom: 25px;">
            応援会費の金額をお選びください。<br>
            一口1,000円から、お気持ちに応じてご支援いただけます。
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
            <button onclick="proceedToPayment(1000, '${type}')" 
                    style="padding: 15px; background: #2c5aa0; color: white; border: none; border-radius: 10px; cursor: pointer;">
                1,000円
            </button>
            <button onclick="proceedToPayment(3000, '${type}')" 
                    style="padding: 15px; background: #2c5aa0; color: white; border: none; border-radius: 10px; cursor: pointer;">
                3,000円
            </button>
            <button onclick="proceedToPayment(5000, '${type}')" 
                    style="padding: 15px; background: #2c5aa0; color: white; border: none; border-radius: 10px; cursor: pointer;">
                5,000円
            </button>
            <button onclick="proceedToPayment(10000, '${type}')" 
                    style="padding: 15px; background: #2c5aa0; color: white; border: none; border-radius: 10px; cursor: pointer;">
                10,000円
            </button>
        </div>
        <div style="margin-bottom: 25px;">
            <input type="number" id="customSupportAmount" placeholder="その他の金額" min="1000" 
                   style="padding: 12px; border: 2px solid #ddd; border-radius: 8px; width: 200px; text-align: center;">
            <button onclick="proceedToCustomPayment('${type}')" 
                    style="padding: 12px 20px; background: #ff6b35; color: white; border: none; border-radius: 8px; cursor: pointer; margin-left: 10px;">
                決定
            </button>
        </div>
        <button onclick="this.closest('.payment-modal').remove()" 
                style="padding: 12px 25px; background: #ccc; color: #333; border: none; border-radius: 25px; cursor: pointer;">
            戻る
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Proceed to payment
function proceedToPayment(amount, type) {
    document.querySelector('.payment-modal').remove();
    const typeName = type.includes('auto') ? '応援会費自動継続' : '応援会費単年決済';
    showPaymentModal(type, typeName, amount);
}

// Proceed to custom payment
function proceedToCustomPayment(type) {
    const customAmount = document.getElementById('customSupportAmount').value;
    if (customAmount && customAmount >= 1000) {
        proceedToPayment(parseInt(customAmount), type);
    } else {
        alert('1,000円以上の金額を入力してください。');
    }
}

// Usage Chart with updated data for membership fee
function initUsageChart() {
    const canvas = document.getElementById('usageChart');
    if (!canvas) return;

    // Set canvas size properly
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext('2d');
    const data = [
        { label: '選手の育成・強化費', value: 60, color: '#2c5aa0' },
        { label: '練習環境の維持・向上費', value: 25, color: '#4a90a4' },
        { label: 'OB・OG会 運営費', value: 15, color: '#81c3d7' }
    ];

    drawPieChart(ctx, data, 150, 150, 120);
}

function drawPieChart(ctx, data, centerX, centerY, radius) {
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    ctx.clearRect(0, 0, 300, 300);

    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;

        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = item.color;
        ctx.fill();

        // Add subtle stroke
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        currentAngle += sliceAngle;
    });

    // Add center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Bank Transfer functionality for new payment plans
function scrollToBankInfo(planType) {
    const bankTransferSection = document.getElementById('bankTransferSection');
    
    if (bankTransferSection) {
        // Add highlight effect based on plan type
        bankTransferSection.classList.remove('highlight-membership', 'highlight-support');
        bankTransferSection.classList.add(`highlight-${planType}`);
        
        // Scroll to bank transfer section
        bankTransferSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            bankTransferSection.classList.remove('highlight-membership', 'highlight-support');
        }, 3000);
    }
}

// Legacy Bank Transfer Accordion functionality (for backward compatibility)
function initBankTransferAccordion() {
    const bankTransferBtn = document.getElementById('bankTransferBtn');
    const bankInfo = document.getElementById('bankInfo');
    
    if (bankTransferBtn && bankInfo) {
        bankTransferBtn.addEventListener('click', () => {
            const isVisible = bankInfo.style.display === 'block';
            
            if (isVisible) {
                bankInfo.style.display = 'none';
                bankTransferBtn.textContent = '振込先口座情報を表示する';
            } else {
                bankInfo.style.display = 'block';
                bankTransferBtn.textContent = '振込先口座情報を閉じる';
                
                // Scroll to bank info
                bankInfo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    const allScrollLinks = [...navLinks, ...heroButtons];

    allScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile navigation (hamburger menu)
function initMobileNavigation() {
    // Create mobile menu toggle button
    const navContainer = document.querySelector('.nav-container');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    mobileToggle.style.cssText = `
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 30px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    `;

    // Add spans styling
    const spans = mobileToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.cssText = `
            width: 25px;
            height: 3px;
            background: #2c5aa0;
            transition: all 0.3s ease;
            transform-origin: center;
        `;
    });

    navContainer.appendChild(mobileToggle);

    // Mobile menu functionality
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        mobileToggle.classList.toggle('open');
        
        if (mobileToggle.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Show mobile toggle on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobileView(e) {
        if (e.matches) {
            mobileToggle.style.display = 'flex';
            navMenu.style.cssText = `
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(255, 255, 255, 0.98);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 50px;
                transition: left 0.3s ease;
                backdrop-filter: blur(10px);
            `;
        } else {
            mobileToggle.style.display = 'none';
            navMenu.style.cssText = '';
            navMenu.classList.remove('mobile-open');
        }
    }

    mediaQuery.addListener(handleMobileView);
    handleMobileView(mediaQuery);

    // Mobile menu open state
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.mobile-open {
            left: 0 !important;
        }
        
        .nav-menu.mobile-open li {
            margin: 20px 0;
        }
        
        .nav-menu.mobile-open a {
            font-size: 1.2rem;
            padding: 15px 30px;
        }
    `;
    document.head.appendChild(style);

    // Close mobile menu when clicking links
    const mobileNavLinks = navMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            mobileToggle.classList.remove('open');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax effect
window.addEventListener('load', initParallaxEffect);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16)); // ~60fps

// Easter egg: Konami code for special message
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';

document.addEventListener('keydown', (e) => {
    konamiCode += e.code;
    
    if (konamiCode.includes(konamiSequence)) {
        showEasterEgg();
        konamiCode = '';
    } else if (konamiCode.length > 50) {
        konamiCode = konamiCode.slice(-50);
    }
});

function showEasterEgg() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2c5aa0, #4a90a4);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.2rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(44, 90, 160, 0.3);
    `;
    message.textContent = '🏆 享栄魂を感じました！甲子園出場を目指して頑張ります！ 🏆';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}