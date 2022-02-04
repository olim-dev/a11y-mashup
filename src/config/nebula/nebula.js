import { embed } from '@nebula.js/stardust';
import qlikAppPromise from 'config/qlikApp';
import bar from './bar-sn-d3';
import barchart from '@nebula.js/sn-bar-chart';
import table from '@nebula.js/sn-table';
import line from '@nebula.js/sn-line-chart';

export default new Promise((resolve) => {
    (async () => {
        const qlikApp = await qlikAppPromise;
        const nebula = await embed(qlikApp, {
            context: {
                keyboardNavigation: true, // tell Nebula to handle navigation
            },
            types: [
                {
                    name: 'custom-bar-d3',
                    load: () => Promise.resolve(bar),
                },
                {
                    name: 'barchart',
                    load: () => Promise.resolve(barchart),
                },
                {
                    name: 'table',
                    load: () => Promise.resolve(table),
                },
                {
                    name: 'line',
                    load: () => Promise.resolve(line),
                },
            ],
        });
        resolve(nebula);
    })();
});