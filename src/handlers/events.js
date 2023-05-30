const fs = require('fs');

module.exports = (client) => {
    const loadEvents = dirs => {
        const events = fs.readdirSync(`./src/events/${dirs}/`).filter(f => f.endsWith('js'));
        for (let file of events) {
            let eventName = file.split('.')[0];
            const event = require(`../events/${dirs}/${file}`);
            console.log(`🎧 O evento ${eventName} foi carregado com sucesso.`);
            client.on(eventName, event.bind(null, client));
        }
    };

    const loadModals = () => {
        client.on('modalSubmit', async (modalData) => {
            const modals = fs.readdirSync(`./src/modals`).filter(f => f.endsWith('.js'));
            modals.forEach(file => {
                const modal = require(`../modals/${file}`);
                if (modal.customId === modalData.customId) {
                    modal.run(modalData);
                }
            });
        });
    }
    fs.readdirSync('./src/events/').forEach(x => loadEvents(x));
    loadModals();
};