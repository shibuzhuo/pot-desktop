import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import React from 'react';

export function Config(props) {
    const { updateServiceList, onClose } = props;
    const { t } = useTranslation();

    return (
        <>
            <div>{t('services.recognize.oneocr.tip')}</div>
            <div>
                <Button
                    fullWidth
                    onPress={() => {
                        updateServiceList('oneocr');
                        onClose();
                    }}
                >
                    {t('common.save')}
                </Button>
            </div>
        </>
    );
}
