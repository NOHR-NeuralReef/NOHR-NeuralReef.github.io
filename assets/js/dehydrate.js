// Initialize window.data if not already set
if (!window.data) {
    window.data = {};
}

// Ensure data structure exists
window.data = {
    ...window.data,
    Quote: {
        quote: "The future of AI is personal, private, and secure. Your data, your control.",
        author: "Johann Nohr"
    },
    contact: {
        cards: [
            {
                title: "Email",
                description: "johann@nohr.com"
            },
            {
                title: "GitHub",
                description: "github.com/NOHR-NeuralReef"
            },
            {
                title: "Network",
                description: "Join NOHR Neural Reef Network"
            }
        ]
    }
};

// Log data initialization
console.log('Dehydrate.js: Data initialized', window.data); 