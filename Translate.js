import * as Components from '@components';
import * as Patcher from '@patcher';
import * as Settings from '@api/settings';
import * as Toasts from '@api/toasts';

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
        Patcher.after('MessageContextMenu', 'default', (_, args, returnValue) => {
            const [props] = args;
            if (!props.message || !props.channel) return;
            returnValue.props.children.push(
                Components.ContextMenuItem({
                    label: 'Translate Message',
                    onPress: () => this.translateMessage(props.message)
                })
            );
        });
    }

    translateMessage(message) {
        const translatedText = message.content.split('').reverse().join(''); // Placeholder translation
        Toasts.show(`Translated: ${translatedText}`, Toasts.Type.INFO);
    }

    getSettingsPanel() {
        return (
            Components.SettingsPanel({
                children: [
                    Components.Text({ variant: 'heading-lg', children: 'Translator Settings' }),
                    Components.SwitchItem({
                        label: 'Enable Translate Button',
                        value: true,
                        onValueChange: (value) => Toasts.show(`Translate Button ${value ? 'Enabled' : 'Disabled'}`, Toasts.Type.INFO)
                    })
                ]
            })
        );
    }
}

export default new TranslatorPlugin();
