const { Plugin, Library } = Enmity;
const { Toasts, Patcher, React, Settings, Components } = Library;

class TranslatorPlugin {
    onStart() {
        Toasts.show("Translator Plugin Started", Toasts.Type.SUCCESS);

        this.addTranslateButton();
    }

    onStop() {
        Patcher.unpatchAll();
        Toasts.show("Translator Plugin Stopped", Toasts.Type.DANGER);
    }

    addTranslateButton() {
        // Adding a translate button to the message context menu using Enmity's patching system
        Patcher.after('MessageContextMenu', 'default', (_, args, returnValue) => {
            const [props] = args;

            if (!props.message || !props.channel) return;

            returnValue.props.children.push(
                React.createElement(Components.ContextMenuItem, {
                    label: 'Translate Message',
                    onPress: () => this.translateMessage(props.message)
                })
            );
        });
    }

    translateMessage(message) {
        // Placeholder translation logic (reverse message content)
        const translatedText = message.content.split('').reverse().join('');
        Toasts.show(`Translated: ${translatedText}`, Toasts.Type.INFO);
    }

    getSettingsPanel() {
        return (
            React.createElement(Components.SettingsPanel, {
                children: [
                    React.createElement(Components.Text, { variant: 'heading-lg', children: 'Translator Settings' }),
                    React.createElement(Components.SwitchItem, {
                        label: 'Enable Translate Button',
                        value: true,
                        onValueChange: (value) => Toasts.show(`Translate Button ${value ? 'Enabled' : 'Disabled'}`, Toasts.Type.INFO)
                    })
                ]
            })
        );
    }
}

module.exports = new TranslatorPlugin();
